import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, View} from 'react-native';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';
import {AdminStack} from './AdminStack';
import {useSelector} from 'react-redux';
import {RootState} from '@app/store';

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  const role_id = useSelector((state: RootState) => state.user.role_id);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
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
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
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
          title: 'Ayarlar',
        }}
      />
      {role_id === 1 && (
        <Tab.Screen
          name="AdminTab"
          component={AdminStack}
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
      )}
    </Tab.Navigator>
  );
}
