import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {UserRole} from './user-role';
import {Store} from './store';
import {API_URL} from '@env';
export const userAPI = createApi({
  reducerPath: 'userAPI',
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
  tagTypes: ['User'],
  endpoints: builder => ({
    register: builder.mutation<void, RegisterApiArg>({
      query: data => ({
        url: 'user/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getAllUser: builder.query<GetAllUserResponse, void>({
      query: () => 'user',
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<void, UpdateUserApiArg>({
      query: data => ({
        url: `user/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation<
      void,
      {password: string; password_confirmation: string}
    >({
      query: data => ({
        url: 'user/change-password',
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

export type UpdateUserApiArg = RegisterApiArg & {id: number; points: number};

export type GetAllUserResponse = User[];

export type Topic = {
  id: number;
  title: string;
  user_id: number;
};

export type User = {
  id: number;
  username: string;
  role_id: number;
  store_id: number | null;
  role: UserRole;
  store: Store | null;
  topics: Topic[];
  points: number;
};

export const {
  useRegisterMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
} = userAPI;
