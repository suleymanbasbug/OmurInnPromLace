import CreateProduct from '@app/pages/CreateProduct';
import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
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
  endpoints: builder => ({
    createProduct: builder.mutation<void, CreateProductApiArg>({
      query: body => ({
        url: '/product',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export type Product = {
  code: string;
  image: string;
  colors: string[];
  sizes: string[];
};

export type ProductDto = Product & {
  id: number;
};

export type CreateProductApiArg = Product;
export const {useCreateProductMutation} = productAPI;
