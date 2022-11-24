import React from "react";
import { View, StyleSheet } from "react-native";

import { ShortcutIcons } from "../ShortcutIcons";

export default function BoxShortcutIcons() {
  return (
    <View style={styles.container}>
      <ShortcutIcons iconName="bank-transfer-in" label="Nova receita" />
      <ShortcutIcons iconName="bank-transfer-out" label="Nova despesa" />
      <ShortcutIcons iconName="wallet" label="Wallet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
  },
});
