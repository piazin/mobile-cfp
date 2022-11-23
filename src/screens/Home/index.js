import React, { useContext, useState } from "react";
import { View, StatusBar } from "react-native";
import { AuthContext } from "../../contexts/authContext";

import { styles, lightMode } from "./styles";
import Header from "../../components/HomeScreen/Header";
import BoxBalance from "../../components/HomeScreen/BoxBalance";
import BoxShortcutIcons from "../../components/HomeScreen/BoxShortcutIcons";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  const [balanceViewState, setBalanceViewState] = useState(false);

  const handleBalanceViewState = () => {
    setBalanceViewState(balanceViewState ? false : true);
  };

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
      </View>
      <StatusBar
        backgroundColor="#7E74F1"
        barStyle="light-content"
        translucent
      />
    </>
  );
}
