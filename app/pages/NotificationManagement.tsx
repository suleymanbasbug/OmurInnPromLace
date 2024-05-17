import {COLORS} from '@app/assets/values/colors';

import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Seperator from '@app/components/Seperator';
import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {useNavigation} from '@react-navigation/native';

type NotificationListType = {
  title: string;
  route: string;
};

export default function NotificationManagement() {
  const navigation = useNavigation();
  const renderItem = ({item}: {item: NotificationListType}) => (
    <Pressable
      style={styles.listContainer}
      onPress={() => navigation.navigate(item.route)}>
      <Text>{item.title}</Text>
      <Image
        source={ImageResources.right_arrow}
        style={{width: 24, height: 24, tintColor: COLORS.primary}}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {title: 'Gönderilen Bildirimler', route: 'SendNotification'},
          {title: 'Gelen Bildirimler', route: 'IncomingNotification'},
        ]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={Seperator}
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
