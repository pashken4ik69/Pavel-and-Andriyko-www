export interface IReview {
  id: number
  userId: number
  spaceId: number
  text: string
  rating: number
  createdAt: string
}

export interface IReviewCreate {
  spaceId: string
  text: string
  rating: number
}

