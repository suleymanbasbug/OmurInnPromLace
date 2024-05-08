import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const storeAPI = createApi({
  reducerPath: 'storeAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (headers, {getState}) => {
      //const token = (getState() as RootState).auth.token;
      const token = null;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Store'],
  endpoints: builder => ({
    getAllStore: builder.query<GetAllStoreApiResponse, GetAllStoreApiArg>({
      query: () => '/store',
      providesTags: ['Store'],
    }),
    createStore: builder.mutation<CreateStoreApiResponse, CreateStoreApiArg>({
      query: body => ({
        url: '/store',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Store'],
    }),
    deleteStore: builder.mutation<void, number>({
      query: id => ({
        url: `/store/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Store'],
    }),
    updateStore: builder.mutation<void, {data: UpdateStoreApiArg}>({
      query: ({data}) => ({
        url: `/store/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Store'],
    }),
  }),
});

export type GetAllStoreApiArg = void;
export type Store = {
  id: number;
  name: string;
  city: string;
  address: string;
  created_at: string;
  updated_at: string;
};

export type GetAllStoreApiResponse = Store[];

export type CreateStoreApiResponse = Store;
export type CreateStoreApiArg = {
  name: string;
  city: string;
  address: string;
};

export type UpdateStoreApiArg = Store;

export const {
  useGetAllStoreQuery,
  useCreateStoreMutation,
  useDeleteStoreMutation,
  useUpdateStoreMutation,
} = storeAPI;
