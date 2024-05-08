import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import Seperator from '@app/components/Seperator';
import {useGetAllStoreQuery} from '@app/services/store';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function StoreManagement() {
  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text> Mağaza Adı : {item.name}</Text>
        <Text> Şehir : {item.city}</Text>
        <Text> Adres : {item.address}</Text>
      </View>
    );
  };

  const renderHiddenItem = () => {
    return (
      <View style={styles.renderHiddenItemContainer}>
        <Pressable style={styles.backLeftBtn}>
          <Image style={styles.leftImage} source={ImageResources.edit_icon} />
        </Pressable>
        <Pressable style={styles.backRightBtn}>
          <Image
            style={styles.rightImage}
            source={ImageResources.delete_icon}
          />
        </Pressable>
      </View>
    );
  };

  const {data} = useGetAllStoreQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
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
    height: 100,
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
    height: 100,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: '#ff4444',
  },
  backLeftBtn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: '#ffa500',
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
});
