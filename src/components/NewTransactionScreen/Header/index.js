import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { Icon } from '../../Global/Icon';

export function Header({ typeTransaction }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon iconLibraryName="Ionicons" name="arrow-back" size={32} color="#fff" />
      </TouchableOpacity>
      <Text color="white" fontFamily="heading" fontSize="lg" fontWeight="medium" marginLeft={6}>
        Nova {typeTransaction == 'expense' ? 'despesa' : 'receita'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
