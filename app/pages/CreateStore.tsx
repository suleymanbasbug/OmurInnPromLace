import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../assets/values/colors';
import SubmitButton from '../components/SubmitButton';

export default function CreateStore() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} placeholder="Mağaza Adı" />
      <TextInput style={styles.textInput} placeholder="İl" />
      <TextInput
        style={styles.textInputMultiline}
        placeholder="Adres"
        multiline
      />
      <SubmitButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
    paddingLeft: 8,
  },
  textInputMultiline: {
    width: '100%',
    height: 80,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
    paddingLeft: 8,
  },
});
