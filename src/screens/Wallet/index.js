import { styles } from './styles';
import { View, StatusBar } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';
import { Text } from 'native-base';
import { Header } from '../../components/Wallet/Header';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { formatBalance } from '../../utils/formatBalance';
import { transactionService } from '../../services/transaction';

const statusBarHeight = StatusBar.currentHeight + 20;

export default function Wallet() {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const data = [
    { x: 'Entreterimento', y: 35 },
    { x: 'Roupas', y: 40 },
    { x: 'Comida e bebida', y: 55 },
  ];

  useEffect(() => {
    handleFormatBalance();
    loadListTransactions();
  }, []);

  const loadListTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById(
        user?._id
      );
      console.log(
        '🚀 ~ file: index.js:36 ~ loadListTransactions ~ response:',
        response.data.transactions
      );

      setTransactionHistory(response.data.transactions);
    } catch (error) {
      console.error(error);
      setTransactionHistory(null);
    }
  };

  const handleFormatBalance = () => {
    const formattedBalance = formatBalance(user?.balance);
    setBalance(formattedBalance);
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Header />

      <View
        style={{
          alignItems: 'center',
          marginTop: 25,
        }}
      >
        <Text
          color="muted.400"
          fontFamily="body"
          fontWeight="bold"
          fontSize="md"
        >
          {new Date().toLocaleString('pt-BR', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <Text color="white" fontFamily="body" fontWeight="bold" fontSize="3xl">
          R$ {balance}
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VictoryPie
          data={transactionHistory}
          x="category"
          y="value"
          width={400}
          style={{
            labels: {
              fill: 'white',
              fontSize: 10,
            },
          }}
        />
      </View>

      <View>
        <Text color="white">Lista de movimentações</Text>
      </View>

      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
    </View>
  );
}
