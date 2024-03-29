import { Box, Text } from 'native-base';
import { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatBalance } from '../../../utils/formatBalance';
import { transactionService } from '../../../services/transaction';
import { AuthContext } from '../../../contexts/authContext';
import { useNavigation } from '@react-navigation/native';

export const ListTransactions = ({ transaction, handleTransactionLoading }) => {
  const navigation = useNavigation();
  const { handleNewData } = useContext(AuthContext);

  const createButtonAlert = () => {
    Alert.alert('Atenção', 'Deseja realmente excluir?', [
      { style: 'cancel', text: 'Cancelar', onPress: () => console.debug('press cancel') },
      {
        text: 'OK',
        onPress: () => handleDeleteTransaction(),
      },
    ]);
  };

  const handleDeleteTransaction = async () => {
    try {
      const { status } = await transactionService.deleteTransaction(transaction?._id);
      if (status === 204) {
        await handleTransactionLoading();
        await handleNewData();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <TouchableOpacity
      onLongPress={() => createButtonAlert()}
      onPress={() => navigation.navigate('EditTransaction', transaction)}
    >
      {transaction ? (
        <View style={styles.transactionListContainer}>
          <Box
            w={42}
            h={42}
            alignItems="center"
            justifyContent="center"
            borderRadius={50}
            backgroundColor={transaction.category.colorHash}
          >
            <MaterialCommunityIcons name={transaction.category.iconName} size={28} color="#fff" />
          </Box>

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
            R$ {formatBalance(transaction?.value)}
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
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
