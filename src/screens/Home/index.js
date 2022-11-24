import React, { useContext, useState, useEffect } from "react";
import { View, StatusBar, FlatList } from "react-native";
import { Text } from "native-base";
import { AuthContext } from "../../contexts/authContext";
import { TransactionsClass } from "../../services/api";

import { styles, lightMode } from "./styles";
import Header from "../../components/HomeScreen/Header";
import BoxBalance from "../../components/HomeScreen/BoxBalance";
import BoxShortcutIcons from "../../components/HomeScreen/BoxShortcutIcons";
import { FlatListLastTransactions } from "../../components/HomeScreen/FlatListLastTransactions";

const transactions = new TransactionsClass();

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  const [balanceViewState, setBalanceViewState] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState(null);

  useEffect(() => {
    loadListTransactions();
  }, []);

  const handleBalanceViewState = () => {
    setBalanceViewState(balanceViewState ? false : true);
  };

  const loadListTransactions = async () => {
    try {
      const response = await transactions.getAllTransactions(user._id);
      setTransactionHistory(response.data.data.transactions);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <FlatListLastTransactions desc={item.description} value={item.value} />
  );

  return (
    <>
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

        {transactionHistory ? (
          <FlatList
            data={transactionHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text>not transactions</Text>
        )}
      </View>
      <StatusBar
        backgroundColor="#7E74F1"
        barStyle="light-content"
        translucent
      />
    </>
  );
}
