import { useState } from 'react';
import { Keyboard, StatusBar, View } from 'react-native';
import { styles } from './styles';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { Header } from '../../components/Global/Header';
import { TouchableWithoutFeedback } from 'react-native';
import Input from '../../components/CategoriesScreen/Input';
import Modal from 'react-native-modal';
import { Text } from 'native-base';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function NewCategoriesScreen() {
  const [categoryName, setCategoryName] = useState('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingTop: statusBarHeight }]}>
        <Header title="Adcionar Categoria" style={{ paddingBottom: 20, paddingTop: 5 }} />

        <View style={styles.inputsContainer}>
          <Input
            placeholder="Digite o nome da categoria"
            value={categoryName}
            labelName="Nome"
            onChangeText={(value) => setCategoryName(value)}
          />
        </View>

        {/*https://github.com/react-native-modal/react-native-modal*/}
        <Modal isVisible={true}>
          <View style={{ flex: 1 }}>
            <Text color="white">CU</Text>
          </View>
        </Modal>

        <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      </View>
    </TouchableWithoutFeedback>
  );
}
