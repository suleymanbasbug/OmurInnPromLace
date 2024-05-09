import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
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
    register: builder.mutation<void, RegisterApiArg>({
      query: data => ({
        url: 'user/register',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export type RegisterApiArg = {
  username: string;
  password: string;
  password_confirmation: string;
  role_id: number;
  store_id: number | null;
};

export const {useRegisterMutation} = userAPI;
