import * as Yup from 'yup';
import { Formik } from 'formik';
import { styles } from './styles';
import { useContext, useRef, useState } from 'react';
import { Icon } from '../../components/Global/Icon';
import { AuthContext } from '../../contexts/authContext';
import Input from '../../components/EditDataScreen/Input';
import { Button } from '../../components/EditDataScreen/Button';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { SelectAnImage } from '../../components/ProfileScreen/SelectAnImage';
import { ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { userService } from '../../services/user';
import api from '../../config/axios';
import { Text } from 'native-base';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function EditDataScreen({ navigation }) {
  const { user, handleNewData, jwt } = useContext(AuthContext);

  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const ref_input_email = useRef();
  const ref_input_password = useRef();
  const ref_input_current_password = useRef();
  const ref_input_confirm_password = useRef();

  const handleUpdateUser = async (values) => {
    let inputs = values;
    delete inputs['confirmPassword'];

    for (const value of Object.keys(values)) {
      values[value].length > 0 ? value : delete inputs[value];
    }

    if (Object.keys(inputs).length > 0) await onSubmitUpdateUser(inputs);

    if (photo) await onSubmitProfilePic(photo);
  };

  const onSubmitUpdateUser = async (userData) => {
    try {
      await userService.updateUser(userData);
      handleNewData();
      navigation.goBack();
    } catch (err) {
      setErrorMessage(err.response.data.message);
      clearErrorMessage();
    }
  };

  const onSubmitProfilePic = async (photo) => {
    let data = new FormData();

    let splitUri = photo.uri.split('.');
    let getMimeType = splitUri[splitUri.length - 1];

    data.append('owner', user._id);
    data.append('avatar', {
      uri: photo.uri,
      name: `profile-pic-${user.name}.${getMimeType}`,
      type: `${photo.type}/${getMimeType}`,
    });

    try {
      var response = await api.post('/user/avatar', data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': `multipart/form-data`,
        },
      });

      if (response) handleNewData();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      clearErrorMessage();
    }
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        currentPassword: '',
        confirmPassword: '',
      }}
      onSubmit={(values) => handleUpdateUser(values)}
      validationSchema={Yup.object({
        name: Yup.string().min(2, 'Nome muito curto').max(40),
        email: Yup.string().email('Insira um email valido!'),
        currentPassword: Yup.string().min(6).max(50),
        password: Yup.string()
          .min(6, 'Sua senha deve conter no minimo 6 digitos')
          .max(35)
          .when('currentPassword', (currentPassword, field) =>
            currentPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', {
          is: (password) => password && password.length > 0,
          then: Yup.string()
            .required('Confirme sua senha')
            .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
        }),
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
            <SelectAnImage user={user} setPhoto={setPhoto} />
          </View>

          <View style={styles.containerInput}>
            {errorMessage ? (
              <Text color="red.400" fontWeight="bold" mt="3" mb="3" fontSize="sm">
                {errorMessage}
              </Text>
            ) : null}

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
              style={{ borderColor: errors.email ? 'red' : '#727272' }}
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
              returnKeyType="next"
              onSubmitEditing={() => ref_input_confirm_password.current.focus()}
              labelName="Nova senha"
              style={{ borderColor: errors.password ? 'red' : '#727272' }}
            />

            <Input
              placeholder="******"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              innerRef={ref_input_confirm_password}
              labelName="Confirmar senha"
              style={{ borderColor: errors.confirmPassword ? 'red' : '#727272' }}
            />

            <Button
              isDisabled={
                errors.email ||
                errors.name ||
                errors.password ||
                errors.currentPassword ||
                errors.confirmPassword ||
                errorMessage
              }
              title="Salvar alterações"
              onPress={() => handleSubmit()}
            />
          </View>

          <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
        </ScrollView>
      )}
    </Formik>
  );
}
