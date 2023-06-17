import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
  const handleChangeMonth = (itemIndex) => {
    setSelectedMonth(months[itemIndex]);
  };

  return (
    <View style={styles.selectContainer}>
      <Text color="white" fontFamily="body" fontWeight="bold" fontSize="2xl">
        R$ {balance}
      </Text>

      <TouchableOpacity onPress={() => console.debug('press')}>
        <Select
          selectedValue={months.findIndex((month) => month == selectedMonth)}
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          background="primary.900"
          color="muted.400"
          marginTop="5"
          fontSize="xl"
          height="16"
          minWidth="200"
          _selectedItem={{
            bg: 'muted.200',
            endIcon: <CheckIcon size="5" color="emerald.500" />,
            _focus: { borderColor: 'muted.500' },
          }}
          placeholderTextColor="muted.400"
          onValueChange={(itemValue) => handleChangeMonth(itemValue)}
          mt={1}
        >
          {months.map((month, index) => (
            <Select.Item label={month} value={index} key={index} />
          ))}
        </Select>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
});
