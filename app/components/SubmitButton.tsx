import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../assets/values/colors';

export default function SubmitButton({
  isLoading = false,
  onPress,
  title = 'KAYDET',
  disabled = false,
}: {
  isLoading?: boolean;
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
}) {
  return (
    <Pressable
      style={[
        styles.button,
        {backgroundColor: disabled ? COLORS.disabled : COLORS.primary},
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}>
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
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
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
