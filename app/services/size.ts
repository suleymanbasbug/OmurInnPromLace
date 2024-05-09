import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const sizeAPI = createApi({
  reducerPath: 'sizeAPI',
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
    getAllSize: builder.query<GetAllSizeApiResponse, GetAllSizeApiArg>({
      query: () => '/size',
    }),
  }),
});

export type GetAllSizeApiArg = void;

export type Size = {
  id: number;
  name: string;
};
export type GetAllSizeApiResponse = Size[];

export const {useGetAllSizeQuery} = sizeAPI;
