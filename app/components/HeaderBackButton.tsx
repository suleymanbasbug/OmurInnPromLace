import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {ImageResources} from '../assets/Generated/ImageResources.g';
import {StackNavigation} from '../../App';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../assets/values/colors';

export default function HeaderBackButton() {
  const navigation = useNavigation<StackNavigation>();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Image source={ImageResources.arrow_back} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    tintColor: COLORS.primary,
  },
});
