import { Keyboard, StatusBar, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { Header } from '../../components/Global/Header';
import { TextInput } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function NewCategoriesScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingTop: statusBarHeight }]}>
        <Header title="Adcionar Categoria" style={{ paddingBottom: 20, paddingTop: 5 }} />

        <TextInput />

        <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      </View>
    </TouchableWithoutFeedback>
  );
}
