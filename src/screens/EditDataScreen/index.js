import { Keyboard, StatusBar, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { Icon } from '../../components/Global/Icon';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { SelectAnImage } from '../../components/ProfileScreen/SelectAnImage';
import Input from '../../components/EditDataScreen/Input';
import { Button } from '../../components/EditDataScreen/Button';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function EditDataScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateUser = async () => {};

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingTop: statusBarHeight }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon iconLibraryName="MaterialIcons" name="arrow-back-ios" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center' }}>
          <SelectAnImage user={user} />
        </View>

        <View style={styles.containerInput}>
          <Input placeholder={user.name} setValue={setName} value={name} labelName="Nome" />
          <Input placeholder={user.email} setValue={setEmail} value={email} labelName="Email" />

          <Button title="Salvar alterações" onPress={() => console.debug('debug ')} />
        </View>

        <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      </View>
    </TouchableNativeFeedback>
  );
}
