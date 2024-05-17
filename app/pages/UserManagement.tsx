import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {COLORS} from '@app/assets/values/colors';
import Empty from '@app/components/Empty';
import Searchbar from '@app/components/Searchbar';
import Seperator from '@app/components/Seperator';
import {
  User,
  useDeleteUserMutation,
  useGetAllUserQuery,
} from '@app/services/user';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import React, {useEffect} from 'react';
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

export default function UserManagement() {
  const navigation = useNavigation<StackNavigation>();
  const {data} = useGetAllUserQuery();
  const [triggerDelete] = useDeleteUserMutation();
  const [filteredData, setFilteredData] = React.useState<User[]>([]);

  const handleSearch = (value: string) => {
    if (value) {
      const filtered = data?.filter(item => {
        return (
          item.username.toLowerCase().includes(value.toLowerCase()) ||
          item.role.name.toLowerCase().includes(value.toLowerCase()) ||
          item.store?.name.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(filtered || []);
    } else {
      setFilteredData(data || []);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert('Sil', 'Kullanıcı silinecek onaylıyor musun ?', [
      {
        text: 'İptal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sil', onPress: () => triggerDelete(id)},
    ]);
  };

  const renderItem = ({item}: {item: User}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.description}>
          <Text style={styles.title}>Kullanıcı Adı : </Text> {item.username}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Rolü : </Text> {item.role.name}
        </Text>
        {item.store ? (
          <Text style={styles.description}>
            <Text style={styles.title}>Mağaza : </Text> {item.store.name}
          </Text>
        ) : null}
      </View>
    );
  };

  const renderHiddenItem = ({item}: {item: User}) => {
    return (
      <View style={styles.renderHiddenItemContainer}>
        <Pressable
          style={styles.backLeftBtn}
          onPress={() => navigation.navigate('EditUser', {user: item})}>
          <Image style={styles.leftImage} source={ImageResources.edit_icon} />
        </Pressable>
        <Pressable
          style={styles.backRightBtn}
          onPress={() => handleDelete(item.id)}>
          <Image
            style={styles.rightImage}
            source={ImageResources.delete_icon}
          />
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const EmptyComponent = () => (
    <Empty
      image="user"
      title={`Kullanıcı bulunamadı.\n Sağ üstteki icon'a tıklayarak kullanıcı oluşturabilisiniz`}
    />
  );

  return (
    <View style={styles.container}>
      {data && data?.length > 0 ? (
        <Searchbar value="" onSubmit={handleSearch} />
      ) : null}
      <SwipeListView
        data={filteredData}
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
        recalculateHiddenLayout
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
