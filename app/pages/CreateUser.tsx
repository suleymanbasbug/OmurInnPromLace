import React, {useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../assets/values/colors';
import SubmitButton from '../components/SubmitButton';
import {
  CreateStoreApiArg,
  useCreateStoreMutation,
  useGetAllStoreQuery,
} from '@app/services/store';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import {useGetAllUserRoleQuery} from '@app/services/user-role';
import Dropdown from 'react-native-input-select';

export default function CreateUser() {
  const {data: userRole} = useGetAllUserRoleQuery();
  const {data: store} = useGetAllStoreQuery();
  const navigation = useNavigation<StackNavigation>();
  const [triggerCreateStore, {isLoading}] = useCreateStoreMutation();
  const [createFormData, setCreateFormData] = React.useState<CreateStoreApiArg>(
    {
      name: '',
      city: '',
      address: '',
      userRoleId: 0,
    },
  );

  useEffect(() => {
    console.log(userRole);
  }, [userRole]);
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
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: 'Mağaza oluşturulurken bir hata oluştu',
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
        placeholder="Kullanıcı Adı"
        value={createFormData.name}
        onChange={e => {
          setCreateFormData({...createFormData, name: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.primary}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Şifre"
        value={createFormData.city}
        onChange={e => {
          setCreateFormData({...createFormData, city: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.primary}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Şifre Onayla"
        value={createFormData.address}
        onChange={e => {
          setCreateFormData({...createFormData, address: e.nativeEvent.text});
        }}
        placeholderTextColor={COLORS.primary}
      />
      <Dropdown
        placeholder="Kullanıcı Rolü Seçiniz"
        options={
          userRole?.map(role => ({
            label: role.name,
            value: role.id,
          })) || []
        }
        selectedValue={createFormData.userRoleId}
        onValueChange={(value: any) => {
          setCreateFormData({...createFormData, userRoleId: value});
        }}
        primaryColor={COLORS.primary}
        dropdownIcon={<></>}
        dropdownStyle={styles.dropDownStyle}
        placeholderStyle={{color: COLORS.primary}}
      />
      <Dropdown
        placeholder="Kullanıcının Mağazasını Seçiniz"
        options={
          store?.map(role => ({
            label: role.name,
            value: role.id,
          })) || []
        }
        selectedValue={createFormData.userRoleId}
        onValueChange={(value: any) => {
          setCreateFormData({...createFormData, userRoleId: value});
        }}
        primaryColor={COLORS.primary}
        dropdownIcon={<></>}
        dropdownStyle={styles.dropDownStyle}
        placeholderStyle={{color: COLORS.primary}}
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
  dropDownStyle: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
