import { StyleSheet, View } from 'react-native';
import { Skeleton } from 'native-base';

export const ListTransactionsShimmerEffect = () => {
  return (
    <View style={styles.transactionListContainer}>
      <Skeleton size={60} rounded="full" startColor="primary.800" endColor="primary.900" />

      <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Skeleton.Text width={170} lines={2} startColor="primary.800" endColor="primary.900" />
      </View>

      <Skeleton.Text width={50} lines={1} startColor="primary.800" endColor="primary.900" />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
});
