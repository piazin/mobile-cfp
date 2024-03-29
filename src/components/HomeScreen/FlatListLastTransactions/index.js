import { View } from 'react-native';
import { Text, Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

export function FlatListLastTransactions({ desc, value, typeTransaction, category }) {
  return (
    <View style={styles.container}>
      <Box
        borderRadius={40}
        borderColor={typeTransaction == 'expense' ? 'danger.600' : 'success.600'}
        borderWidth={1}
        width={62}
        height={62}
        backgroundColor="primary.800"
        alignItems="center"
        justifyContent="center"
      >
        <MaterialCommunityIcons name={category.iconName} size={42} color="#D6d6d6" />
      </Box>

      <Text
        color="white"
        position="absolute"
        left={75}
        numberOfLines={1}
        fontSize="sm"
        fontFamily="body"
        fontWeight="light"
        width={100}
      >
        {desc}
      </Text>

      <Text color="white" position="absolute" right={5} fontSize="md">
        R$ {typeTransaction == 'expense' ? '-' : '+'}
        {String(value).length > 8 ? String(value).substring(0, 4) + '...' : value}
      </Text>
    </View>
  );
}
