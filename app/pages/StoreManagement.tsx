/* eslint-disable react/no-unstable-nested-components */
import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {COLORS} from '@app/assets/values/colors';
import Empty from '@app/components/Empty';
import Seperator from '@app/components/Seperator';
import {
  Store,
  useDeleteStoreMutation,
  useGetAllStoreQuery,
} from '@app/services/store';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function StoreManagement() {
  const {data} = useGetAllStoreQuery();
  const [triggerDelete] = useDeleteStoreMutation();
  const navigation = useNavigation<StackNavigation>();

  const handleDelete = ({id}: {id: number}) => {
    Alert.alert('Sil', 'Mağaza silinecek onaylıyor musun ?', [
      {
        text: 'İptal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sil', onPress: () => triggerDelete(id)},
    ]);
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.description}>
          <Text style={styles.title}>Mağaza Adı : </Text> {item.name}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Şehir : </Text> {item.city}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Adress : </Text> {item.address}
        </Text>
      </View>
    );
  };

  const renderHiddenItem = ({item}: {item: Store}) => {
    return (
      <View style={styles.renderHiddenItemContainer}>
        <Pressable
          style={styles.backLeftBtn}
          onPress={() => navigation.navigate('EditStore', {store: item})}>
          <Image style={styles.leftImage} source={ImageResources.edit_icon} />
        </Pressable>
        <Pressable
          style={styles.backRightBtn}
          onPress={() => handleDelete({id: item.id})}>
          <Image
            style={styles.rightImage}
            source={ImageResources.delete_icon}
          />
        </Pressable>
      </View>
    );
  };
  const EmptyComponent = () => (
    <Empty
      image="store"
      title={`Mağaza bulunamadı.\n Sağ üstteki icon'a tıklayarak mağaza oluşturabilisiniz`}
    />
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={data}
        useFlatList={true}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={Seperator}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        leftOpenValue={75}
        stopLeftSwipe={Dimensions.get('window').width / 2}
        stopRightSwipe={-Dimensions.get('window').width / 2}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  renderItemContainer: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    gap: 5,
    justifyContent: 'center',
  },
  renderHiddenItemContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1.0)',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: COLORS.delete,
  },
  backLeftBtn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: COLORS.edit,
  },
  leftImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: 'white',
    marginLeft: 20,
  },
  rightImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontFamily: 'Inter-Medium',
  },
});
