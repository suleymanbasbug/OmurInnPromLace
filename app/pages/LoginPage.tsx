import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {COLORS} from '@app/assets/values/colors';
import SubmitButton from '@app/components/SubmitButton';
import {useLoginMutation, useMeMutation} from '@app/services/auth';

import {Formik} from 'formik';
import React from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import store from '@app/store';
import {setToken, setUser} from '@app/store/userSlice';

export default function LoginPage() {
  const [triggerLogin, {isLoading}] = useLoginMutation();
  const [triggerMe] = useMeMutation();
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={values => {
        console.log(values);
        triggerLogin(values).then(response => {
          if (response.hasOwnProperty('error')) {
            Toast.show({
              type: 'error',
              text1: 'Hata',
              text2: 'Kullanıcı adı veya şifre hatalı',
              position: 'bottom',
              bottomOffset: 50,
            });
            return;
          } else {
            //@ts-ignore
            store.dispatch(setToken(response.data));
            triggerMe()
              .then(res => {
                //@ts-ignore
                store.dispatch(setUser(res.data));
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <Image source={ImageResources.login} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="Kullanıcı Adı"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            placeholderTextColor={COLORS.black}
            autoCapitalize="none"
          />
          {errors.username && touched.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
          <TextInput
            style={styles.textInput}
            placeholder="Şifre"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholderTextColor={COLORS.black}
            secureTextEntry
            autoCapitalize="none"
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <SubmitButton
            onPress={handleSubmit}
            title="Giriş Yap"
            isLoading={isLoading}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: COLORS.black,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
    paddingLeft: 8,
  },
  errorText: {
    color: COLORS.primary,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  icon: {
    alignSelf: 'center',
    tintColor: COLORS.primary,
  },
});
