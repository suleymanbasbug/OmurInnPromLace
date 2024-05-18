import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from './user';
import {API_URL} from '@env';
export const authAPI = createApi({
  reducerPath: 'authPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).user.access_token;

      headers.set('Accept', 'application/json');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginApiResponse, LoginApiArg>({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    me: builder.mutation<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation<LoginApiResponse, RefreshTokenArg>({
      query: ({token}: {token: string}) => ({
        url: '/auth/refresh',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    logout: builder.mutation<User, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export type LoginApiArg = {
  username: string;
  password: string;
};

export type LoginApiResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type RefreshTokenArg = {
  token: string;
};

export const {
  useLoginMutation,
  useMeMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authAPI;
