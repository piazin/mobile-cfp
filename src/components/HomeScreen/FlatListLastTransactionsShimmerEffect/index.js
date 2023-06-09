import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Skeleton } from 'native-base';

export function FlatListLastTransactionsShimmerEffect() {
  return (
    <View style={styles.container}>
      <Skeleton size={62} rounded="full" startColor="primary.800" endColor="primary.900" />

      <Skeleton.Text lines={1} width={190} startColor="primary.800" endColor="primary.900" />

      <Skeleton.Text lines={1} width={50} startColor="primary.800" endColor="primary.900" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginTop: 15,
    position: 'relative',
    justifyContent: 'space-between',
  },
});
