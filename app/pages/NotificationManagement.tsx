import {COLORS} from '@app/assets/values/colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function NotificationManagement() {
  return (
    <View style={styles.container}>
      <Text> NotificationManagement</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  renderItemContainer: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    gap: 5,
    justifyContent: 'center',
  },
  renderHiddenItemContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1.0)',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: COLORS.delete,
  },
  backLeftBtn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: COLORS.edit,
  },
  leftImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: 'white',
    marginLeft: 20,
  },
  rightImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontFamily: 'Inter-Medium',
  },
});
