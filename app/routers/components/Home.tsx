import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {COLORS} from '@app/assets/values/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Home() {
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
    </Stack.Navigator>
  );
}
