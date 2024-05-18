import {ImageResources} from '@app/assets/Generated/ImageResources.g';
import {COLORS} from '@app/assets/values/colors';
import Empty from '@app/components/Empty';
import Searchbar from '@app/components/Searchbar';
import Seperator from '@app/components/Seperator';
import {
  ProductDto,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '@app/services/product';
import {useGetAllSizeQuery} from '@app/services/size';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import React, {useEffect} from 'react';
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
import {IMAGE_URL} from '@env';

export default function ProductManagement() {
  const navigation = useNavigation<StackNavigation>();
  const {data} = useGetAllProductsQuery();
  const {data: sizes} = useGetAllSizeQuery();
  const [triggerDelete] = useDeleteProductMutation();
  const [filteredData, setFilteredData] = React.useState<ProductDto[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

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

  const handleDelete = (id: number) => {
    Alert.alert('Sil', 'Ürün silinecek onaylıyor musun ?', [
      {
        text: 'İptal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sil', onPress: () => triggerDelete(id)},
    ]);
  };

  const renderItem = ({item}: {item: ProductDto}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Image
          source={{
            uri: `${IMAGE_URL}${item.image}`,
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

  const renderHiddenItem = ({item}: {item: ProductDto}) => {
    return (
      <View style={styles.renderHiddenItemContainer}>
        <Pressable
          style={styles.backLeftBtn}
          onPress={() => navigation.navigate('EditProduct', {product: item})}>
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
      image="product"
      title={`Ürün bulunamadı.\n Sağ üstteki icon'a tıklayarak ürün oluşturabilisiniz`}
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
});
