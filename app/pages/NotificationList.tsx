import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {COLORS} from '@app/assets/values/colors';
import Empty from '@app/components/Empty';
import Seperator from '@app/components/Seperator';
import {
  useGetDeletedNotificationsQuery,
  useSendDeletedNotificationMutation,
} from '@app/services/deletedNotification';
import {
  Notification,
  useGetNotificationsByUserQuery,
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
import {SwipeListView} from 'react-native-swipe-list-view';
import _ from 'lodash';

export default function NotificationList() {
  const {data} = useGetNotificationsByUserQuery();
  const {data: deletedNotification} = useGetDeletedNotificationsQuery();
  const [triggerDelete] = useSendDeletedNotificationMutation();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  useEffect(() => {
    if (deletedNotification && data) {
      const newData = _.cloneDeep(data);
      const result = _.reject(newData, item =>
        deletedNotification.deleted_notification_ids.includes(item.id),
      );
      setNotifications(result as Notification[]);
    }
  }, [deletedNotification, data]);

  const handleDelete = (id: number) => {
    triggerDelete({
      id,
    })
      .unwrap()
      .then(res => {
        console.log(res);
      })
      .catch(() => {
        console.log('error');
      });
  };

  const renderItem = ({item}: {item: Notification}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.title}>
          <Text style={styles.description}>{item.description}</Text>
        </Text>
      </View>
    );
  };

  const renderHiddenItem = ({item}: {item: Notification}) => {
    return (
      <View style={styles.renderHiddenItemContainer}>
        <Pressable
          style={styles.backImageContainer}
          onPress={() => {
            handleDelete(item.id);
          }}>
          <Image
            style={styles.rightImage}
            source={ImageResources.delete_icon}
          />
        </Pressable>
      </View>
    );
  };

  const EmptyComponent = () => (
    <Empty image="notification" title={`Bildirim bulunamadı`} />
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={notifications}
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
    minHeight: 48,
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
