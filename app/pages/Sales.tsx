/* eslint-disable react-hooks/exhaustive-deps */
import {COLORS} from '@app/assets/values/colors';
import {useGetAllSizeQuery} from '@app/services/size';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, StackNavigation} from 'App';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Dropdown from 'react-native-input-select';
import _ from 'lodash';
import LottieView from 'lottie-react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {ProductDto} from '@app/services/product';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import store, {RootState, resetRtkState} from '@app/store';
import {useSendPushNotificationForSaleMutation} from '@app/services/notification';
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

  const [salesProduct, setSalesProduct] = React.useState<SalesProduct>({
    id: 0,
    code: '',
    color: '',
    size: '',
  });
  const [selectedProduct, setSelectedProduct] = React.useState<ProductDto>();

  const [triggerSendPushNotification] =
    useSendPushNotificationForSaleMutation();
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
      roleId: 1,
      product: salesProduct,
    })
      .unwrap()
      .then(res => {
        console.log(res, ' =>res');
      })
      .finally(() => {
        triggerConfetti();
        store.dispatch({
          type: 'user/incrementPoints',
          payload: 1,
        });
        resetRtkState();
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
            completedStepIconColor={COLORS.primary}>
            <ProgressStep
              label="Renk Seçimi"
              nextBtnStyle={styles.button}
              nextBtnTextStyle={styles.buttonText}
              nextBtnText="İleri"
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
        <View style={styles.pointContainer}>
          <Text style={styles.pointFont}>Puanınız : </Text>
          <AnimatedNumbers
            includeComma
            animateToNumber={animateToNumber}
            fontStyle={styles.pointFont}
          />
        </View>
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
  },
  pointContainer: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
