import {useGetAllStoreQuery} from '@app/services/store';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function StoreManagement() {
  const {data} = useGetAllStoreQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <View style={styles.container}>
      <Text> Store</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
});
