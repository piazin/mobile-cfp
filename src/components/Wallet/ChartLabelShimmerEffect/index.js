import { Skeleton } from 'native-base';
import { StyleSheet, View } from 'react-native';

export const ChartLabelShimmerEffect = () => {
  return (
    <View style={styles.chartLabel}>
      <Skeleton rounded="2xl" w={130} height={45} startColor="primary.800" endColor="primary.900" />
      <Skeleton rounded="2xl" w={130} height={45} startColor="primary.800" endColor="primary.900" />
    </View>
  );
};

const styles = StyleSheet.create({
  chartLabel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 40,
  },
  valueContainerByType: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
    paddingVertical: 10,
    paddingRight: 15,
    paddingLeft: 10,
    justifyContent: 'center',
    borderColor: '#E1E1E1',
    borderWidth: 0.1,
    borderRadius: 50,
  },
});
