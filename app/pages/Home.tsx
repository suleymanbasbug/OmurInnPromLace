import {RootState} from '@app/store';
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <View>
      <Text>{user.username}</Text>
      <Text>Hello</Text>
    </View>
  );
}
