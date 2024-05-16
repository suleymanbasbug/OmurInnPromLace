import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import {Button, Text, View} from 'react-native';

export default function Settings() {
  const navigation = useNavigation<StackNavigation>();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Setting Screen</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Tabs');
        }}
      />
    </View>
  );
}
