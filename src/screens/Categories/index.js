import { FlatList, StatusBar, View } from 'react-native';
import { styles } from './styles';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useEffect, useState } from 'react';
import { categoryService } from '../../services/categories';
import { ListCategories } from '../../components/CategoriesScreen/ListCategories';
import { Header } from '../../components/Global/Header';
import { AddButton } from '../../components/CategoriesScreen/AddButton';
import { ListCategoriesShimmerEffect } from '../../components/CategoriesScreen/ListCategoriesShimmerEffect';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const response = await categoryService.findAllCategories();
      setCategories(response.data);
    } catch (err) {
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Header title="Categorias" style={{ paddingBottom: 20, paddingTop: 5 }} />
      {isLoading ? (
        <>
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
          <ListCategoriesShimmerEffect />
        </>
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <ListCategories category={item} updateCategories={getCategories} />
          )}
          keyExtractor={(item) => item._id}
        />
      )}

      <AddButton onPress={() => navigation.navigate('NewCategoryScreen')} />
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
    </View>
  );
}
