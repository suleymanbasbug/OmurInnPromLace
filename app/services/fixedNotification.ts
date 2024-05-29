import {RootState} from '@app/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';
export const fixedNotificationAPI = createApi({
  reducerPath: 'fixedNotificationAPI',
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
  tagTypes: ['FixedNotification'],
  endpoints: builder => ({
    getFixedNotifications: builder.query<GetFixedNotificationResponse, void>({
      query: () => '/fixed-notification',
      providesTags: ['FixedNotification'],
    }),
    createFixedNotification: builder.mutation<
      void,
      CreateFixedNotificationApiArg
    >({
      query: body => ({
        url: '/fixed-notification',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['FixedNotification'],
    }),
    updateFixedNotification: builder.mutation<
      void,
      UpdateFixedNotificationApiArg
    >({
      query: data => ({
        url: `fixed-notification/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FixedNotification'],
    }),

    deleteFixedNotification: builder.mutation<void, number>({
      query: id => ({
        url: `fixed-notification/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FixedNotification'],
    }),
  }),
});

export type CreateFixedNotificationApiArg = {
  title: string;
  description: string;
};

export type FixedNotificationType = {
  id: number;
  title: string;
  description: string;
};

export type UpdateFixedNotificationApiArg = FixedNotificationType & {
  id: number;
};

export type GetFixedNotificationResponse = FixedNotificationType[];

export const {
  useGetFixedNotificationsQuery,
  useCreateFixedNotificationMutation,
  useUpdateFixedNotificationMutation,
  useDeleteFixedNotificationMutation,
} = fixedNotificationAPI;
