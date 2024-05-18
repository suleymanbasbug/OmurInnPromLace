import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';
export const sizeAPI = createApi({
  reducerPath: 'sizeAPI',
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
    getAllSize: builder.query<GetAllSizeApiResponse, GetAllSizeApiArg>({
      query: () => '/size',
    }),
  }),
});

export type GetAllSizeApiArg = void;

export type Size = {
  id: number;
  size: string;
};
export type GetAllSizeApiResponse = Size[];

export const {useGetAllSizeQuery} = sizeAPI;
