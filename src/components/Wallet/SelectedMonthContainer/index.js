import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckIcon, Select, Text } from 'native-base';

const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export const SelectedMonthContainer = ({ balance, selectedMonth, setSelectedMonth }) => {
  const handleChangeMonth = (itemValue) => {
    setSelectedMonth(months[itemValue]);
  };

  return (
    <View style={styles.selectContainer}>
      <Text color="white" fontFamily="body" fontWeight="bold" fontSize="3xl">
        R$ {balance}
      </Text>

      <Select
        selectedValue={months.findIndex((m) => m == selectedMonth)}
        minWidth="300"
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        background="primary.900"
        color="muted.400"
        marginTop="5"
        fontSize="xl"
        _selectedItem={{
          bg: 'muted.200',
          endIcon: <CheckIcon size="5" color="emerald.500" />,
          _focus: { borderColor: 'muted.500' },
        }}
        placeholderTextColor="muted.400"
        mt={1}
        onValueChange={(itemValue) => handleChangeMonth(itemValue)}
      >
        {months.map((month, index) => (
          <Select.Item label={month} value={index} key={index} />
        ))}
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
});
