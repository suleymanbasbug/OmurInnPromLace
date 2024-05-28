import {COLORS} from '@app/assets/values/colors';
import {
  useDeleteNotificationMutation,
  useGetNotificationsBySenderQuery,
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
import _ from 'lodash';
import {User} from '@app/services/user';
export type TransformedData = {
  stores: any[];
  users: any[];
  user_roles: any[];
  id: number;
  title: string;
  description: string;
  user_role_id: number;
  sender_id: number;
  created_at: string;
  updated_at: string;
  sender: User;
};
export default function SendNotification() {
  const {data: notifications} = useGetNotificationsBySenderQuery();
  const [triggerDelete] = useDeleteNotificationMutation();
  const [filteredData, setFilteredData] = React.useState<TransformedData[]>([]);
  const [data, setData] = React.useState<TransformedData[]>([]);

  useEffect(() => {
    if (notifications) {
      const transformedData = _.map(notifications, item => {
        const {topics, ...rest} = item;
        const stores = _.flatMap(topics, 'stores');
        const users = _.flatMap(topics, 'users');
        const user_roles = _.flatMap(topics, 'roles');
        return {
          ...rest,
          stores,
          users,
          user_roles,
        };
      });
      setData(transformedData);

      setFilteredData(transformedData);
    }
  }, [notifications]);

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
          item.description.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(filtered || []);
    } else {
      setFilteredData(data || []);
    }
  };

  const renderItem = ({item}: {item: TransformedData}) => {
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
        {item.stores.length > 0 && (
          <Text style={styles.title}>
            Gönderilen Mağazalar :{' '}
            <Text style={styles.description}>
              {item.stores.map(store => store.name).join(', ')}
            </Text>
          </Text>
        )}
        {item.user_roles.length > 0 && (
          <Text style={styles.title}>
            Gönderilen Kullanıcı Roller :{' '}
            <Text style={styles.description}>
              {item.user_roles.map(role => role.name).join(', ')}
            </Text>
          </Text>
        )}
        {item.users.length > 0 && (
          <Text style={styles.title}>
            Gönderilen Kullanıcılar :{' '}
            <Text style={styles.description}>
              {item.users.map(user => user.username).join(', ')}
            </Text>
          </Text>
        )}
      </View>
    );
  };

  const renderHiddenItem = ({item}: {item: TransformedData}) => {
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
