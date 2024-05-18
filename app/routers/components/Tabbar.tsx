import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, Text, View} from 'react-native';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';
import {AdminStack} from './AdminStack';
import {useSelector} from 'react-redux';
import {RootState} from '@app/store';
import {COLORS} from '@app/assets/values/colors';

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
                source={ImageResources.home}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? COLORS.primary : 'black',
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.primary : 'black',
                  fontSize: 12,
                }}>
                Anasayfa
              </Text>
            );
          },
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
                source={ImageResources.settings}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? COLORS.primary : 'black',
                }}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  color: focused ? COLORS.primary : 'black',
                  fontSize: 12,
                }}>
                Ayarlar
              </Text>
            );
          },
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
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? COLORS.primary : 'black',
                  }}
                />
              </View>
            ),
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? COLORS.primary : 'black',
                    fontSize: 12,
                  }}>
                  Admin Panel
                </Text>
              );
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
}
