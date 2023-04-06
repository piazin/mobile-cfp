import { styles } from './styles';
import { Text } from 'native-base';
import { useEffect, useState } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';

import { Header } from '../../components/Wallet/Header';
import { formatBalance } from '../../utils/formatBalance';
import { transactionService } from '../../services/transaction';
import { ChartContainer } from '../../components/Wallet/ChartContainer';
import { SelectedMonthContainer } from '../../components/Wallet/SelectedMonthContainer';
import { Loading } from '../../components/Loading';
import { ChartLabel } from '../../components/Wallet/ChartLabel';
import { ListTransactions } from '../../components/Wallet/ListTransactions';

const statusBarHeight = StatusBar.currentHeight + 20;

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('pt-BR', { month: 'long' })
  );
  const [transactions, setTransactions] = useState([]);
  const [infoTransactions, setInfoTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadListTransactions();
    loadListInfoTransactions();
  }, [selectedMonth]);

  const loadListInfoTransactions = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const loadListTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionService.getAllTransactionsById('month');
      const transactionsByMonth = response.data.transactions[selectedMonth];

      setTransactions(transactionsByMonth);
    } catch (error) {
      console.error(error);
      setTransactions(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFormatBalance = (value) => {
    const formattedBalance = formatBalance(value);
    setBalance(formattedBalance);
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Header />

      <SelectedMonthContainer
        balance={balance}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
      />

      <ChartContainer infoTransactions={infoTransactions} />

      <ChartLabel infoTransactions={infoTransactions} />

      <View style={{ padding: 30, marginBottom: 50 }}>
        <Text color="white" fontWeight="medium" marginBottom="2.5">
          Lista de movimentações
        </Text>

        {transactions &&
          transactions.map((transaction) => (
            <ListTransactions key={transaction._id} transaction={transaction} />
          ))}
      </View>

      <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" translucent />
    </ScrollView>
  );
}
