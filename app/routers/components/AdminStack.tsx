import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, StackNavigation} from 'App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminList from '@app/pages/AdminList';
import {COLORS} from '@app/assets/values/colors';
import UserManagement from '@app/pages/UserManagement';
import AddHeaderItem from '@app/components/AddHeaderItem';
import HeaderBackButton from '@app/components/HeaderBackButton';
import CreateUser from '@app/pages/CreateUser';
import EditUser from '@app/pages/EditUser';
import ProductManagement from '@app/pages/ProductManagement';
import CreateProduct from '@app/pages/CreateProduct';
import EditProduct from '@app/pages/EditProduct';
import NotificationManagement from '@app/pages/NotificationManagement';
import IncomingNotification from '@app/pages/IncomingNotification';
import CreateNotification from '@app/pages/CreateNotification';
import StoreManagement from '@app/pages/StoreManagement';
import CreateStore from '@app/pages/CreateStore';
import EditStore from '@app/pages/EditStore';
import SendNotification from '@app/pages/SendNotification';
import NotificationDetail from '@app/pages/NotificationDetail';
import SalesManagement from '@app/pages/SalesManagement';
import UserSales from '@app/pages/UserSales';
import StoreSales from '@app/pages/StoreSales';
import SalesList from '@app/pages/SalesList';
import FixedNotification from '@app/pages/FixedNotification';
import CreateFixedNotification from '@app/pages/CreateFixedNotification';
import EditFixedNotification from '@app/pages/EditFixedNotification';
const Stack = createNativeStackNavigator<RootStackParamList>();

export function AdminStack() {
  const navigation = useNavigation<StackNavigation>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin"
        component={AdminList}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="UserManagement"
        component={UserManagement}
        options={{
          title: 'Kullanıcı Yönetimi',
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('CreateUser');
              }}
            />
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Kullanıcı Oluştur',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Kullanıcı Düzenle',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="ProductManagement"
        component={ProductManagement}
        options={{
          title: 'Ürün Yönetimi',
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('CreateProduct');
              }}
            />
          ),
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          title: 'Ürün Ekle',
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{
          title: 'Ürün Düzenle',
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="NotificationManagement"
        component={NotificationManagement}
        options={{
          title: 'Bildirim Yönetimi',
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('CreateNotification', {});
              }}
            />
          ),
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="IncomingNotification"
        component={IncomingNotification}
        options={{
          title: 'Gelen Bildirimler',
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('CreateNotification', {});
              }}
            />
          ),
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />

      <Stack.Screen
        name="SendNotification"
        component={SendNotification}
        options={{
          title: 'Gönderilen Bildirimler',
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('CreateNotification', {});
              }}
            />
          ),
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />

      <Stack.Screen
        name="CreateNotification"
        component={CreateNotification}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Bildirim Oluştur',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Bildirim Detayı',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="FixedNotification"
        component={FixedNotification}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Sabit Bildirimler',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('CreateFixedNotification');
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreateFixedNotification"
        component={CreateFixedNotification}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Sabit Bildirimler Oluştur',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />

      <Stack.Screen
        name="EditFixedNotification"
        component={EditFixedNotification}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Sabit Bildirimler Düzenle',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />

      <Stack.Screen
        name="StoreManagement"
        component={StoreManagement}
        options={{
          title: 'Mağaza Yönetimi',
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('CreateStore');
              }}
            />
          ),
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="CreateStore"
        component={CreateStore}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Mağaza Oluştur',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="EditStore"
        component={EditStore}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Mağazayı Düzenle',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="SalesManagement"
        component={SalesManagement}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Satış Yönetimi',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="UserSales"
        component={UserSales}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Kullanıcı Satışları',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="StoreSales"
        component={StoreSales}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Mağaza Satışları',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="SalesList"
        component={SalesList}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.white,
          title: 'Satış Listesi',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
}
