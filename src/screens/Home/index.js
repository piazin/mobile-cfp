import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  StatusBar,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Image } from 'native-base';
import { AuthContext } from '../../contexts/authContext';

import { styles } from './styles';
import Header from '../../components/HomeScreen/Header';
import BoxBalance from '../../components/HomeScreen/BoxBalance';
import BoxShortcutIcons from '../../components/HomeScreen/BoxShortcutIcons';
import { Modal } from '../../components/HomeScreen/Modal';
import { FlatListLastTransactions } from '../../components/HomeScreen/FlatListLastTransactions';
import ImgNotFound from '../../assets/not_found.png';
import { transactionService } from '../../services/transaction';
import { useNavigation } from '@react-navigation/native';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, handleNewData } = useContext(AuthContext);

  const [balanceViewState, setBalanceViewState] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleNewData();
    loadListTransactions();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadListTransactions();
    handleNewData();
  }, []);

  const handleBalanceViewState = () => {
    setBalanceViewState(balanceViewState ? false : true);
  };

  const loadListTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactionsById(
        user._id
      );
      setTransactionHistory(response.data.transactions);
    } catch (error) {
      console.error(error);
      setTransactionHistory(null);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          title="pull refresh"
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['transparent']}
          style={{ backgroundColor: 'transparent' }}
          progressViewOffset={statusBarHeight}
        />
      }
    >
      <Header
        user={user}
        handleBalanceViewState={handleBalanceViewState}
        balanceViewState={balanceViewState}
      />
      <View style={styles.container}>
        <BoxBalance
          balance={user?.balance}
          balanceViewState={balanceViewState}
          setBalanceViewState={setBalanceViewState}
        />
        <BoxShortcutIcons />

        {transactionHistory?.length >= 0 && (
          <Text color="white" fontFamily="body" fontWeight="bold" fontSize="md">
            Movimentações recentes
          </Text>
        )}

        {transactionHistory?.length > 0 ? (
          transactionHistory
            .slice(0, 3)
            .map((transaction) => (
              <FlatListLastTransactions
                key={transaction._id}
                desc={transaction.description}
                value={transaction.value}
                typeTransaction={transaction.type}
                categoryId={transaction.category}
              />
            ))
        ) : (
          <View style={styles.containerImgNotFoundTransactions}>
            <Image
              source={ImgNotFound}
              size="2xl"
              alt="not found transactions"
            />
            <Text
              color="muted.400"
              fontSize="lg"
              fontWeight="light"
              fontFamily="body"
            >
              Não há movimentações recentes
            </Text>
          </View>
        )}
      </View>

      <Modal show={modal} close={() => setModal(false)} />

      <StatusBar
        backgroundColor="#7E74F1"
        barStyle="light-content"
        translucent
      />
    </ScrollView>
  );
}
