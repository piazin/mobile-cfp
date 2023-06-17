import { useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { styles } from './styles';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { Header } from '../../components/Global/Header';
import Input from '../../components/CategoriesScreen/Input';
import { IconModal } from '../../components/NewCategoryScreen/IconModal';
import { Box, CheckIcon, Select } from 'native-base';
import { icons } from '../../constants/icons';
import { colors } from '../../constants/colors';
import { PreviewIcon } from '../../components/NewCategoryScreen/PreviewIcon';
import AddButton from '../../components/NewCategoryScreen/Button';
import { SelectorButtons } from '../../components/NewCategoryScreen/SelectorButtons';
import { categoryService } from '../../services/categories';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function NewCategoriesScreen({ navigation }) {
  const [categoryName, setCategoryName] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [iconName, setIconName] = useState(icons[0]);
  const [iconColor, setIconColor] = useState(colors[0]);
  const [type, setType] = useState('expense');

  const [modalDataType, setModalDataType] = useState('');
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleCategoryName = (value) => {
    setCategoryName(value);

    if (categoryName.length <= 1) {
      setError(true);
      setIsDisabled(true);
    } else {
      setError(false);
      setIsDisabled(false);
    }
  };

  const onSubmitCategory = async () => {
    try {
      await categoryService.createCategory({
        title: categoryName,
        iconName,
        colorHash: iconColor,
        type,
      });
      navigation.goBack();
    } catch (err) {
      console.debug(err);
      setError(true);
      setIsDisabled(true);
    }
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Header title="Adcionar Categoria" style={{ paddingBottom: 20, paddingTop: 5 }} />

      <Box>
        <View style={styles.inputsContainer}>
          <Input
            placeholder="Digite o nome da categoria"
            value={categoryName}
            labelName="Nome"
            onChangeText={handleCategoryName}
            onEndEditing={(e) => handleCategoryName(e.nativeEvent.text)}
            maxLength={25}
            error={error}
          />

          <Select
            selectedValue={type}
            minWidth="332"
            accessibilityLabel="Tipo de categoria"
            placeholder="Tipo de categoria"
            placeholderTextColor="#727272"
            color="white"
            borderColor="#727272"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            _actionSheetBody={{
              bg: 'black',
            }}
            mt={1}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Select.Item label="Receita" value="income" />
            <Select.Item label="Despesa" value="expense" />
          </Select>

          <SelectorButtons
            modalIsVisible={modalIsVisible}
            setModalDataType={setModalDataType}
            setModalIsVisible={setModalIsVisible}
            iconName={iconName}
            iconColor={iconColor}
          />
          <PreviewIcon categoryName={categoryName} iconColor={iconColor} iconName={iconName} />
        </View>

        <AddButton
          isLoading={false}
          title="Salvar"
          buttonState={isDisabled}
          onPressFunction={onSubmitCategory}
        />
      </Box>

      {/*https://github.com/react-native-modal/react-native-modal*/}
      <IconModal
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        setIconColor={setIconColor}
        setIconName={setIconName}
        modalDataType={modalDataType}
      />

      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
    </ScrollView>
  );
}
