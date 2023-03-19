import styles from './styles';
import { Box, Divider, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

const BoxBalance = ({ balance, balanceViewState }) => {
  const navigation = useNavigation();
  const [balanceState, setBalanceState] = useState(null);

  useEffect(() => {
    formatBalance();
  }, [balance]);

  const formatBalance = () => {
    let formatBalance = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(balance);

    formatBalance = formatBalance.replace('R$', '');
    setBalanceState(formatBalance);
  };

  return (
    <View style={styles.balanceBox}>
      <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
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
        <Box flexDirection="row" alignItems="center">
          <Text
            color="white"
            fontFamily="body"
            fontWeight="bold"
            fontSize={22}
            paddingTop="2.5"
            paddingRight="2.5"
          >
            R$
          </Text>
          {balanceViewState ? (
            <Text
              color="white"
              fontFamily="body"
              fontWeight="bold"
              fontSize={22}
              paddingTop="2.5"
            >
              {balanceState}
            </Text>
          ) : (
            <Divider width="16" marginTop="2" height="0.5" />
          )}
        </Box>
      </TouchableOpacity>
    </View>
  );
};

export default BoxBalance;
