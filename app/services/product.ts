import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';
export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).user.access_token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    getAllProducts: builder.query<ProductDto[], void>({
      query: () => '/product',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<void, any>({
      query: body => ({
        url: '/product',
        method: 'POST',
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<void, {data: any; id: number}>({
      query: ({data, id}) => ({
        url: `/product/${id}`,
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: id => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export type Product = {
  code: string;
  image: any;
  colors: string[];
  sizes: string[];
};

export type ProductDto = Product & {
  id: number;
};

export type CreateProductApiArg = Product;
export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
