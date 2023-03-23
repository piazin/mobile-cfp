import { styles } from './styles';
import { View, StatusBar, ScrollView } from 'react-native';
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
  const [data, setData] = useState([]);

  useEffect(() => {
    handleFormatBalance();
    loadListTransactions();
  }, []);

  const loadListTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById('pie');

      setData(response.data.transactions);
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
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight }]}>
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
          alignItems: 'center',
          marginTop: -25,
        }}
      >
        <VictoryPie
          data={data}
          x="type"
          y="value"
          width={320}
          innerRadius={50}
          colorScale={data.map((element) =>
            element.type == 'Receitas' ? '#118C4F' : '#B22222'
          )}
          style={{
            labels: {
              display: 'none',
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
    </ScrollView>
  );
}
