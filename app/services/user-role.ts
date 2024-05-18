import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';
export const userRoleAPI = createApi({
  reducerPath: 'userRoleAPI',
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
