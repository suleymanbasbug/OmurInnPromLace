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

interface Props extends NativeStackScreenProps<RootStackParamList, 'Sales'> {}
export type SalesProduct = {
  id: number;
  code: string;
  size: string;
  color: string;
};
const Sales: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<StackNavigation>();

  const {product} = route.params;
  const {data: sizes} = useGetAllSizeQuery();

  const [salesProduct, setSalesProduct] = React.useState<SalesProduct>();
  const [selectedProduct, setSelectedProduct] = React.useState<ProductDto>();
  const confettiRef = React.useRef<LottieView>(null);

  const triggerConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current.play(0);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

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
          onNext={() => {
            console.log('called next step');
          }}>
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 1!</Text>
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
                product?.colors.map(color => ({
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
          onSubmit={() => {
            triggerConfetti();
          }}>
          <View style={{alignItems: 'center', paddingHorizontal: 16}}>
            <Dropdown
              placeholder="Beden Seçiniz"
              options={_.at(_.keyBy(sizes, 'id'), product?.sizes || []).map(
                size => ({
                  label: size.size,
                  value: size.id,
                }),
              )}
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
        onAnimationFinish={handleBack}
      />
    </View>
  );
};

export default Sales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
});
