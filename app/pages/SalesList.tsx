import {COLORS} from '@app/assets/values/colors';
import Seperator from '@app/components/Seperator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, StackNavigation} from 'App';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'SalesList'> {}

const SalesList: React.FC<Props> = ({route}) => {
  const {sales, title} = route.params;
  const navigation = useNavigation<StackNavigation>();
  navigation.setOptions({title: `${title} Satışları`});
  const [sortedSales, setSortedSales] = React.useState<any[]>();

  useEffect(() => {
    const sortedSale = _.orderBy(
      sales,
      [sale => new Date(sale.created_at)],
      ['desc'],
    );

    setSortedSales(sortedSale);
  }, [sales]);

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.description}>
          <Text style={styles.title}>Ürün Kodu : </Text> {item.product.code}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Rengi : </Text> {item.color}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Bedeni : </Text> {item.size}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Satış Tarihi : </Text>{' '}
          {dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedSales}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={Seperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  renderItemContainer: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    gap: 5,
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontFamily: 'Inter-Medium',
  },
});

export default SalesList;
