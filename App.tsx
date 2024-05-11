/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View} from 'react-native';

import {getFcmToken, registerListenerWithFCM} from './app/utils/fcmHelper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdminList from './app/pages/AdminList';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {ImageResources} from './app/assets/Generated/ImageResources.g';
import UserManagement from './app/pages/UserManagement';
import ProductManagement from './app/pages/ProductManagement';
import NotificationManagement from './app/pages/NotificationManagement';
import StoreManagement from './app/pages/StoreManagement';
import AddHeaderItem from './app/components/AddHeaderItem';
import CreateStore from './app/pages/CreateStore';
import HeaderBackButton from './app/components/HeaderBackButton';
import {COLORS} from './app/assets/values/colors';
import {Provider} from 'react-redux';
import {store} from './app/store';
import Toast from 'react-native-toast-message';
import EditStore from '@app/pages/EditStore';
import {Store} from '@app/services/store';
import CreateUser from '@app/pages/CreateUser';
import {User} from '@app/services/user';
import EditUser from '@app/pages/EditUser';
import CreateProduct from '@app/pages/CreateProduct';
import {ProductDto} from '@app/services/product';
import EditProduct from '@app/pages/EditProduct';
import CreateNotification from '@app/pages/CreateNotification';
import LoginPage from '@app/pages/LoginPage';

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
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AdminStackRouter() {
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
                navigation.navigate('CreateNotification');
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
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  const navigation = useNavigation<StackNavigation>();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Setting Screen</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Tabs');
        }}
      />
    </View>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="Tabs"
        component={AppTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="AdminTab"
        component={AdminStackRouter}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={ImageResources.admin_icon}
                style={{width: 24, height: 24}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>

      <Toast />
    </Provider>
  );
}

export default App;
