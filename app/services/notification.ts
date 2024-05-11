import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const notificationAPI = createApi({
  reducerPath: 'notificationAPI',
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
    sendPushNotification: builder.mutation<void, SendPushNotificationApiArg>({
      query: data => ({
        url: '/send-notification',
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
};

export const {useSendPushNotificationMutation} = notificationAPI;
