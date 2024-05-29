import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../assets/values/colors';
import SubmitButton from '../components/SubmitButton';
import {useGetAllStoreQuery} from '@app/services/store';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, StackNavigation} from 'App';
import {useGetAllUserRoleQuery} from '@app/services/user-role';
import Dropdown from 'react-native-input-select';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useUpdateUserMutation} from '@app/services/user';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'EditUser'> {}

const EditUser: React.FC<Props> = ({route}) => {
  const {user} = route.params;
  const {data: userRole} = useGetAllUserRoleQuery();
  const {data: stores} = useGetAllStoreQuery();
  const navigation = useNavigation<StackNavigation>();
  const validationSchema = Yup.object().shape({
    id: Yup.number().required('Kullanıcı id zorunludur'),
    username: Yup.string().required('Kullanıcı adı zorunludur'),
    password: Yup.string(),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password')],
      'Şifreler uyuşmuyor',
    ),
    role_id: Yup.number().required('Kullanıcı rolü zorunludur'),
    store_id: Yup.number().required('Mağaza zorunludur'),
    points: Yup.number()
      .typeError('Sayısal bir değer giriniz')
      .required('Puan zorunludur'),
  });
  const [updateUser, {isLoading}] = useUpdateUserMutation();

  return (
    <Formik
      initialValues={{
        id: user.id,
        username: user.username,
        password: '',
        password_confirmation: '',
        role_id: user.role_id,
        store_id: user.store_id,
        points: user.points,
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        updateUser({
          id: values.id,
          username: values.username.toLowerCase(),
          password: values.password,
          password_confirmation: values.password_confirmation,
          role_id: values.role_id || 2,
          store_id: values.store_id,
          points: values.points,
        })
          .unwrap()
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Başarılı',
              text2: 'Kullanıcı başarıyla güncellendi',
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
          <TextInput
            style={styles.textInput}
            placeholder="Puan"
            value={values.points.toString()}
            onChangeText={handleChange('points')}
            onBlur={handleBlur('points')}
            placeholderTextColor={COLORS.black}
            keyboardType="numeric"
          />
          {errors.points && touched.points && (
            <Text style={styles.errorText}>{errors.points}</Text>
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
          />
          <SubmitButton isLoading={isLoading} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

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

export default EditUser;
