import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {COLORS} from '@app/assets/values/colors';
import Empty from '@app/components/Empty';
import Seperator from '@app/components/Seperator';
import {
  FixedNotificationType,
  useDeleteFixedNotificationMutation,
  useGetFixedNotificationsQuery,
} from '@app/services/fixedNotification';
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

export default function FixedNotification() {
  const navigation = useNavigation<StackNavigation>();
  const {data: fixedNotifications} = useGetFixedNotificationsQuery();
  const [triggerDelete] = useDeleteFixedNotificationMutation();

  const handleDelete = (id: number) => {
    Alert.alert('Sil', 'Sabit bildirim silinecek onaylıyor musun ?', [
      {
        text: 'İptal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sil', onPress: () => triggerDelete(id)},
    ]);
  };

  const renderItem = ({item}: {item: FixedNotificationType}) => {
    return (
      <Pressable
        style={styles.renderItemContainer}
        onPress={() => {
          navigation.navigate('CreateNotification', {
            title: item.title,
            description: item.description,
          });
        }}>
        <Text style={styles.description}>
          <Text style={styles.title}>Başlık : </Text> {item.title}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Açıklama : </Text> {item.description}
        </Text>
      </Pressable>
    );
  };

  const renderHiddenItem = ({item}: {item: FixedNotificationType}) => {
    return (
      <View style={styles.renderHiddenItemContainer}>
        <Pressable
          style={styles.backLeftBtn}
          onPress={() =>
            navigation.navigate('EditFixedNotification', {
              fixedNotification: item,
            })
          }>
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

  const EmptyComponent = () => (
    <Empty
      image="notification"
      title={`Sabit bildirim bulunamadı.\n Sağ üstteki icon'a tıklayarak sabit bildirim oluşturabilisiniz`}
    />
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={fixedNotifications}
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
