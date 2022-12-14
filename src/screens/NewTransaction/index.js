import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Text } from 'native-base';
import { RadioButton } from 'react-native-paper';

import { TransactionsClass } from '../../services/api';
import { AuthContext } from '../../contexts/authContext';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import AwesomeAlert from 'react-native-awesome-alerts';

import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { Header } from '../../components/NewTransactionScreen/Header';
import { InputValue } from '../../components/NewTransactionScreen/InputValue';
import { Input } from '../../components/NewTransactionScreen/Input';
import { Button } from '../../components/NewTransactionScreen/Button';

const currentHeight = StatusBar.currentHeight + 10 || 16;

const transaction = new TransactionsClass();

export default function NewTransactionScreen({ route }) {
  const navigation = useNavigation();

  const { user, jwt, handleNewData } = useContext(AuthContext);
  const { typeTransaction } = route.params;

  const [categoryModalIsVisible, setCategoryModalIsVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  ////////////////////////////////////////////////
  // Form states
  ////////////////////////////////////////////////
  const [valueTransaction, setValueTransaction] = useState('0');
  const [valueTransactionFormat, setValueTransactionFormat] =
    useState(valueTransaction);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(typeTransaction);

  ////////////////////////////////////////////////
  // Change Date
  ////////////////////////////////////////////////
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  useEffect(() => {
    setType(typeTransaction);
  }, [typeTransaction]);

  ////////////////////////////////////////////////
  // set and format value transaction
  ////////////////////////////////////////////////
  useEffect(() => {
    formatValue();
  }, [valueTransaction]);

  const formatValue = () => {
    let formatValue;
    formatValue = valueTransaction.replace('.', '');
    formatValue = formatValue.replace(',', '.');

    if (formatValue.length == 3) formatValue = `0${formatValue}`;
    setValueTransactionFormat(formatValue);
  };

  ////////////////////////////////////////////////
  // check form information
  ////////////////////////////////////////////////
  const checkFormInfo = () => {
    if (valueTransaction.length < 1 || valueTransaction == '0') {
      setIsButtonDisabled(true);
      setErrorMessage('O valor deve ser valido');
      setShowAlert(true);
      return false;
    }
    if (description.length < 1) {
      setIsButtonDisabled(true);
      setErrorMessage('Insira uma descri????o');
      setShowAlert(true);
      return false;
    }
    if (!category) {
      setErrorMessage('Selecione uma categoria');
      setShowAlert(true);
      return false;
    }

    setShowAlert(false);
    setIsButtonDisabled(false);
    return true;
  };
  ////////////////////////////////////////////////
  // Submit form
  ////////////////////////////////////////////////
  const onSubmitTransaction = async () => {
    if (!checkFormInfo()) return;

    await transaction.createTransaction(
      valueTransactionFormat,
      date,
      type,
      description,
      category?._id,
      user._id,
      jwt
    );
    handleNewData();

    setValueTransaction('0');
    setDescription('');
    setCategory(null);

    navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={[styles.container, { paddingTop: currentHeight }]}>
        <Header typeTransaction={type} />
        <SafeAreaView style={styles.containerInputs}>
          <InputValue
            typeTransaction={type}
            valueTransaction={valueTransaction}
            setValueTransaction={setValueTransaction}
            setButtonDisabled={setIsButtonDisabled}
          />

          <Input
            iconName="file-document-edit-outline"
            placeholder="Descri????o"
            typeDate="desc"
            setDescription={setDescription}
            description={description}
            setButtonDisabled={setIsButtonDisabled}
          />

          <Input
            iconName="calendar"
            placeholder="Data"
            typeInput="date"
            date={date}
            onChangeDate={onChangeDate}
            setButtonDisabled={setIsButtonDisabled}
          />

          <Input
            typeInput="select"
            iconName="bookmark-outline"
            categoryModalIsVisible={categoryModalIsVisible}
            setCategoryModalIsVisible={setCategoryModalIsVisible}
            category={category}
            setCategory={setCategory}
            setButtonDisabled={setIsButtonDisabled}
            type={type}
          />

          <View style={styles.boxRadioButtons}>
            <RadioButton
              value="expense"
              label="Despesa"
              status={type === 'expense' ? 'checked' : 'unchecked'}
              onPress={() => setType('expense')}
            />
            <Text
              color="white"
              fontWeight="medium"
              fontFamily="body"
              fontSize={16}
              marginRight={6}
            >
              Despesa
            </Text>

            <RadioButton
              value="income"
              label="Receita"
              status={type === 'income' ? 'checked' : 'unchecked'}
              onPress={() => setType('income')}
            />
            <Text
              color="white"
              fontWeight="medium"
              fontFamily="body"
              fontSize={16}
              marginRight={6}
            >
              Receita
            </Text>
          </View>

          <Button
            title="Salvar"
            onPress={onSubmitTransaction}
            isDisabled={isButtonDisabled}
          />
        </SafeAreaView>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#1e1e1e"
        />
        {/* Alerts */}

        <AwesomeAlert
          show={showAlert}
          title="Alert"
          showProgress={false}
          message={errorMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlert(!showAlert);
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
