import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, StackNavigation} from 'App';
import {COLORS} from '@app/assets/values/colors';
import Home from '@app/pages/Home';
import Sales from '@app/pages/Sales';
import AddHeaderItem from '@app/components/AddHeaderItem';
import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import NotificationList from '@app/pages/NotificationList';
import {useNavigation} from '@react-navigation/native';
import NotificationDetail from '@app/pages/NotificationDetail';
import HeaderBackButton from '@app/components/HeaderBackButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStack() {
  const navigation = useNavigation<StackNavigation>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          title: 'Anasayfa',
          headerRight: () => (
            <AddHeaderItem
              onPress={() => {
                navigation.navigate('NotificationList');
              }}
              image={ImageResources.notification}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Sales"
        component={Sales}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          title: 'Satış Yaptım',
        }}
      />
      <Stack.Screen
        name="NotificationList"
        component={NotificationList}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          title: 'Bildirimler',
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
    </Stack.Navigator>
  );
}
