import React, { useState, useContext, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import ExpenseIcon from '../../../assets/expense-icon.png';
import IncomeIcon from '../../../assets/income-icon.png';

import { TransactionContext } from '../../../contexts/transactionsContext';

export function FlatListLastTransactions({
  desc,
  value,
  typeTransaction,
  categoryId,
}) {
  const { categories } = useContext(TransactionContext);

  const [iconCategory, setIconCategory] = useState({});

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    if (!categories) return;

    categories.forEach((category) => {
      if (category._id != categoryId) return;

      setIconCategory(category);
    });
  };

  return (
    <View style={styles.container}>
      <Box
        borderRadius={40}
        borderColor="purple.300"
        borderWidth={1}
        width={62}
        height={62}
        backgroundColor="primary.800"
        alignItems="center"
        justifyContent="center"
      >
        <MaterialCommunityIcons
          name={iconCategory.iconName}
          size={42}
          color="#D6d6d6"
        />
      </Box>

      <Text
        color="white"
        position="absolute"
        left={85}
        numberOfLines={1}
        fontSize="md"
        fontFamily="body"
        fontWeight="medium"
        width={68}
      >
        {desc}
      </Text>

      <Image
        source={typeTransaction == 'expense' ? ExpenseIcon : IncomeIcon}
        style={styles.iconType}
      />
      <Text color="white" position="absolute" right={5} fontSize="md">
        R$ {typeTransaction == 'expense' ? '-' : '+'}
        {String(value).length > 5
          ? String(value).substring(0, 4) + '...'
          : value}
      </Text>
    </View>
  );
}
