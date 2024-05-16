import React from 'react';
import {RootStackParamList} from 'App';
import {COLORS} from '@app/assets/values/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '@app/pages/Settings';
import AddHeaderItem from '@app/components/AddHeaderItem';
import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {useLogoutMutation} from '@app/services/auth';
import store from '@app/store';
import {
  initialTokenState,
  initialUserState,
  setToken,
  setUser,
} from '@app/store/userSlice';
const Stack = createNativeStackNavigator<RootStackParamList>();
const AddHeaderItemComponent = () => {
  const [triggerLogout] = useLogoutMutation();
  return (
    <AddHeaderItem
      onPress={() => {
        triggerLogout()
          .unwrap()
          .then(() => {
            store.dispatch(setToken(initialTokenState));
            store.dispatch(setUser(initialUserState));
          });
      }}
      image={ImageResources.logout}
    />
  );
};
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
