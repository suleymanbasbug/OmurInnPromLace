import {getFcmToken, registerListenerWithFCM} from '@app/utils/fcmHelper';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

export default function Home() {
  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
