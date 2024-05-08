import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import React from 'react';
import {Image, ImageURISource, StyleSheet, Text, View} from 'react-native';

export type EmptyListImages = 'store';

export type EmptyProps = {
  image: EmptyListImages;
  title: string;
};

const emptyImages: Record<EmptyListImages, ImageURISource> = {
  store: ImageResources.store,
};

export default function Empty({image, title}: EmptyProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={emptyImages[image]} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    fontFamily: 'Inter-Regular',
    marginTop: 10,
  },
});
