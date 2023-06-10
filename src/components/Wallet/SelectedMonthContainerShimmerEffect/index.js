import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from 'native-base';

export const SelectedMonthContainerShimmerEffect = () => {
  return (
    <View style={styles.selectContainer}>
      <Skeleton rounded="2xl" w={180} mb="4" startColor="primary.800" endColor="primary.900" />

      <Skeleton
        width={200}
        height={50}
        rounded="md"
        startColor="primary.800"
        endColor="primary.900"
        mb="2"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
});
