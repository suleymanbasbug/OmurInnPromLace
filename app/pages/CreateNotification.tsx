import {COLORS} from '@app/assets/values/colors';
import SubmitButton from '@app/components/SubmitButton';
import {useSendPushNotificationMutation} from '@app/services/notification';
import {useGetAllUserRoleQuery} from '@app/services/user-role';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Dropdown from 'react-native-input-select';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import {useGetAllStoreQuery} from '@app/services/store';

export default function CreateNotification() {
  const {data: userRole} = useGetAllUserRoleQuery();
  const {data: stores} = useGetAllStoreQuery();
  const [triggerSendPushNotification, {isLoading}] =
    useSendPushNotificationMutation();
  const navigation = useNavigation<StackNavigation>();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Başlık zorunludur'),
    description: Yup.string().required('Açıklama zorunludur'),
    role_id: Yup.array(),
    store_id: Yup.array().when('role_id', {
      is: (role_id: number[]) => role_id.length === 0,
      then: (schema: any) => schema.min(1, 'Mağaza veya Rol seçimi zorunludur'),
      otherwise: (schema: any) => schema.notRequired(),
    }),
  });
  return (
    <Formik
      initialValues={{
        role_id: [],
        title: '',
        description: '',
        store_id: [],
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        triggerSendPushNotification({
          title: values.title,
          description: values.description,
          role_id: values.role_id,
          sender_id: 1,
        })
          .unwrap()
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Başarılı',
              text2: 'Bildirim başarıyla gönderildi',
              position: 'bottom',
              bottomOffset: 75,
            });
            navigation.goBack();
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Hata',
              text2: 'Bildirim gönderilirken bir hata oluştu',
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
          <Dropdown
            placeholder="Hangi Kullanıcı Rolüne Bildirim Gönderilecek?"
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
              selectAllText: 'Hepsini Seç',
              unselectAllText: 'Hepsini Kaldır',
            }}
            isMultiple
          />
          {errors.role_id && touched.role_id && (
            <Text style={styles.errorText}>{errors.role_id}</Text>
          )}
          <Dropdown
            placeholder="Hangi Mağazaya Bildirim Gönderilecek?"
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
              selectAllText: 'Hepsini Seç',
              unselectAllText: 'Hepsini Kaldır',
            }}
            isMultiple
          />
          {errors.store_id && touched.store_id && (
            <Text style={styles.errorText}>{errors.store_id}</Text>
          )}
          <TextInput
            style={styles.textInput}
            placeholder="Başlık"
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            placeholderTextColor={COLORS.black}
          />
          {errors.title && touched.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}
          <TextInput
            style={styles.textInputMultiline}
            placeholder="Açıklama"
            multiline
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            placeholderTextColor={COLORS.black}
          />
          {errors.description && touched.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
          <SubmitButton
            onPress={handleSubmit}
            title="Gönder"
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
