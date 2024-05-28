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
import {useSelector} from 'react-redux';
import {RootState} from '@app/store';
import {useGetAllUserQuery} from '@app/services/user';
export default function CreateNotification() {
  const userId = useSelector((state: RootState) => state.user.id);
  const {data: userRole} = useGetAllUserRoleQuery();
  const {data: stores} = useGetAllStoreQuery();
  const {data: users} = useGetAllUserQuery();
  const [triggerSendPushNotification, {isLoading}] =
    useSendPushNotificationMutation();
  const navigation = useNavigation<StackNavigation>();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Başlık zorunludur'),
    description: Yup.string().required('Açıklama zorunludur'),
    roleIds: Yup.array(),
    userIds: Yup.array().when(['roleIds', 'storeIds'], {
      is: (roleIds: number[], storeIds: number[]) =>
        roleIds.length === 0 && storeIds.length === 0,
      then: (schema: any) =>
        schema.min(1, 'Yukarıdaki seçeneklerden en az birini seçiniz'),
      otherwise: (schema: any) => schema.notRequired(),
    }),
  });
  return (
    <Formik
      initialValues={{
        roleIds: [],
        title: '',
        description: '',
        storeIds: [],
        userIds: [],
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        triggerSendPushNotification({
          title: values.title,
          description: values.description,
          sender_id: userId,
          roleIds: values.roleIds,
          storeIds: values.storeIds,
          userIds: values.userIds,
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
            selectedValue={values.roleIds}
            onValueChange={(value: any) => {
              setFieldValue('roleIds', value);
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
          {errors.roleIds && touched.roleIds && (
            <Text style={styles.errorText}>{errors.roleIds}</Text>
          )}
          <Dropdown
            placeholder="Hangi Mağazaya Bildirim Gönderilecek?"
            options={
              stores?.map(store => ({
                label: store.name,
                value: store.id,
              })) || []
            }
            selectedValue={values.storeIds}
            onValueChange={(value: any) => {
              setFieldValue('storeIds', value);
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
          {errors.storeIds && touched.storeIds && (
            <Text style={styles.errorText}>{errors.storeIds}</Text>
          )}
          <Dropdown
            placeholder="Hangi Kullanıcılara Bildirim Gönderilecek?"
            options={
              users?.map(user => ({
                label: user.username,
                value: user.id,
              })) || []
            }
            selectedValue={values.userIds}
            onValueChange={(value: any) => {
              setFieldValue('userIds', value);
            }}
            primaryColor={COLORS.primary}
            dropdownIcon={<></>}
            dropdownStyle={styles.dropDownStyle}
            placeholderStyle={{color: COLORS.black}}
            listControls={{
              emptyListMessage: 'Kullanıcı Bulunamadı',
              selectAllText: 'Hepsini Seç',
              unselectAllText: 'Hepsini Kaldır',
            }}
            isMultiple
            isSearchable
            searchControls={{
              textInputProps: {
                placeholder: 'Ara',
                placeholderTextColor: COLORS.black,
              },
            }}
          />
          {errors.userIds && touched.userIds && (
            <Text style={styles.errorText}>{errors.userIds}</Text>
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
