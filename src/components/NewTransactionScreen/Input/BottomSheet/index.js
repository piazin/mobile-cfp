import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider, Text, View } from 'native-base';
import BottomSheet from 'react-native-easy-bottomsheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function BottomSheetComponent({
  categoryModalIsVisible,
  setCategoryModalIsVisible,
  handleChangeCategory,
  category,
  data,
  type,
}) {
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
        {data &&
          data?.map((item) =>
            item.type == type ? (
              <View key={item._id}>
                <TouchableOpacity
                  onPress={() => {
                    handleChangeCategory(item);
                    setCategoryModalIsVisible(false);
                  }}
                  style={styles.buttonSelectCategory}
                >
                  <MaterialCommunityIcons name={item.iconName} color="#ccc" size={22} />
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
