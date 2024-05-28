import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../assets/values/colors';
import SubmitButton from '../components/SubmitButton';
import {useGetAllStoreQuery} from '@app/services/store';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import {useGetAllUserRoleQuery} from '@app/services/user-role';
import Dropdown from 'react-native-input-select';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useRegisterMutation} from '@app/services/user';

export default function CreateUser() {
  const {data: userRole} = useGetAllUserRoleQuery();
  const {data: stores} = useGetAllStoreQuery();
  const navigation = useNavigation<StackNavigation>();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Kullanıcı adı zorunludur')
      .matches(/^\S*$/, 'Boşluk içeremez'),
    password: Yup.string().required('Şifre zorunludur'),
    password_confirmation: Yup.string()
      .required('Şifre onayı zorunludur')
      .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor'),
    role_id: Yup.number().required('Kullanıcı rolü zorunludur'),
    store_id: Yup.number().required('Mağaza zorunludur'),
  });
  const [createUser, {isLoading}] = useRegisterMutation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        password_confirmation: '',
        role_id: null,
        store_id: null,
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        createUser({
          username: values.username.toLowerCase(),
          password: values.password,
          password_confirmation: values.password_confirmation,
          role_id: values.role_id || 2,
          store_id: values.store_id,
        })
          .unwrap()
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Başarılı',
              text2: 'Kullanıcı başarıyla oluşturuldu',
              position: 'bottom',
              bottomOffset: 75,
            });
            navigation.goBack();
          })
          .catch(e => {
            Toast.show({
              type: 'error',
              text1: 'Hata',
              text2: e.data.message,
              position: 'bottom',
              bottomOffset: 75,
            });
          });
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
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
            <Text style={styles.errorText}>{errors.password_confirmation}</Text>
          )}
          <Dropdown
            placeholder="Kullanıcı Rolü Seçiniz"
            options={
              userRole?.map(role => ({
                label: role.name,
                value: role.id,
              })) || []
            }
            selectedValue={values.role_id}
            onValueChange={(value: any) => {
              setFieldValue('role_id', value);
            }}
            primaryColor={COLORS.primary}
            dropdownIcon={<></>}
            dropdownStyle={styles.dropDownStyle}
            placeholderStyle={{color: COLORS.black}}
            listControls={{
              emptyListMessage: 'Rol Bulunamadı',
            }}
          />
          {errors.role_id && touched.role_id && (
            <Text style={styles.errorText}>{errors.role_id}</Text>
          )}
          <Dropdown
            placeholder="Kullanıcının Mağazasını Seçiniz"
            options={
              stores?.map(store => ({
                label: store.name,
                value: store.id,
              })) || []
            }
            selectedValue={values.store_id}
            onValueChange={(value: any) => {
              setFieldValue('store_id', value);
            }}
            primaryColor={COLORS.primary}
            dropdownIcon={<></>}
            dropdownStyle={styles.dropDownStyle}
            placeholderStyle={{color: COLORS.black}}
            listControls={{
              emptyListMessage: 'Mağaza Bulunamadı',
            }}
            isSearchable
            searchControls={{
              textInputProps: {
                placeholder: 'Ara',
                placeholderTextColor: COLORS.black,
              },
            }}
          />
          {errors.store_id && touched.store_id && (
            <Text style={styles.errorText}>{errors.store_id}</Text>
          )}
          <SubmitButton isLoading={isLoading} onPress={handleSubmit} />
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
  textInputMultiline: {
    width: '100%',
    height: 80,
    borderColor: COLORS.black,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
    paddingLeft: 8,
  },
  dropDownStyle: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 8,
  },
  errorText: {
    color: COLORS.primary,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});
