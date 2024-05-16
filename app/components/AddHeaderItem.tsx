import React from 'react';
import {Image, ImageURISource, Pressable, StyleSheet} from 'react-native';
import {ImageResources} from '../assets/Generated/ImageResources.g';
import {COLORS} from '../assets/values/colors';

export default function AddHeaderItem({
  onPress,
  image = ImageResources.add_circle,
}: {
  onPress: () => void;
  image: ImageURISource;
}) {
  return (
    <Pressable onPress={onPress}>
      <Image source={image} style={styles.image} />
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
