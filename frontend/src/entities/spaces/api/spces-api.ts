import { baseApi } from "../../../shared/lib/baseApi";
import type { ISpace } from "../model/types";

export const spacesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSpaces: build.query<ISpace[], void>({
      query: () => ({
        url: "spaces",
        method: "GET",
      }),
      providesTags: ["Spaces"]
    }),

    getSpace: build.query<ISpace, string | number>({
      query: (id) => ({
        url: `spaces/${id}`,
        method: "GET",
      }),
      providesTags: ["Spaces"]
    }),

    createSpace: build.mutation<ISpace, Partial<ISpace>>({
      query: (body) => ({
        url: "spaces",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Spaces"]
    }),

    updateSpace: build.mutation<ISpace, ISpace>({
      query: ({ id, ...patch }) => ({
        url: `spaces/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Spaces"]
    }),

    deleteSpace: build.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `spaces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Spaces"]
    }),
  })
})

export const {
  useGetSpacesQuery,
  useGetSpaceQuery,
  useCreateSpaceMutation,
  useUpdateSpaceMutation,
  useDeleteSpaceMutation
} = spacesApi;
