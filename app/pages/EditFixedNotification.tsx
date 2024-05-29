import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../assets/values/colors';
import SubmitButton from '../components/SubmitButton';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, StackNavigation} from 'App';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useUpdateFixedNotificationMutation} from '@app/services/fixedNotification';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
interface Props
  extends NativeStackScreenProps<RootStackParamList, 'EditFixedNotification'> {}

const EditFixedNotification: React.FC<Props> = ({route}) => {
  const {fixedNotification} = route.params;
  const navigation = useNavigation<StackNavigation>();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Başlık zorunludur'),
    description: Yup.string().required('Açıklama zorunludur'),
  });
  const [updateFixedNotification, {isLoading}] =
    useUpdateFixedNotificationMutation();

  return (
    <Formik
      initialValues={{
        title: fixedNotification.title,
        description: fixedNotification.description,
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        updateFixedNotification({
          title: values.title,
          description: values.description,
          id: fixedNotification.id,
        })
          .unwrap()
          .then(res => {
            console.log(res);
            Toast.show({
              type: 'success',
              text1: 'Başarılı',
              text2: 'Sabit bildirim başarıyla güncellendi',
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
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Başlık"
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            placeholderTextColor={COLORS.black}
            autoCapitalize="none"
          />
          {errors.title && touched.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}
          <TextInput
            style={styles.textInputMultiline}
            placeholder="Açıklama"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            placeholderTextColor={COLORS.black}
            autoCapitalize="none"
            multiline
          />
          {errors.description && touched.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
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

export default EditFixedNotification;
