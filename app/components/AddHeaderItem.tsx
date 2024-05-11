import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {ImageResources} from '../assets/Generated/ImageResources.g';
import {COLORS} from '../assets/values/colors';

export default function AddHeaderItem({onPress}: {onPress: () => void}) {
  return (
    <Pressable onPress={onPress}>
      <Image source={ImageResources.add_circle} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    tintColor: COLORS.white,
  },
});
