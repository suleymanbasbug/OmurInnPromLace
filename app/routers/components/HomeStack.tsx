import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {COLORS} from '@app/assets/values/colors';
import Home from '@app/pages/Home';
import Sales from '@app/pages/Sales';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStack() {
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
        }}
      />
    </Stack.Navigator>
  );
}
