/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';

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

export type ScreenNames = [
  'Admin',
  'UserManagement',
  'ProductManagement',
  'NotificationManagement',
  'StoreManagement',
  'CreateStore',
];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AdminStackRouter() {
  const navigation = useNavigation<StackNavigation>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Admin" component={AdminList} />
      <Stack.Screen name="UserManagement" component={UserManagement} />
      <Stack.Screen name="ProductManagement" component={ProductManagement} />
      <Stack.Screen
        name="NotificationManagement"
        component={NotificationManagement}
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
          headerTintColor: COLORS.primary,
        }}
      />
      <Stack.Screen
        name="CreateStore"
        component={CreateStore}
        options={{
          headerLeft: HeaderBackButton,
          headerTintColor: COLORS.primary,
          title: 'Mağaza Oluştur',
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Setting Screen</Text>
    </View>
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
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

export default App;
