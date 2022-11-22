import React from "react";
import { View } from "react-native";

import { ShortcutIcons } from "../ShortcutIcons";

export default function BoxShortcutIcons() {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 16 }}
    >
      <ShortcutIcons iconName="bank-transfer-in" label="Nova receita" />
      <ShortcutIcons iconName="bank-transfer-out" label="Nova despesa" />
      <ShortcutIcons iconName="wallet" label="Wallet" />
    </View>
  );
}
