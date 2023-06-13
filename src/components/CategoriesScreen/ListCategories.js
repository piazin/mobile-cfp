import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Text } from 'native-base';
import { View } from 'react-native';

export function ListCategories({ category }) {
  return (
    <View>
      <Box
        style={{
          borderRadius: 50,
          width: 50,
          height: 50,
          backgroundColor: category.colorHash,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialCommunityIcons color="#fff" size={22} name={category.iconName} />
      </Box>
      <Text color="white">{category.title}</Text>
    </View>
  );
}
