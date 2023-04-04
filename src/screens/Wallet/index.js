import { styles } from './styles';
import { AntDesign } from '@expo/vector-icons';
import { View, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { CheckIcon, Select, Text } from 'native-base';
import { Header } from '../../components/Wallet/Header';
import { useEffect, useState } from 'react';
import { formatBalance } from '../../utils/formatBalance';
import { transactionService } from '../../services/transaction';

const statusBarHeight = StatusBar.currentHeight + 20;

const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

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

  const handleChangeMonth = (itemValue) => {
    setSelectedMonth(months[itemValue]);
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Header />

      <View
        style={{
          alignItems: 'center',
          marginTop: 25,
        }}
      >
        <Text color="white" fontFamily="body" fontWeight="bold" fontSize="3xl">
          R$ {balance}
        </Text>

        <Select
          selectedValue={months.findIndex((m) => m == selectedMonth)}
          minWidth="300"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          background="primary.900"
          color="muted.400"
          marginTop="5"
          fontSize="xl"
          _selectedItem={{
            bg: 'muted.200',
            endIcon: <CheckIcon size="5" color="emerald.500" />,
            _focus: { borderColor: 'muted.500' },
          }}
          placeholderTextColor="muted.400"
          mt={1}
          onValueChange={(itemValue) => handleChangeMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Select.Item label={month} value={index} key={index} />
          ))}
        </Select>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginTop: -25,
          minHeight: 350,
        }}
      >
        {infoTransactions && (
          <VictoryPie
            data={infoTransactions}
            x="type"
            y="value"
            width={350}
            innerRadius={70}
            padAngle={5}
            animate={{
              duration: 2000,
              easing: 'bounce',
            }}
            colorScale={infoTransactions.map((element) =>
              element.type == 'Receitas' ? '#40B67A' : '#FF5555'
            )}
            style={{
              labels: {
                fill: 'red',
              },
              data: {
                stroke: ({ datum }) => (datum.type == 'Receitas' ? '#40B67A' : '#FF5555'),
                strokeWidth: 5,
              },
            }}
            labelComponent={<VictoryTooltip renderInPortal={false} />}
          />
        )}
      </View>
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
