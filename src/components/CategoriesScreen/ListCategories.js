import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Text } from 'native-base';
import { Alert, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { categoryService } from '../../services/categories';

export function ListCategories({ category, updateCategories, setErrorMessage }) {
  const createButtonAlert = (categoryTitle) => {
    Alert.alert(`Categoria ${categoryTitle}`, 'Deseja realmente excluir?', [
      { style: 'cancel', text: 'Cancelar' },
      {
        text: 'OK',
        onPress: () => handleDeleteCategory(),
      },
    ]);
  };

  const handleDeleteCategory = async () => {
    try {
      const { status } = await categoryService.deleteCategoryById(category._id);
      if (status === 204) {
      }
      updateCategories();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      clearErrorMessage();
    }
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <TouchableNativeFeedback onLongPress={() => createButtonAlert(category.title)}>
      <View style={styles.container}>
        <Box bg={category.colorHash} mr="6" style={styles.boxIconCategory}>
          <MaterialCommunityIcons color="#fff" size={22} name={category.iconName} />
        </Box>
        <Text fontFamily="body" fontSize="md" color="white">
          {category.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 15,
  },
  boxIconCategory: {
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
