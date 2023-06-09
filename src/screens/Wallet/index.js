import { styles } from './styles';
import { Text } from 'native-base';
import { useEffect, useState } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';

import { Header } from '../../components/Wallet/Header';
import { formatBalance } from '../../utils/formatBalance';
import { transactionService } from '../../services/transaction';
import { ChartContainer } from '../../components/Wallet/ChartContainer';
import { SelectedMonthContainer } from '../../components/Wallet/SelectedMonthContainer';
import { ChartLabel } from '../../components/Wallet/ChartLabel';
import { ListTransactions } from '../../components/Wallet/ListTransactions';
import { ListTransactionsShimmerEffect } from '../../components/Wallet/ListTransactionsShimmerEffect';
import { ChartContainerShimmerEffect } from '../../components/Wallet/ChartContainerShimmerEffect';
import { SelectedMonthContainerShimmerEffect } from '../../components/Wallet/SelectedMonthContainerShimmerEffect';
import { ChartLabelShimmerEffect } from '../../components/Wallet/ChartLabelShimmerEffect';

const statusBarHeight = StatusBar.currentHeight + 20;

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('pt-BR', { month: 'long' })
  );
  const [transactions, setTransactions] = useState([]);
  const [infoTransactions, setInfoTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    handleTransactionLoading();
  }, [selectedMonth]);

  const handleTransactionLoading = async () => {
    setLoading(true);
    await Promise.all([loadListInfoTransactions(), loadListTransactions()]);
    setLoading(false);
    setFirstLoading(false);
  };

  const loadListInfoTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById('summary');
      const transactionsByMonth = response?.data?.transactions[selectedMonth];

      if (transactionsByMonth) {
        const filteredTransactions = transactionsByMonth?.filter(
          (transaction) => transaction?.type !== 'Saldo'
        );
        setInfoTransactions(filteredTransactions);
        handleFormatBalance(transactionsByMonth[2]?.value);
      } else {
        setInfoTransactions(null);
        handleFormatBalance(0);
      }
    } catch (error) {
      console.error(error.message);
      setInfoTransactions(null);
    }
  };

  const loadListTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById('month');
      const transactionsByMonth = response.data.transactions[selectedMonth];

      setTransactions(transactionsByMonth);
    } catch (error) {
      console.error(error.message);
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

      {!loading ? (
        <SelectedMonthContainer
          balance={balance}
          setSelectedMonth={setSelectedMonth}
          selectedMonth={selectedMonth}
        />
      ) : (
        <SelectedMonthContainerShimmerEffect />
      )}

      {firstLoading ? (
        <ChartContainerShimmerEffect />
      ) : (
        <ChartContainer infoTransactions={infoTransactions} />
      )}

      {!loading ? <ChartLabel infoTransactions={infoTransactions} /> : <ChartLabelShimmerEffect />}

      <View style={{ padding: 30, marginBottom: 50 }}>
        <Text color="white" fontWeight="medium" marginBottom="2.5">
          Lista de movimentações
        </Text>

        {transactions?.length > 0 && !loading ? (
          transactions.map((transaction) => (
            <ListTransactions
              key={transaction._id}
              transaction={transaction}
              handleTransactionLoading={handleTransactionLoading}
            />
          ))
        ) : (
          <ListTransactionsShimmerEffect />
        )}
      </View>

      <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" translucent />
    </ScrollView>
  );
}
