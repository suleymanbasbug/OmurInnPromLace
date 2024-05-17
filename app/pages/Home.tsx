import {COLORS} from '@app/assets/values/colors';
import Empty from '@app/components/Empty';
import Searchbar from '@app/components/Searchbar';
import Seperator from '@app/components/Seperator';
import SubmitButton from '@app/components/SubmitButton';
import {ProductDto, useGetAllProductsQuery} from '@app/services/product';
import {useGetAllSizeQuery} from '@app/services/size';
import {RootState} from '@app/store';
import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function Home() {
  const imageURL = 'http://127.0.0.1:8000/storage/images/';
  const {data} = useGetAllProductsQuery();
  const {data: sizes} = useGetAllSizeQuery();
  const user = useSelector((state: RootState) => state.user);
  const [filteredData, setFilteredData] = React.useState<ProductDto[]>([]);

  const handleSearch = (value: string) => {
    if (value) {
      const filtered = data?.filter(item => {
        return item.code.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredData(filtered || []);
    } else {
      setFilteredData(data || []);
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const renderItem = ({item}: {item: ProductDto}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Image
          source={{
            uri: `${imageURL}${item.image}`,
          }}
          style={styles.image}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.description}>
            <Text style={styles.title}>Ürün Kodu : </Text> {item.code}
          </Text>
          <Text style={styles.description}>
            <Text style={styles.title} numberOfLines={3}>
              Renkler :
            </Text>
          </Text>
          <View style={styles.colorsWrapper}>
            {item.colors.map((color, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{color}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.description}>
            <Text style={styles.title}>Bedenler : </Text>{' '}
          </Text>
          <View style={styles.colorsWrapper}>
            {item.sizes.map((size, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>
                  {sizes?.find(s => s.id === Number(size))?.size}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const EmptyComponent = () => (
    <Empty image="product" title={`Ürün bulunamadı.`} />
  );
  return (
    <View style={styles.container}>
      {data && data?.length > 0 ? (
        <Searchbar value="" onSubmit={handleSearch} />
      ) : null}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={Seperator}
        ListEmptyComponent={EmptyComponent}
      />
      <View style={styles.actionButtonContainer}>
        <SubmitButton
          title="Satış Yaptım"
          onPress={() => console.log('Ürün Ekle')}
        />
      </View>
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
    flexDirection: 'row',
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
    gap: 8,
  },

  colorsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },

  badgeText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
  },

  badge: {
    padding: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },

  actionButtonContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 8,
    width: '100%',
  },
});
