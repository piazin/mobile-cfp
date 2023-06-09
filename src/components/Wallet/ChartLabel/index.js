import { Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { formatBalance } from '../../../utils/formatBalance';

export const ChartLabel = ({ infoTransactions }) => {
  return (
    <>
      {infoTransactions ? (
        <View style={styles.chartLabel}>
          <View style={styles.valueContainerByType}>
            <AntDesign color="#40B67A" size={24} name="arrowup" />
            <Text color="white" fontSize="lg">
              R${' '}
              {infoTransactions.map(
                (element) => element.type == 'Receitas' && formatBalance(element.value)
              )}
            </Text>
          </View>
          <View style={styles.valueContainerByType}>
            <AntDesign color="#FF5555" size={24} name="arrowdown" />
            <Text color="white" fontSize="lg">
              R${' '}
              {infoTransactions.map(
                (element) => element.type == 'Despesas' && formatBalance(element.value)
              )}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.chartLabel}>
          <View style={styles.valueContainerByType}>
            <AntDesign color="#40B67A" size={24} name="arrowup" />
            <Text color="white" fontSize="lg">
              R$ 0,00
            </Text>
          </View>
          <View style={styles.valueContainerByType}>
            <AntDesign color="#FF5555" size={24} name="arrowdown" />
            <Text color="white" fontSize="lg">
              R$ 0,00
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  chartLabel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
