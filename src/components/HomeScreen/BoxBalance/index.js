import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text } from "native-base";
import styles from "./styles";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

const BoxBalance = ({ balance, balanceViewState }) => {
  const [balanceState, setBalanceState] = useState(null);

  useEffect(() => {
    formatBalance();
  }, [balance]);

  const formatBalance = () => {
    let formatBalance = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(balance);

    formatBalance = formatBalance.replace("R$", "");
    setBalanceState(formatBalance);
  };

  return (
    <View style={styles.balanceBox}>
      <TouchableOpacity onPress={() => console.info("btn")}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="white" fontFamily="body" fontWeight="bold" fontSize="lg">
            Carteira
          </Text>
          <Ionicons name="chevron-forward" color="#ffffff" size={22} />
        </Box>
        <Text
          color="white"
          fontFamily="body"
          fontWeight="bold"
          fontSize={22}
          paddingTop="2.5"
        >
          R$ {balanceViewState ? `${balanceState}` : "****"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BoxBalance;
