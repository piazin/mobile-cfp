import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ShortcutIcons } from '../ShortcutIcons';

export default function BoxShortcutIcons() {
  return (
    <View style={styles.container}>
      <ShortcutIcons
        iconName="bank-transfer-in"
        label="Nova receita"
        routeName="NewTransactionScreen"
        typeTransaction="income"
      />
      <ShortcutIcons
        iconName="bank-transfer-out"
        label="Nova despesa"
        routeName="NewTransactionScreen"
        typeTransaction="expense"
      />
      <ShortcutIcons iconName="wallet" label="Carteira" routeName="Wallet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
});
