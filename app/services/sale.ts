import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';
export const saleAPI = createApi({
  reducerPath: 'saleAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
      headers.set('Accept', 'application/json');
      const token = (getState() as RootState).user.access_token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getAllSale: builder.query<any, GetAllStoreApiArg>({
      query: () => '/sale',
    }),
  }),
});

export type GetAllStoreApiArg = void;

export const {useGetAllSaleQuery} = saleAPI;
