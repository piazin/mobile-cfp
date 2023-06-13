import { FlatList, ScrollView, StatusBar, View } from 'react-native';
import { styles } from './styles';
import { Text } from 'native-base';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useEffect, useState } from 'react';
import { categoryService } from '../../services/categories';
import { ListCategories } from '../../components/CategoriesScreen/ListCategories';

const statusBarHeight = StatusBar.currentHeight || 20;

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await categoryService.findAllCategories();
      setCategories(response.data);
    } catch (err) {
      setCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <ListCategories category={item} />}
        keyExtractor={(item) => item._id}
      />

      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
    </View>
  );
}
