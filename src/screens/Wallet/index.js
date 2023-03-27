import { styles } from './styles';
import { View, StatusBar, ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory-native';
import { Button, CheckIcon, Select, Text } from 'native-base';
import { Header } from '../../components/Wallet/Header';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
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
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('pt-BR', { month: 'long' }));
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadListTransactions();
  }, [selectedMonth]);

  const loadListTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById('chart-pie');
      const transactionsByMonth = response.data.transactions[selectedMonth];

      if (transactionsByMonth) {
        const filteredTransactions = transactionsByMonth.filter((transaction) => transaction.type !== 'Saldo');
        setTransactions(filteredTransactions);
        handleFormatBalance(transactionsByMonth[2]?.value);
      } else {
        setTransactions(null);
        handleFormatBalance(0);
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
        <Text color="muted.400" fontFamily="body" fontWeight="bold" fontSize="lg">
          {selectedMonth}
        </Text>

        <Select
          selectedValue={months.findIndex((m) => m == selectedMonth)}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          backgroundColor="muted.100"
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
        <Text color="white" fontFamily="body" fontWeight="bold" fontSize="3xl">
          R$ {balance}
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginTop: -25,
          minHeight: 400,
        }}
      >
        {transactions && (
          <VictoryPie
            data={transactions}
            x="type"
            y="value"
            width={380}
            innerRadius={75}
            padAngle={5}
            animate={{
              duration: 2000,
              easing: 'bounce',
            }}
            colorScale={transactions.map((element) => (element.type == 'Receitas' ? '#40B67A' : '#FF5555'))}
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

      <View>
        <Text color="white">Lista de movimentações</Text>
      </View>

      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
    </ScrollView>
  );
}
