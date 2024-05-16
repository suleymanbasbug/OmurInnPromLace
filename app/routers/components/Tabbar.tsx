import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, View} from 'react-native';
import Home from './Home';
import Settings from './Settings';
import {AdminStackRouter} from './Admin';

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={Home}
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
      <Tab.Screen name="Settings" component={Settings} />
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
