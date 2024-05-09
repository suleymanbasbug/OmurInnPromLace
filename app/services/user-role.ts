import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userRoleAPI = createApi({
  reducerPath: 'userRoleAPI',
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
    getAllUserRole: builder.query<
      GetAllUserRoleApiResponse,
      GetAllUserRoleApiArg
    >({
      query: () => '/user-role',
    }),
  }),
});

export type GetAllUserRoleApiArg = void;

export type UserRole = {
  id: number;
  name: string;
  room: string;
};
export type GetAllUserRoleApiResponse = UserRole[];

export const {useGetAllUserRoleQuery} = userRoleAPI;
