import {COLORS} from '@app/assets/values/colors';
import Seperator from '@app/components/Seperator';
import {useGetNotificationByIdQuery} from '@app/services/notification';
import {useGetAllSizeQuery} from '@app/services/size';
import {IMAGE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'NotificationDetail'> {}

const NotificationDetail: React.FC<Props> = ({route}) => {
  const {id} = route.params;
  const {data} = useGetNotificationByIdQuery(id);
  const [index, setIndex] = React.useState(0);
  const {data: sizes} = useGetAllSizeQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const renderItem = ({item}: {item: any}) => {
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{backgroundColor: 'white'}}>
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.description}>{data?.description}</Text>
      {data && data?.images.length > 0 && data?.images.length !== index + 1 && (
        <SliderBox
          images={data.images.map((image: any) => `${IMAGE_URL}${image.image}`)}
          sliderBoxHeight={200}
          dotColor={COLORS.primary}
          autoplay
          autoplayInterval={1500}
          currentImageEmitter={(imageIndex: any) => {
            setTimeout(() => {
              setIndex(imageIndex);
            }, 1500);
          }}
        />
      )}
      {data && data?.products.length > 0 && (
        <FlatList
          style={{width: '100%'}}
          data={data?.products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={Seperator}
          nestedScrollEnabled
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
    gap: 8,
  },
  renderItemContainer: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    gap: 5,
    flexDirection: 'row',
  },
  colorsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
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

export default NotificationDetail;
