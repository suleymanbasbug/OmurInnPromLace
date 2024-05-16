import {apiList} from '@app/services';
import {
  Middleware,
  MiddlewareAPI,
  configureStore,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import {userSlice} from './userSlice';

const rtkQueryLogger: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    console.log('RejectedWithValue:', action);
  }
  return next(action);
};

const middleware: any = [...apiList.map(api => api.middleware), rtkQueryLogger];

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ...Object.fromEntries(apiList.map(api => [api.reducerPath, api.reducer])),
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

export const resetRtkState = () => {
  apiList.map(apiState => {
    store.dispatch(apiState.util.resetApiState());
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
