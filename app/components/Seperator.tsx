import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Seperator() {
  return <View style={styles.seperator} />;
}

const styles = StyleSheet.create({
  seperator: {
    height: 0.5,
    backgroundColor: '#A2A2A2',
  },
});
