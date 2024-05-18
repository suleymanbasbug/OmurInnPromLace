import {COLORS} from '@app/assets/values/colors';
import LoginPage from '@app/pages/LoginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';

import React from 'react';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Auth() {
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
          title: 'Giriş Yap',
        }}
      />
    </Stack.Navigator>
  );
}
