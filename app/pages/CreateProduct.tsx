import {COLORS} from '@app/assets/values/colors';
import SubmitButton from '@app/components/SubmitButton';
import {useGetAllSizeQuery} from '@app/services/size';
import {Formik} from 'formik';
import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import Dropdown from 'react-native-input-select';
import {launchImageLibrary} from 'react-native-image-picker';
import {useCreateProductMutation} from '@app/services/product';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {StackNavigation} from 'App';
import {useNavigation} from '@react-navigation/native';

export default function CreateProduct() {
  const navigation = useNavigation<StackNavigation>();
  const {data: sizes} = useGetAllSizeQuery();
  const [triggerCreateProduct] = useCreateProductMutation();

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Ürün kodu zorunludur'),
    colors: Yup.string().required('Ürün renkleri zorunludur'),
    sizes: Yup.array()
      .required('Beden seçimi zorunludur')
      .min(1, 'Beden seçimi zorunludur'),
  });
  return (
    <Formik
      initialValues={{
        code: '',
        image: undefined,
        colors: '',
        sizes: [],
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        const formData = new FormData();
        formData.append('image', {
          uri: (values.image as any).uri,
          type: (values.image as any).type,
          name: (values.image as any).fileName,
        });
        formData.append('code', values.code);
        formData.append('colors', values.colors);
        formData.append('sizes', values.sizes?.toString() || []);
        triggerCreateProduct(formData)
          .unwrap()
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Başarılı',
              text2: 'Ürün başarıyla oluşturuldu',
              position: 'bottom',
              bottomOffset: 75,
            });
            navigation.goBack();
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Hata',
              text2: 'Ürün oluşturulurken bir hata oluştu',
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
            placeholder="Ürün kodu"
            value={values.code}
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            placeholderTextColor={COLORS.black}
            autoCapitalize="none"
          />
          {errors.code && touched.code && (
            <Text style={styles.errorText}>{errors.code}</Text>
          )}
          <TextInput
            style={styles.textInput}
            placeholder="Ürün renklerini aralarında boşluk bırakarak giriniz"
            value={values.colors}
            onChangeText={handleChange('colors')}
            onBlur={handleBlur('colors')}
            placeholderTextColor={COLORS.black}
            autoCapitalize="none"
          />
          {errors.code && touched.code && (
            <Text style={styles.errorText}>{errors.code}</Text>
          )}
          <Dropdown
            placeholder="Beden Seçiniz"
            options={
              sizes?.map(size => ({
                label: size.size,
                value: size.id,
              })) || []
            }
            selectedValue={values.sizes}
            onValueChange={(itemValue: any) => {
              setFieldValue('sizes', itemValue);
            }}
            primaryColor={COLORS.primary}
            dropdownIcon={<></>}
            dropdownStyle={styles.dropDownStyle}
            placeholderStyle={{color: COLORS.black}}
            listControls={{
              emptyListMessage: 'Beden Bulunamadı',
              selectAllText: 'Hepsini Seç',
              unselectAllText: 'Hepsini Kaldır',
            }}
            isMultiple
          />
          {errors.sizes && touched.sizes && (
            <Text style={styles.errorText}>{errors.sizes}</Text>
          )}
          {values.image && (
            <Image
              source={{uri: (values.image as any).uri}}
              style={styles.image}
            />
          )}
          <SubmitButton
            onPress={async () => {
              const result = await launchImageLibrary(
                {mediaType: 'photo', includeBase64: false},
                () => {},
              );
              if (result) {
                setFieldValue('image', result.assets?.[0]);
              }
            }}
            title="Resim Seç"
          />

          <SubmitButton onPress={handleSubmit} />
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
  dropDownStyle: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 8,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
});
