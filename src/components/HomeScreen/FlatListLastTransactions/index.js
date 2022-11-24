import React from "react";
import { View, Text } from "react-native";

export function FlatListLastTransactions({ desc, value }) {
  return (
    <View>
      <Text>{desc}</Text>
      <Text>{value}</Text>
    </View>
  );
}
