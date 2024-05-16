import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from './user';

export const notificationAPI = createApi({
  reducerPath: 'notificationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).user.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Notification'],
  endpoints: builder => ({
    getNotificationsByUserRole: builder.query<NotificationResponse, number>({
      query: user_role_id => `/notification/${user_role_id}`,
      providesTags: ['Notification'],
    }),
    sendPushNotification: builder.mutation<void, SendPushNotificationApiArg>({
      query: data => ({
        url: '/notification/send',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Notification'],
    }),
    deleteNotification: builder.mutation<void, number>({
      query: id => ({
        url: `/notification/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),
    subscribeToTopics: builder.mutation<void, SubcribeToTopicsApiArg>({
      query: data => ({
        url: '/notification/subscribe',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export type SendPushNotificationApiArg = {
  title: string;
  description: string;
  role_id: number[];
  sender_id: number;
};

export type Notification = {
  id: number;
  title: string;
  description: string;
  user_role_id: number;
  sender_id: number;
  created_at: string;
  updated_at: string;
  sender: User;
};

export type NotificationResponse = Notification[];

export type SubcribeToTopicsApiArg = {
  token: string;
};

export const {
  useSendPushNotificationMutation,
  useGetNotificationsByUserRoleQuery,
  useDeleteNotificationMutation,
  useSubscribeToTopicsMutation,
} = notificationAPI;
