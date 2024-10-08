import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../assets/values/colors';
import SubmitButton from '../components/SubmitButton';
import {CreateStoreApiArg, useCreateStoreMutation} from '@app/services/store';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';

export default function CreateStore() {
  const navigation = useNavigation<StackNavigation>();
  const [triggerCreateStore, {isLoading}] = useCreateStoreMutation();
  const [createFormData, setCreateFormData] = React.useState<CreateStoreApiArg>(
    {
      name: '',
      city: '',
      address: '',
    },
  );
  const handleCreateStore = () => {
    triggerCreateStore(createFormData)
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Başarılı',
          text2: 'Mağaza başarıyla oluşturuldu',
          position: 'bottom',
          bottomOffset: 75,
        });
        navigation.goBack();
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: error.data.message || 'Mağaza Oluşturulurken bir hata oluştu',
          position: 'bottom',
          bottomOffset: 75,
        });
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Mağaza Adı"
        value={createFormData.name}
        onChange={e => {
          setCreateFormData({...createFormData, name: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.textInput}
        placeholder="İl"
        value={createFormData.city}
        onChange={e => {
          setCreateFormData({...createFormData, city: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.textInputMultiline}
        placeholder="Adres"
        multiline
        value={createFormData.address}
        onChange={e => {
          setCreateFormData({...createFormData, address: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.black}
      />
      <SubmitButton isLoading={isLoading} onPress={handleCreateStore} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
});
