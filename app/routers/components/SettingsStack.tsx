import React from 'react';
import {RootStackParamList} from 'App';
import {COLORS} from '@app/assets/values/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '@app/pages/Settings';
import AddHeaderItem from '@app/components/AddHeaderItem';
import {ImageResources} from '@app/assets/Generated/ImageResources.g';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AddHeaderItemComponent = () => (
  <AddHeaderItem
    onPress={() => {
      console.log('Logout');
    }}
    image={ImageResources.logout}
  />
);
export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          title: 'Ayarlar',
          headerRight: AddHeaderItemComponent,
        }}
      />
    </Stack.Navigator>
  );
}
