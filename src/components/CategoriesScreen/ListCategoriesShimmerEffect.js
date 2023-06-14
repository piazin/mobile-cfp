import { Skeleton } from 'native-base';
import { StyleSheet, View } from 'react-native';

export function ListCategoriesShimmerEffect() {
  return (
    <View style={styles.container}>
      <Skeleton
        borderWidth={0.2}
        borderColor="coolGray.100"
        size={52}
        rounded="full"
        startColor="primary.800"
        endColor="primary.900"
        mr="5"
      />

      <Skeleton.Text lines={1} width={190} startColor="primary.800" endColor="primary.900" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 15,
  },
});
