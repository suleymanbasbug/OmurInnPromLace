import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {COLORS} from '@app/assets/values/colors';
import React, {useState} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function Searchbar({
  value,
  onSubmit,
}: {
  value: string;
  onSubmit: (value: string) => void;
}) {
  const [text, setText] = useState(value);
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[COLORS.primary, COLORS.white]}
      style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={ImageResources.headerbar_search} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          inputMode="search"
          placeholder="Ara"
          placeholderTextColor={Colors.black}
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => onSubmit(text)}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    flexDirection: 'row',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    height: 36,
    borderRadius: 5,
    paddingLeft: 5,
  },
  icon: {
    width: 16,
    height: 16,
    top: 10,
    left: 10,
    tintColor: Colors.black,
    position: 'absolute',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.black,
    paddingLeft: 30,
  },
});
