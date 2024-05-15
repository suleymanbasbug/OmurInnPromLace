import {COLORS} from '@app/assets/values/colors';
import {
  Notification,
  useDeleteNotificationMutation,
  useGetNotificationsByUserRoleQuery,
} from '@app/services/notification';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import Searchbar from '@app/components/Searchbar';
import {SwipeListView} from 'react-native-swipe-list-view';
import Seperator from '@app/components/Seperator';
import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import Empty from '@app/components/Empty';
import Toast from 'react-native-toast-message';

export default function IncomingNotification() {
  const {data} = useGetNotificationsByUserRoleQuery(1);
  const [triggerDelete] = useDeleteNotificationMutation();
  const [filteredData, setFilteredData] = React.useState<Notification[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const handleDelete = (id: number) => {
    triggerDelete(id)
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Başarılı',
          text2: 'Bildirim silindi',
          position: 'bottom',
          bottomOffset: 75,
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: 'Bildirim silinemedi',
          position: 'bottom',
          bottomOffset: 75,
        });
      });
  };

  const handleSearch = (value: string) => {
    if (value) {
      const filtered = data?.filter(item => {
        return (
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase()) ||
          item.sender.username.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(filtered || []);
    } else {
      setFilteredData(data || []);
    }
  };

  const renderItem = ({item}: {item: Notification}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.title}>
          Başlık : <Text style={styles.description}>{item.title}</Text>
        </Text>
        <Text style={styles.title}>
          Açıklama : <Text style={styles.description}>{item.description}</Text>
        </Text>
        <Text style={styles.title}>
          Gönderilme Zaman :{' '}
          <Text style={styles.description}>
            {dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
        </Text>
        <Text style={styles.title}>
          Gönderen Kullanıcı :{' '}
          <Text style={styles.description}>{item.sender.username}</Text>
        </Text>
      </View>
    );
  };

  const renderHiddenItem = ({item}: {item: Notification}) => {
    return (
      <View style={styles.renderHiddenItemContainer}>
        <Pressable
          style={styles.backImageContainer}
          onPress={() => handleDelete(item.id)}>
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
      image="notification"
      title={`Bildirim bulunamadı.\n Sağ üstteki icon'a tıklayarak bildirim oluşturabilisiniz`}
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
        disableRightSwipe
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
  backImageContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.delete,
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

  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 16,
    minHeight: 48,
  },
});
