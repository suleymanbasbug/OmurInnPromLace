import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from './user';
import {API_URL} from '@env';
export const notificationAPI = createApi({
  reducerPath: 'notificationAPI',
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
  tagTypes: ['Notification'],
  endpoints: builder => ({
    getNotificationsByUserRole: builder.query<NotificationResponse, number>({
      query: user_role_id => `/notification/${user_role_id}`,
      providesTags: ['Notification'],
    }),
    sendPushNotification: builder.mutation<void, any>({
      query: body => ({
        url: '/notification/send',
        method: 'POST',
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
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
    getNotificationsByUser: builder.query<NotificationResponse, void>({
      query: () => 'notification/user',
      providesTags: ['Notification'],
    }),
    getNotificationById: builder.query<GetNotificationByIdResponse, number>({
      query: id => `/notification/id/${id}`,
    }),
  }),
});

export type SendPushNotificationApiArg = {
  title: string;
  description: string;
  sender_id: number;
  userIds: number[];
  roleIds: number[];
  storeIds: number[];
  images?: [];
  productIds?: [];
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
  topics: PivotNotificationTopic[];
} & Notification;

export type GetNotificationBySenderResponse = NotificationBySender[];

export type NotificationResponse = Notification[];

export type SubcribeToTopicsApiArg = {
  token: string;
};

export type PivotNotificationTopic = {
  id: number;
  pivot: {
    notification_id: number;
    topic_id: number;
  };
  roles: PivotRoleTopic[];
  stores: PivotStoreTopic[];
  users: PivotUserTopic[];
};

export type PivotRoleTopic = {
  id: number;
  name: string;
  pivot: {
    role_id: number;
    topic_id: number;
  };
  room: string;
};

export type PivotUserTopic = {
  id: number;
  pivot: {
    user_id: number;
    topic_id: number;
  };
  role_id: number;
  store_id: number;
  username: string;
};

export type PivotStoreTopic = {
  id: number;
  name: string;
  address: string;
  city: string;
  created_at: string;
  updated_at: string;
  pivot: {
    store_id: number;
    topic_id: number;
  };
};

export type GetNotificationByIdResponse = {
  images: [];
  products: [];
} & Notification;

export const {
  useSendPushNotificationMutation,
  useGetNotificationsByUserRoleQuery,
  useDeleteNotificationMutation,
  useSubscribeToTopicsMutation,
  useGetNotificationsBySenderQuery,
  useGetNotificationsByUserQuery,
  useGetNotificationByIdQuery,
} = notificationAPI;
