import React from "react";
import { View, Image } from "react-native";
import { Text, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import ExpenseIcon from "../../../assets/expense-icon.png";
import IncomeIcon from "../../../assets/income-icon.png";

export function FlatListLastTransactions({ desc, value, typeTransaction }) {
  return (
    <View style={styles.container}>
      <Box
        borderRadius={40}
        width={82}
        height={82}
        backgroundColor="primary.800"
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons name="car" size={42} color="#D6d6d6" />
      </Box>

      <Text
        color="white"
        position="absolute"
        left={95}
        numberOfLines={1}
        fontSize="md"
        fontFamily="body"
        fontWeight="medium"
        width={68}
      >
        {desc}
      </Text>

      <Image
        source={typeTransaction == "expense" ? ExpenseIcon : IncomeIcon}
        style={styles.iconType}
      />
      <Text color="white" position="absolute" right={5} fontSize="md">
        R$ {typeTransaction == "expense" ? "-" : "+"}
        {String(value).length > 5
          ? String(value).substring(0, 4) + "..."
          : value}
      </Text>
    </View>
  );
}
