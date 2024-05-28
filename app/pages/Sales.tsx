/* eslint-disable react-hooks/exhaustive-deps */
import {COLORS} from '@app/assets/values/colors';
import {useGetAllSizeQuery} from '@app/services/size';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, StackNavigation} from 'App';
import React, {useEffect} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Dropdown from 'react-native-input-select';
import _ from 'lodash';
import LottieView from 'lottie-react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {ProductDto, useGetAllProductsQuery} from '@app/services/product';
import {useNavigation} from '@react-navigation/native';
import Searchbar from '@app/components/Searchbar';
import Seperator from '@app/components/Seperator';
import {useSelector} from 'react-redux';
import {RootState} from '@app/store';
import {useSendPushNotificationMutation} from '@app/services/notification';
import {IMAGE_URL} from '@env';
import AnimatedNumbers from 'react-native-animated-numbers';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Sales'> {}
export type SalesProduct = {
  id: number;
  code: string;
  size: string;
  color: string;
};
const Sales: React.FC<Props> = ({route}) => {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<StackNavigation>();

  const {product} = route.params;
  const {data: sizes} = useGetAllSizeQuery();
  const {data} = useGetAllProductsQuery();

  const [salesProduct, setSalesProduct] = React.useState<SalesProduct>();
  const [selectedProduct, setSelectedProduct] = React.useState<ProductDto>();
  const [filteredData, setFilteredData] = React.useState<ProductDto[]>([]);
  const [triggerSendPushNotification] = useSendPushNotificationMutation();
  const confettiRef = React.useRef<LottieView>(null);
  const [animateToNumber, setAnimateToNumber] = React.useState(user.points);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const triggerConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current.play(0);
    }
  };

  const handleSubmit = () => {
    triggerSendPushNotification({
      title: 'Yeni Satış',
      description: `${user.store?.name} Mağazasındaki ${salesProduct?.code} kodlu ürünü ${user.username} isimli kullanıcı sattı. Beden: ${salesProduct?.size}, Renk: ${salesProduct?.color}`,
      sender_id: user?.id,
      roleIds: [1],
      storeIds: [],
      userIds: [],
    })
      .unwrap()
      .finally(() => {
        triggerConfetti();
      });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setAnimateToNumber(animateToNumber + 1);
      }, 500);
      setTimeout(() => {
        handleBack();
      }, 2500);
    }
  }, [isSuccess]);

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

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (selectedProduct) {
      setSalesProduct({
        id: selectedProduct.id,
        code: selectedProduct.code,
        color: '',
        size: '',
      });
    } else {
      setSalesProduct(undefined);
    }
  }, [selectedProduct]);

  const renderItem = ({item}: {item: ProductDto}) => {
    return (
      <Pressable
        style={[
          styles.renderItemContainer,
          {
            backgroundColor:
              selectedProduct?.id === item.id ? COLORS.primary : 'white',
          },
        ]}
        onPress={() => {
          setSelectedProduct(item);
        }}>
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
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {!isSuccess ? (
        <>
          <ProgressSteps
            progressBarColor={COLORS.primary}
            activeStepIconBorderColor={COLORS.primary}
            labelColor={COLORS.primary}
            activeLabelColor={COLORS.primary}
            completedProgressBarColor={COLORS.primary}
            completedStepIconColor={COLORS.primary}
            activeStep={product ? 1 : 0}>
            <ProgressStep
              nextBtnStyle={styles.button}
              nextBtnTextStyle={styles.buttonText}
              nextBtnText="İleri"
              label="Ürün Seçimi"
              nextBtnDisabled={!selectedProduct}>
              <View style={styles.container}>
                {data && data?.length > 0 ? (
                  <Searchbar value="" onSubmit={handleSearch} />
                ) : null}
                <FlatList
                  data={filteredData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  ItemSeparatorComponent={Seperator}
                />
              </View>
            </ProgressStep>
            <ProgressStep
              label="Renk Seçimi"
              previousBtnStyle={styles.button}
              previousBtnTextStyle={styles.buttonText}
              nextBtnStyle={styles.button}
              nextBtnTextStyle={styles.buttonText}
              nextBtnText="İleri"
              previousBtnText="Geri"
              nextBtnDisabled={!salesProduct?.color}>
              <View style={{alignItems: 'center', paddingHorizontal: 16}}>
                <Dropdown
                  placeholder="Renk Seçiniz"
                  options={
                    selectedProduct?.colors.map(color => ({
                      label: color,
                      value: color,
                    })) || []
                  }
                  selectedValue={salesProduct?.color}
                  onValueChange={(itemValue: any) => {
                    setSalesProduct({
                      ...salesProduct,
                      color: itemValue,
                    });
                  }}
                  primaryColor={COLORS.primary}
                  dropdownIcon={<></>}
                  dropdownStyle={styles.dropDownStyle}
                  placeholderStyle={{color: COLORS.black}}
                  listControls={{
                    emptyListMessage: 'Renk Bulunamadı',
                    selectAllText: 'Hepsini Seç',
                    unselectAllText: 'Hepsini Kaldır',
                  }}
                />
              </View>
            </ProgressStep>
            <ProgressStep
              label="Beden Seçimi"
              previousBtnStyle={styles.button}
              previousBtnTextStyle={styles.buttonText}
              nextBtnStyle={styles.button}
              nextBtnTextStyle={styles.buttonText}
              previousBtnText="Geri"
              finishBtnText="Tamamla"
              nextBtnDisabled={!salesProduct?.size}
              onSubmit={handleSubmit}>
              <View style={{alignItems: 'center', paddingHorizontal: 16}}>
                <Dropdown
                  placeholder="Beden Seçiniz"
                  options={_.at(
                    _.keyBy(sizes, 'id'),
                    selectedProduct?.sizes || [],
                  ).map(size => ({
                    label: size.size,
                    value: size.size,
                  }))}
                  selectedValue={salesProduct?.size}
                  onValueChange={(itemValue: any) => {
                    setSalesProduct({
                      ...salesProduct,
                      size: itemValue,
                    });
                  }}
                  primaryColor={COLORS.primary}
                  dropdownIcon={<></>}
                  dropdownStyle={styles.dropDownStyle}
                  placeholderStyle={{color: COLORS.black}}
                  listControls={{
                    emptyListMessage: 'Renk Bulunamadı',
                    selectAllText: 'Hepsini Seç',
                    unselectAllText: 'Hepsini Kaldır',
                  }}
                />
              </View>
            </ProgressStep>
          </ProgressSteps>
          <LottieView
            source={require('@app/assets/test.json')}
            loop={false}
            style={styles.lottie}
            ref={confettiRef}
            onAnimationFinish={() => setIsSuccess(true)}
          />
        </>
      ) : (
        <>
          <Text style={styles.pointFont}>Puanınız : </Text>
          <AnimatedNumbers
            includeComma
            animateToNumber={animateToNumber}
            fontStyle={styles.pointFont}
          />
        </>
      )}
    </View>
  );
};

export default Sales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },

  dropDownStyle: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 8,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    zIndex: -9999,
  },
  renderItemContainer: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    gap: 5,
    flexDirection: 'row',
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
  title: {
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontFamily: 'Inter-Medium',
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

  pointFont: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
