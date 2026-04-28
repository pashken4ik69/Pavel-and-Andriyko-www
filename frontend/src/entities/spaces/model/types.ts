export interface ISpace {
  id: number
  title: string
  zoneType: 'open-space' | 'meeting-room' | 'private-office'
  pricePerHour: number
  capacity: number
  rating: number
  description: string
  images: string
}

export interface ISpaceCrate {
  title: string
  zoneType: 'open-space' | 'meeting-room' | 'private-office'
  pricePerHour: number
  capacity: number
  description: string
  images: string
}