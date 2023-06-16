import { useState } from 'react';
import { Keyboard, StatusBar, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { Header } from '../../components/Global/Header';
import { TouchableWithoutFeedback } from 'react-native';
import Input from '../../components/CategoriesScreen/Input';
import Modal from 'react-native-modal';
import { Button, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { icons } from '../../constants/icons';
import { colors } from '../../constants/colors';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function NewCategoriesScreen() {
  const [categoryName, setCategoryName] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [iconName, setIconName] = useState(icons[0]);
  const [iconColor, setIconColor] = useState(colors[0]);

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

          <View>
            <Text color="white">Icone</Text>
            <Button bg={iconColor} w="16" h="16" onPress={() => setModalIsVisible(!modalIsVisible)}>
              <MaterialCommunityIcons color="#fff" size={28} name={iconName} />
            </Button>
          </View>
        </View>

        {/*https://github.com/react-native-modal/react-native-modal*/}
        <Modal isVisible={modalIsVisible}>
          <View style={{ flex: 1 }}>
            <Button onPress={() => setModalIsVisible(!modalIsVisible)}>Voltar</Button>
            {icons?.map((icone) => (
              <TouchableOpacity
                onPress={() => {
                  setIconName(icone);
                  setModalIsVisible(!modalIsVisible);
                }}
              >
                <MaterialCommunityIcons color="#fff" size={28} name={icone} />
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      </View>
    </TouchableWithoutFeedback>
  );
}
