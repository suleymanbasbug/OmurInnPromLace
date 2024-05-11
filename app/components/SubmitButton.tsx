import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../assets/values/colors';

export default function SubmitButton({
  isLoading = false,
  onPress,
  title = 'KAYDET',
}: {
  isLoading?: boolean;
  onPress?: () => void;
  title?: string;
}) {
  return (
    <Pressable style={styles.button} onPress={onPress} disabled={isLoading}>
      <Text style={styles.text}>{title}</Text>
      {isLoading && (
        <ActivityIndicator
          color="white"
          size="small"
          style={styles.activityIndicator}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    right: 16,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
