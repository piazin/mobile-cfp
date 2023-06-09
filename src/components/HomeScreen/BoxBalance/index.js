import styles from './styles';
import { Box, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatBalance } from '../../../utils/formatBalance';

const BoxBalance = ({ balance, balanceViewState }) => {
  const navigation = useNavigation();
  const [balanceState, setBalanceState] = useState(null);

  useEffect(() => {
    handleFormatBalance();
  }, [balance]);

  const handleFormatBalance = () => {
    const formattedBalance = formatBalance(balance);
    setBalanceState(formattedBalance);
  };

  return (
    <View style={styles.balanceBox}>
      <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
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
            <Text color="white" fontFamily="body" fontWeight="bold" fontSize={22} paddingTop="2.5">
              {balanceState}
            </Text>
          ) : (
            <View
              style={{
                height: 20,
                width: 100,
                marginTop: 10,
                shadowOpacity: 1,
                shadowColor: '#fff0',
                shadowOffset: { width: 10, height: 10 },
                shadowRadius: 5,
                elevation: 5,
                borderWidth: 0.5,
                borderRadius: 5,
                backgroundColor: '#363636',
              }}
            ></View>
          )}
        </Box>
      </TouchableOpacity>
    </View>
  );
};

export default BoxBalance;
