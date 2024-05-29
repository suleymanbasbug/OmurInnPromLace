import {useGetAllSaleQuery} from '@app/services/sale';
import React, {useEffect} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {COLORS} from '@app/assets/values/colors';
import Searchbar from '@app/components/Searchbar';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import Seperator from '@app/components/Seperator';
import Empty from '@app/components/Empty';

const UserSales = () => {
  const {data: salesData} = useGetAllSaleQuery();
  const [data, setData] = React.useState<any[]>();
  const navigation = useNavigation<StackNavigation>();
  const [filteredData, setFilteredData] = React.useState<any[]>([]);

  const EmptyComponent = () => (
    <Empty image="sale" title={`Herhangi bir satış bulunamadı`} />
  );

  useEffect(() => {
    if (salesData) {
      const usersWithSales = _.map(
        _.groupBy(salesData, 'user_id'),
        (sales, userId) => {
          const user = _.find(sales, {user_id: parseInt(userId)}).user;
          return {...user, sales};
        },
      );
      const sortedUsers = _.orderBy(
        usersWithSales,
        [user => user.sales.length],
        ['desc'],
      );
      setData(sortedUsers);
      setFilteredData(sortedUsers);
    }
  }, [salesData]);

  const handleSearch = (value: string) => {
    if (value) {
      const filtered = data?.filter(item => {
        return item.username.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredData(filtered || []);
    } else {
      setFilteredData(data || []);
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <Pressable
      style={styles.listContainer}
      onPress={() => {
        navigation.navigate('SalesList', {
          sales: item.sales,
          title: item.username,
        });
      }}>
      <Text>{item.username}</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.sales.length}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {data && data?.length > 0 ? (
        <Searchbar value="" onSubmit={handleSearch} />
      ) : null}

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        ItemSeparatorComponent={Seperator}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 48,
  },
  textWrapper: {
    backgroundColor: COLORS.primary,
    height: 30,
    width: 30,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Inter-Bold',
  },
});

export default UserSales;
