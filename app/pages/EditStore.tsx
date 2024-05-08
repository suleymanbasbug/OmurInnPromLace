import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../assets/values/colors';
import SubmitButton from '../components/SubmitButton';
import {UpdateStoreApiArg, useUpdateStoreMutation} from '@app/services/store';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, StackNavigation} from 'App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'EditStore'> {}
const EditStore: React.FC<Props> = ({route}) => {
  const {store} = route.params;
  const navigation = useNavigation<StackNavigation>();
  const [triggerUpdateStore, {isLoading}] = useUpdateStoreMutation();
  const [updateFormData, setUpdateFormData] =
    React.useState<UpdateStoreApiArg>(store);
  const handleCreateStore = () => {
    triggerUpdateStore({data: updateFormData})
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Başarılı',
          text2: 'Mağaza başarıyla güncellendi',
          position: 'bottom',
          bottomOffset: 75,
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: 'Mağaza güncellenirken bir hata oluştu',
          position: 'bottom',
          bottomOffset: 75,
        });
      })
      .finally(() => {
        navigation.goBack();
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Mağaza Adı"
        value={updateFormData.name}
        onChange={e => {
          setUpdateFormData({...updateFormData, name: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.primary}
      />
      <TextInput
        style={styles.textInput}
        placeholder="İl"
        value={updateFormData.city}
        onChange={e => {
          setUpdateFormData({...updateFormData, city: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.primary}
      />
      <TextInput
        style={styles.textInputMultiline}
        placeholder="Adres"
        multiline
        value={updateFormData.address}
        onChange={e => {
          setUpdateFormData({...updateFormData, address: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.primary}
      />
      <SubmitButton isLoading={isLoading} onPress={handleCreateStore} />
    </View>
  );
};

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
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
    paddingLeft: 8,
  },
  textInputMultiline: {
    width: '100%',
    height: 80,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
    paddingLeft: 8,
  },
});

export default EditStore;
