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
  endpoints: builder => ({
    getAllStore: builder.query({
      query: () => '/store',
    }),
  }),
});

export const {useGetAllStoreQuery} = storeAPI;
