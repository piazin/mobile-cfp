import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Text } from 'native-base';
import { styles } from './styles';
import { useContext, useRef } from 'react';
import { Icon } from '../../components/Global/Icon';
import { AuthContext } from '../../contexts/authContext';
import Input from '../../components/EditDataScreen/Input';
import { Button } from '../../components/EditDataScreen/Button';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { SelectAnImage } from '../../components/ProfileScreen/SelectAnImage';
import {
  Keyboard,
  ScrollView,
  StatusBar,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function EditDataScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const handleUpdateUser = async () => {};

  const ref_input_email = useRef();
  const ref_input_password = useRef();
  const ref_input_current_password = useRef();

  return (
    <Formik
      initialValues={{ email: user.email, name: user.name, password: '', currentPassword: '' }}
      onSubmit={(values) => console.debug(values)}
      validationSchema={Yup.object({
        name: Yup.string().min(2, 'Nome muito curto').required('Nome é obrigatório'),
        email: Yup.string().email('Insira um email valido!').required('Email é obrigatório'),
        currentPassword: Yup.string().min(6),
        password: Yup.string().min(6, 'Sua senha deve conter no minimo 6 digitos').max(50),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <ScrollView style={[styles.container, { paddingTop: statusBarHeight }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon iconLibraryName="MaterialIcons" name="arrow-back-ios" size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center' }}>
            <SelectAnImage user={user} />
          </View>

          <View style={styles.containerInput}>
            {errors.email ? <Text color="red.400">{errors.email}</Text> : null}
            <Input
              placeholder={user.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              labelName="Nome"
              returnKeyType="next"
              onSubmitEditing={() => ref_input_email.current.focus()}
              style={{ borderColor: errors.name ? 'red' : '#727272' }}
            />
            <Input
              placeholder={user.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              labelName="Email"
              returnKeyType="next"
              onSubmitEditing={() => ref_input_current_password.current.focus()}
              innerRef={ref_input_email}
              style={{ borderColor: errors.name ? 'red' : '#727272' }}
            />

            <Input
              placeholder="******"
              onChangeText={handleChange('currentPassword')}
              onBlur={handleBlur('currentPassword')}
              value={values.currentPassword}
              labelName="Senha atual"
              returnKeyType="next"
              onSubmitEditing={() => ref_input_password.current.focus()}
              innerRef={ref_input_current_password}
              style={{ borderColor: errors.currentPassword ? 'red' : '#727272' }}
            />

            <Input
              placeholder="******"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              innerRef={ref_input_password}
              labelName="Nova senha"
              style={{ borderColor: errors.password ? 'red' : '#727272' }}
            />

            <Button
              isDisabled={errors.email || errors.name ? true : false}
              title="Salvar alterações"
              onPress={() => console.debug('debug ')}
            />
          </View>

          <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
        </ScrollView>
      )}
    </Formik>
  );
}
