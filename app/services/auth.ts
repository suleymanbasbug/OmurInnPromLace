import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).userSlice.token.access_token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<any, LoginApiArg>({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    me: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/me',
        method: 'POST',
      }),
    }),
  }),
});

export type LoginApiArg = {
  username: string;
  password: string;
};

export const {useLoginMutation, useMeMutation} = authAPI;
