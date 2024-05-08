import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ImageResources} from '../assets/Generated/ImageResources.g';
import Seperator from '../components/Seperator';

export default function AdminList() {
  const renderItem = ({item}: {item: any}) => (
    <Pressable style={styles.listContainer}>
      <Text>{item.title}</Text>
      <Image
        source={ImageResources.right_arrow}
        style={{width: 24, height: 24}}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {title: 'Kullanıcı Yönetimi'},
          {title: 'Ürün Yönetimi'},
          {title: 'Bildirim Yönetimi'},
        ]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={<Seperator />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
