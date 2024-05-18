import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';
export const deletedNotificationAPI = createApi({
  reducerPath: 'deletedNotificationAPI',
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
  tagTypes: ['DeletedNotification'],
  endpoints: builder => ({
    getDeletedNotifications: builder.query<any, void>({
      query: () => '/deleted-notification',
      providesTags: ['DeletedNotification'],
    }),
    sendDeletedNotification: builder.mutation<
      void,
      SendDeletedNotificationApiArg
    >({
      query: body => ({
        url: '/deleted-notification',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['DeletedNotification'],
    }),
  }),
});

export type SendDeletedNotificationApiArg = {
  id: number;
};

export const {
  useGetDeletedNotificationsQuery,
  useSendDeletedNotificationMutation,
} = deletedNotificationAPI;
