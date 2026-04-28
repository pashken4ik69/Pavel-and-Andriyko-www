require('dotenv').config();
const bcrypt = require('bcryptjs');
const {
  User,
  Space,
  Booking,
  Review,
  sequelize,
  recalcSpaceRating,
} = require('../src/models');

async function seed() {
  try {
    await sequelize.authenticate();

    const [manager] = await User.findOrCreate({
      where: { email: 'manager@example.com' },
      defaults: {
        password: await bcrypt.hash('manager123', 10),
        role: 'manager',
        name: 'Менеджер',
        isActive: true,
      },
    });

    const [client] = await User.findOrCreate({
      where: { email: 'client@example.com' },
      defaults: {
        password: await bcrypt.hash('client123', 10),
        role: 'client',
        name: 'Клиент',
        isActive: true,
      },
    });

    await User.findOrCreate({
      where: { email: 'guest@example.com' },
      defaults: {
        password: await bcrypt.hash('guest123', 10),
        role: 'guest',
        name: 'Гость',
        isActive: true,
      },
    });

    const spacesData = [
      {
        title: 'Open Space — у окна',
        zoneType: 'open-space',
        pricePerHour: 300,
        capacity: 8,
        description: 'Светлое общее пространство с панорамными окнами, розетки у каждого места.',
        images: ['/img/open1.jpg', '/img/open2.jpg'],
      },
      {
        title: 'Переговорная «Берёза»',
        zoneType: 'meeting-room',
        pricePerHour: 800,
        capacity: 6,
        description: 'Тихая комната для встреч, доска и экран.',
        images: ['/img/meeting1.jpg'],
      },
      {
        title: 'Кабинет Solo',
        zoneType: 'private-office',
        pricePerHour: 1200,
        capacity: 1,
        description: 'Отдельный кабинет для фокусной работы.',
        images: ['/img/office1.jpg', '/img/office2.jpg'],
      },
      {
        title: 'Hot desk зона',
        zoneType: 'open-space',
        pricePerHour: 250,
        capacity: 12,
        description: 'Гибкие места без фиксации, кофе и чай включены.',
        images: ['/img/hotdesk.jpg'],
      },
    ];

    const spaces = [];
    for (const s of spacesData) {
      const [row] = await Space.findOrCreate({
        where: { title: s.title },
        defaults: {
          ...s,
          rating: 0,
        },
      });
      spaces.push(row);
    }

    await Booking.findOrCreate({
      where: { userId: client.id, spaceId: spaces[0].id, date: '2026-05-01' },
      defaults: {
        userId: client.id,
        spaceId: spaces[0].id,
        date: '2026-05-01',
        timeFrom: '10:00',
        timeTo: '14:00',
        comment: 'Нужны тихие места у окна',
        status: 'pending',
      },
    });

    await Booking.findOrCreate({
      where: { userId: client.id, spaceId: spaces[1].id, date: '2026-04-25' },
      defaults: {
        userId: client.id,
        spaceId: spaces[1].id,
        date: '2026-04-25',
        timeFrom: '12:00',
        timeTo: '13:00',
        comment: 'Созвон с командой',
        status: 'approved',
      },
    });

    await Review.findOrCreate({
      where: { userId: client.id, spaceId: spaces[0].id },
      defaults: {
        userId: client.id,
        spaceId: spaces[0].id,
        text: 'Удобно и тихо, рекомендую.',
        rating: 5,
        isHidden: false,
      },
    });

    await Review.findOrCreate({
      where: { userId: manager.id, spaceId: spaces[1].id },
      defaults: {
        userId: manager.id,
        spaceId: spaces[1].id,
        text: 'Отличная переговорка для презентаций.',
        rating: 4,
        isHidden: false,
      },
    });

    await Review.findOrCreate({
      where: { userId: client.id, spaceId: spaces[2].id },
      defaults: {
        userId: client.id,
        spaceId: spaces[2].id,
        text: 'Кабинет компактный, всё необходимое есть.',
        rating: 5,
        isHidden: false,
      },
    });

    for (const sp of spaces) {
      await recalcSpaceRating(sp.id);
    }

    console.log('Seed completed.');
    console.log('manager@example.com / manager123 (manager)');
    console.log('client@example.com / client123 (client)');
    console.log('guest@example.com / guest123 (guest)');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
