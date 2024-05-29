import {COLORS} from '@app/assets/values/colors';
import SubmitButton from '@app/components/SubmitButton';
import {useChangePasswordMutation} from '@app/services/user';
import {RootState} from '@app/store';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

export default function Settings() {
  const user = useSelector((state: RootState) => state.user);

  const [triggerChangePassword, {isLoading}] = useChangePasswordMutation();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Şifre zorunludur')
      .min(8, 'En az 8 karakter olmalıdır'),
    password_confirmation: Yup.string()
      .required('Şifre onayı zorunludur')
      .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor'),
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{`Hoş Geldin ${user.username}`}</Text>
        <Text style={styles.title}>Puanınız : </Text>
        <Text style={styles.title}>{`${user.points}`}</Text>
      </View>
      <Formik
        initialValues={{
          password: '',
          password_confirmation: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          triggerChangePassword({
            password: values.password,
            password_confirmation: values.password_confirmation,
          })
            .unwrap()
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Başarılı',
                text2: 'Şifreniz başarıyla değiştirildi.',
                position: 'bottom',
                bottomOffset: 75,
              });
              values.password = '';
              values.password_confirmation = '';
            })
            .catch(err => {
              console.log(err);
            });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.passwordChangeContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Şifre"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholderTextColor={COLORS.black}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.textInput}
              placeholder="Şifre Onayla"
              value={values.password_confirmation}
              onChangeText={handleChange('password_confirmation')}
              onBlur={handleBlur('password_confirmation')}
              placeholderTextColor={COLORS.black}
              secureTextEntry={true}
            />
            {errors.password_confirmation && touched.password_confirmation && (
              <Text style={styles.errorText}>
                {errors.password_confirmation}
              </Text>
            )}
            <SubmitButton
              onPress={handleSubmit}
              title="Şifreyi Değiştir"
              isLoading={isLoading}
            />
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    color: COLORS.black,
    fontFamily: 'Inter-Bold',
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
  passwordChangeContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});
