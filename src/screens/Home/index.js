import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, StatusBar, RefreshControl, ScrollView } from "react-native";
import { Text } from "native-base";
import { AuthContext } from "../../contexts/authContext";
import { TransactionsClass } from "../../services/api";

import { styles } from "./styles";
import Header from "../../components/HomeScreen/Header";
import BoxBalance from "../../components/HomeScreen/BoxBalance";
import BoxShortcutIcons from "../../components/HomeScreen/BoxShortcutIcons";
import { Modal } from "../../components/HomeScreen/Modal";
import { FlatListLastTransactions } from "../../components/HomeScreen/FlatListLastTransactions";

const transactions = new TransactionsClass();

export default function HomeScreen() {
  const { user, handleNewData } = useContext(AuthContext);

  const [balanceViewState, setBalanceViewState] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleNewData();
    loadListTransactions();

    wait(2000).then(() => {
      setRefreshing(false);
    });
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
      const response = await transactions.getAllTransactions(user._id);
      if (!response) return;

      setTransactionHistory(response.data.data.transactions);
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
          colors={["transparent"]}
          style={{ backgroundColor: "transparent" }}
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
        />
        <BoxShortcutIcons />

        <Text color="white" fontFamily="body" fontWeight="bold" fontSize="lg">
          Last Transactions
        </Text>

        {transactionHistory?.length > 0 ? (
          transactionHistory
            .slice(0, 3)
            .map((transaction) => (
              <FlatListLastTransactions
                key={transaction._id}
                desc={transaction.description}
                value={transaction.value}
                typeTransaction={transaction.type}
              />
            ))
        ) : (
          <Text style={{ color: "#fff" }}>not transactions</Text>
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
