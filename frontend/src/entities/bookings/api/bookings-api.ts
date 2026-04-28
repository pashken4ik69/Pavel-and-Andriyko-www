import { baseApi } from "../../../shared/lib/baseApi";
import type { IBooking } from "../models/types";

export const bookingsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBookings: build.query<IBooking[], void>({
            query: () => ({
                url: "bookings",
                method: "GET",
            }),
            providesTags: ["Bookings"]
        }),

        createBookings: build.mutation<IBooking, Partial<IBooking>>({
            query: (body) => ({
                url: "bookings",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Bookings"]
        }),

        cancelBookings: build.mutation<IBooking, number | string>({
            query: (id) => ({
                url: `bookings/${id}/cancel`,
                method: "PATCH",
            }),
            invalidatesTags: ["Bookings"]
        }),

        approveBookings: build.mutation<IBooking, { id: number | string; status: 'approved' | 'rejected' }>({
            query: ({ id, status }) => ({
                url: `bookings/${id}/status`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["Bookings"]
        }),
    })
})

export const {
    useGetBookingsQuery,
    useCreateBookingsMutation,
    useCancelBookingsMutation,
    useApproveBookingsMutation,
} = bookingsApi;
