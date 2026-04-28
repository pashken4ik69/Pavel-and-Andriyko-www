import { baseApi } from "../../../shared/lib/baseApi";
import type { IReview, IReviewCreate } from "../model/reviews-type";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<IReview[], string>({
      query: (spaceId) => `reviews?spaceId=${spaceId}`,
      providesTags: ["Reviews"],
    }),

    getReviewsManage: build.query<IReview[], string>({
      query: (spaceId) => ({
        url: `reviews/manage?spaceId=${spaceId}`,
        providesTags: ["Reviews"],
      }),
    }),

    createReview: build.mutation<IReview, IReviewCreate>({
      query: (review) => ({
        url: "reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: build.mutation<boolean, number>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews", "Spaces"],
    }),

    hideReview: build.mutation<boolean, number>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsManageQuery,
  useGetReviewsQuery,
  useHideReviewMutation,
} = reviewsApi;
