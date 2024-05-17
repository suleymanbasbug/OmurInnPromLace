import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from './user';
import {API_URL} from '@env';
import {Store} from './store';
import {UserRole} from './user-role';
export const notificationAPI = createApi({
  reducerPath: 'notificationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
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
    getNotificationsBySender: builder.query<
      GetNotificationBySenderResponse,
      void
    >({
      query: () => 'notification/sender',
      providesTags: ['Notification'],
    }),
  }),
});

export type SendPushNotificationApiArg = {
  title: string;
  description: string;
  sender_id: number;
  topics: string[];
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

export type NotificationBySender = {
  stores: Store[];
  user_roles: UserRole[];
} & Notification;

export type GetNotificationBySenderResponse = NotificationBySender[];

export type NotificationResponse = Notification[];

export type SubcribeToTopicsApiArg = {
  token: string;
};

export const {
  useSendPushNotificationMutation,
  useGetNotificationsByUserRoleQuery,
  useDeleteNotificationMutation,
  useSubscribeToTopicsMutation,
  useGetNotificationsBySenderQuery,
} = notificationAPI;
