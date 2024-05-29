import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ImageResources} from '../assets/Generated/ImageResources.g';
import Seperator from '../components/Seperator';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@app/assets/values/colors';

type AdminListType = {
  title: string;
  route: 'UserSales' | 'StoreSales';
};

export default function SalesManagement() {
  const navigation = useNavigation();
  const renderItem = ({item}: {item: AdminListType}) => (
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
          {title: 'Kullanıcı Satışları', route: 'UserSales'},
          {title: 'Mağaza Satışları', route: 'StoreSales'},
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
