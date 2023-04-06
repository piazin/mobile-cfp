import { Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatBalance } from '../../../utils/formatBalance';

export const ListTransactions = ({ transaction }) => {
  return (
    <View style={styles.transactionListContainer}>
      <MaterialCommunityIcons name={transaction.category.iconName} size={42} color="#D6d6d6" />

      <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text color="white" fontWeight="bold" fontSize="md">
          {transaction.description}
        </Text>
        <Text color="white" minWidth={170} maxWidth={180}>
          {new Date(transaction.date).toLocaleString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>

      <Text
        color={transaction.type === 'expense' ? 'red.300' : 'green.300'}
        minWidth={79}
        maxWidth={89}
        alignSelf="flex-end"
        fontSize={transaction.value.toString().length >= 4 ? 'sm' : 'md'}
      >
        R$ {formatBalance(transaction.value)}
      </Text>
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
