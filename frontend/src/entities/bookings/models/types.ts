export interface IBooking {
  id: number
  userId: number
  spaceId: number
  date: string
  timeFrom: string
  timeTo: string
  comment: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
}

export interface IBookingCreatre{
  userId: number
  spaceId: number
  date: string
  timeFrom: string
  timeTo: string
  comment: string
}