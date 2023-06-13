import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Divider, Text, View } from 'native-base';
import BottomSheet from 'react-native-easy-bottomsheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { categoryService } from '../../../../services/categories';

export function BottomSheetComponent({
  categoryModalIsVisible,
  setCategoryModalIsVisible,
  handleChangeCategory,
  category,
  type,
}) {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await categoryService.findAllCategories();
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <BottomSheet
      bottomSheetTitle="Categoria"
      bottomSheetIconColor="#7E74F1"
      bottomSheetStyle={{
        backgroundColor: '#1e1e1e',
        maxHeight: '80%',
        minHeight: '25%',
      }}
      bottomSheetTitleStyle={{ color: '#7E74F1' }}
      onRequestClose={() => setCategoryModalIsVisible(!categoryModalIsVisible)}
      bottomSheetVisible={categoryModalIsVisible}
    >
      <ScrollView>
        {categories.length > 0 &&
          categories?.map((item) =>
            item.type == type ? (
              <View key={item._id}>
                <TouchableOpacity
                  onPress={() => {
                    handleChangeCategory(item);
                    setCategoryModalIsVisible(false);
                  }}
                  style={styles.buttonSelectCategory}
                >
                  <Box
                    w={35}
                    h={35}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={50}
                    backgroundColor={item.colorHash}
                  >
                    <MaterialCommunityIcons name={item.iconName} color="#fff" size={22} />
                  </Box>
                  <Text
                    color="#fff"
                    fontWeight="medium"
                    fontFamily="body"
                    fontSize="lg"
                    marginLeft={18}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <Divider my={2} bg="muted.500" />
              </View>
            ) : null
          )}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  buttonSelectCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingLeft: 10,
  },
});
