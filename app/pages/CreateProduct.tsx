import {COLORS} from '@app/assets/values/colors';
import SubmitButton from '@app/components/SubmitButton';
import {useGetAllSizeQuery} from '@app/services/size';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Dropdown from 'react-native-input-select';

export default function CreateProduct() {
  const {data: sizes} = useGetAllSizeQuery();
  return (
    <Formik
      initialValues={{
        code: '',
        image: '',
        colors: '',
        sizes: undefined,
      }}
      onSubmit={values => {
        console.log(values);
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
              console.log(itemValue);
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
