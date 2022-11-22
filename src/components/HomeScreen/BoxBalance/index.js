import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text } from "native-base";
import styles from "./styles";

const BoxBalance = ({ balance, balanceViewState }) => {
  return (
    <View style={styles.balanceBox}>
      <TouchableOpacity onPress={() => console.info("btn")}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="white" fontFamily="body" fontWeight="bold" fontSize="lg">
            Wallet
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
          {balanceViewState ? `R$ ${balance}` : "****"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BoxBalance;
