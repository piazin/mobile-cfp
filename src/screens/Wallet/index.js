import { styles } from './styles';
import { Text } from 'native-base';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, StatusBar, ScrollView } from 'react-native';

import { Header } from '../../components/Wallet/Header';
import { formatBalance } from '../../utils/formatBalance';
import { transactionService } from '../../services/transaction';
import { ChartContainer } from '../../components/Wallet/ChartContainer';
import { SelectedMonthContainer } from '../../components/Wallet/SelectedMonthContainer';
import { Loading } from '../../components/Loading';

const statusBarHeight = StatusBar.currentHeight + 20;

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('pt-BR', { month: 'long' })
  );
  const [transactions, setTransactions] = useState([]);
  const [infoTransactions, setInfoTransactions] = useState([]);

  useEffect(() => {
    loadListTransactions();
    loadListInfoTransactions();
  }, [selectedMonth]);

  const loadListInfoTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById('chart-pie');
      const transactionsByMonth = response.data.transactions[selectedMonth];

      if (transactionsByMonth) {
        const filteredTransactions = transactionsByMonth.filter(
          (transaction) => transaction.type !== 'Saldo'
        );
        setInfoTransactions(filteredTransactions);
        handleFormatBalance(transactionsByMonth[2]?.value);
      } else {
        setInfoTransactions(null);
        handleFormatBalance(0);
      }
    } catch (error) {
      console.error(error);
      setInfoTransactions(null);
    }
  };

  const loadListTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById('month');
      const transactionsByMonth = response.data.transactions[selectedMonth];

      if (transactionsByMonth) {
        const filteredTransactions = transactionsByMonth.filter(
          (transaction) => transaction.type !== 'Saldo'
        );
        setTransactions(filteredTransactions);
      }
    } catch (error) {
      console.error(error);
      setTransactions(null);
    }
  };

  const handleFormatBalance = (value) => {
    const formattedBalance = formatBalance(value);
    setBalance(formattedBalance);
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Header />

      <SelectedMonthContainer
        balance={balance}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
      />

      <ChartContainer infoTransactions={infoTransactions} />

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

      <View>
        <Text color="white">Lista de movimentações</Text>
        {transactions.map((transaction) => (
          <Text key={transaction._id} color="white">
            R$ {formatBalance(transaction.value)}
          </Text>
        ))}
      </View>

      <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" translucent />
    </ScrollView>
  );
}
