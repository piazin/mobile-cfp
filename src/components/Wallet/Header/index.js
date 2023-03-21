import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

export function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="#fff" />
      </TouchableOpacity>
      <Text
        color="white"
        fontFamily="heading"
        fontSize="lg"
        fontWeight="medium"
        marginLeft={6}
      >
        Income & Expenses
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 25,
  },
});
