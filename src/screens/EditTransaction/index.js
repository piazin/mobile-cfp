import styles from './styles';
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

import { transactionService } from '../../services/transaction';
import { AuthContext } from '../../contexts/authContext';

import AwesomeAlert from 'react-native-awesome-alerts';

import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { Header } from '../../components/NewTransactionScreen/Header';
import { InputValue } from '../../components/NewTransactionScreen/InputValue';
import { Input } from '../../components/NewTransactionScreen/Input';
import { Button } from '../../components/NewTransactionScreen/Button';

const currentHeight = StatusBar.currentHeight + 10 || 16;

export default function EditTransaction({ route, navigation }) {
  const { handleNewData } = useContext(AuthContext);

  const [categoryModalIsVisible, setCategoryModalIsVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [valueTransaction, setValueTransaction] = useState(route.params.value);
  const [description, setDescription] = useState(route.params.description);
  const [transactionId, setTransactionId] = useState(route.params._id);
  const [date, setDate] = useState(new Date(route.params.date));
  const [category, setCategory] = useState(route.params.category);
  const [type, setType] = useState(route.params.type);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  useEffect(() => formatBalance(valueTransaction), []);

  const formatBalance = (value) => {
    value = parseFloat(value).toFixed(2);
    value = value + '';
    value = parseInt(value.replace(/[\D]+/g, ''));
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, ',$1');

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }

    if (value == 'NaN') return setValueTransaction('');

    setValueTransaction(value);
  };

  const validateFormData = () => {
    if (valueTransaction.trim().length < 1 || valueTransaction == '0') {
      setIsButtonDisabled(true);
      setErrorMessage('O valor deve ser valido');
      setShowAlert(true);
      return false;
    }
    if (description.trim().length < 1) {
      setIsButtonDisabled(true);
      setErrorMessage('Insira uma descrição');
      setShowAlert(true);
      return false;
    }
    if (!category) {
      setErrorMessage('Selecione uma categoria');
      setShowAlert(true);
      return false;
    }
    if (!transactionId) {
      setErrorMessage('Não foi possivel ober o ID da transação');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const onSubmitTransactionUpdate = async () => {
    if (!validateFormData()) {
      return;
    }

    try {
      setLoading(true);

      const value = valueTransaction.replace('.', '').replace(',', '.');
      await transactionService.updateTransaction({
        id: transactionId,
        value,
        date,
        type,
        description,
        category: category?._id,
      });
      handleNewData();
      resetFormData();
      navigation.navigate('Wallet', { updateTransactionData: true });
    } catch (error) {
      handleSubmissionError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resetFormData = () => {
    setCategory(null);
    setDescription('');
    setValueTransaction('0');
  };

  const handleSubmissionError = (error) => {
    setShowAlert(true);
    setErrorMessage(error);
  };

  const handleChangeCategory = (category) => {
    setCategory(category);
  };

  const handleChangeType = (type) => {
    setType(type);
    setCategory(null);
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
            placeholder="Descrição"
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
            handleChangeCategory={handleChangeCategory}
            setButtonDisabled={setIsButtonDisabled}
            type={type}
          />

          <View style={styles.boxRadioButtons}>
            <RadioButton
              value="expense"
              label="Despesa"
              status={type === 'expense' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeType('expense')}
            />
            <Text color="white" fontWeight="medium" fontFamily="body" fontSize={16} marginRight={6}>
              Despesa
            </Text>

            <RadioButton
              value="income"
              label="Receita"
              status={type === 'income' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeType('income')}
            />
            <Text color="white" fontWeight="medium" fontFamily="body" fontSize={16} marginRight={6}>
              Receita
            </Text>
          </View>

          <Button
            title="Editar"
            onPress={onSubmitTransactionUpdate}
            isDisabled={isButtonDisabled}
            isLoading={loading}
          />
        </SafeAreaView>
        <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
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
