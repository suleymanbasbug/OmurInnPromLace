/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationProp} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './app/store';
import Toast from 'react-native-toast-message';
import {Store} from '@app/services/store';
import {User} from '@app/services/user';
import {ProductDto} from '@app/services/product';
import AppNavigatorUI from './app/routers';

export type RootStackParamList = {
  Admin: undefined;
  UserManagement: undefined;
  CreateUser: undefined;
  ProductManagement: undefined;
  CreateProduct: undefined;
  NotificationManagement: undefined;
  CreateNotification: undefined;
  StoreManagement: undefined;
  CreateStore: undefined;
  EditStore: {store: Store};
  EditUser: {user: User};
  EditProduct: {product: ProductDto};
  Tabs: undefined;
  Login: undefined;
  Home: undefined;
  IncomingNotification: undefined;
  SendNotification: undefined;
  Sales: {product: ProductDto | null};
  NotificationList: undefined;
  NotificationDetail: {id: number};
  SalesManagement: undefined;
  StoreSales: undefined;
  UserSales: undefined;
  SalesList: {sales: any[]; title: string};
};

export type StackNavigation = NavigationProp<RootStackParamList>;

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigatorUI />
      <Toast />
    </Provider>
  );
}

export default App;
