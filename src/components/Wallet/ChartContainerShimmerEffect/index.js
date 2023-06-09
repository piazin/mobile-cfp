import { Skeleton } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ChartContainerShimmerEffect = () => {
  return (
    <View style={styles.chartContainer}>
      <Skeleton size={260} rounded="full" startColor="primary.800" endColor="primary.900" />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    marginTop: -25,
    minHeight: 350,
    justifyContent: 'center',
  },
});
