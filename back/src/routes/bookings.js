const express = require('express');
const { Booking, Space, User } = require('../models');
const { authMiddleware, requireRoles } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status != null && status !== '') {
      const allowed = ['pending', 'approved', 'rejected', 'cancelled'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      where.status = status;
    }

    if (req.user.role === 'client' || req.user.role === 'guest') {
      where.userId = req.user.id;
    } else if (req.user.role === 'manager') {
      // все брони, опционально по status
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const bookings = await Booking.findAll({
      where,
      order: [['date', 'DESC'], ['id', 'DESC']],
      include: [
        { model: Space, attributes: ['id', 'title', 'zoneType', 'pricePerHour'] },
        { model: User, attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch bookings' });
  }
});

router.post('/', requireRoles('client', 'manager'), async (req, res) => {
  try {
    const { spaceId, date, timeFrom, timeTo, comment } = req.body;
    if (spaceId == null || spaceId === '') {
      return res.status(400).json({ error: 'spaceId is required' });
    }
    const sid = parseInt(spaceId, 10);
    if (Number.isNaN(sid)) {
      return res.status(400).json({ error: 'Invalid spaceId' });
    }
    const space = await Space.findByPk(sid);
    if (!space) {
      return res.status(400).json({ error: 'Space not found' });
    }
    if (!date || !String(date).trim()) {
      return res.status(400).json({ error: 'date is required (YYYY-MM-DD)' });
    }
    if (!timeFrom || !String(timeFrom).trim()) {
      return res.status(400).json({ error: 'timeFrom is required' });
    }
    if (!timeTo || !String(timeTo).trim()) {
      return res.status(400).json({ error: 'timeTo is required' });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      spaceId: sid,
      date: String(date).trim(),
      timeFrom: String(timeFrom).trim(),
      timeTo: String(timeTo).trim(),
      comment: comment != null ? String(comment) : '',
      status: 'pending',
    });
    const created = await Booking.findByPk(booking.id, {
      include: [
        { model: Space, attributes: ['id', 'title', 'zoneType', 'pricePerHour'] },
        { model: User, attributes: ['id', 'email', 'name'] },
      ],
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create booking' });
  }
});

router.patch('/:id/cancel', requireRoles('client', 'manager'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (booking.userId !== req.user.id && req.user.role !== 'manager') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending bookings can be cancelled' });
    }
    booking.status = 'cancelled';
    await booking.save();
    const updated = await Booking.findByPk(booking.id, {
      include: [
        { model: Space, attributes: ['id', 'title', 'zoneType', 'pricePerHour'] },
        { model: User, attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to cancel booking' });
  }
});

router.patch('/:id/status', requireRoles('manager'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const { status } = req.body;
    const allowed = ['approved', 'rejected'];
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ error: 'status must be approved or rejected' });
    }
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending bookings can be confirmed or rejected' });
    }
    booking.status = status;
    await booking.save();
    const updated = await Booking.findByPk(booking.id, {
      include: [
        { model: Space, attributes: ['id', 'title', 'zoneType', 'pricePerHour'] },
        { model: User, attributes: ['id', 'email', 'name'] },
      ],
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update booking status' });
  }
});

module.exports = router;
