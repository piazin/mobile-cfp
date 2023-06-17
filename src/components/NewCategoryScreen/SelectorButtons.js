import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Button, Text } from 'native-base';
import { View } from 'react-native';

export function SelectorButtons({
  modalIsVisible,
  setModalIsVisible,
  setModalDataType,
  iconColor,
  iconName,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
      }}
    >
      <Box alignItems="center" w="120">
        <Text color="white" fontFamily="body" fontWeight="bold" fontSize="md">
          Icone
        </Text>
        <Button
          bg="primary.800"
          w="16"
          h="16"
          onPress={() => {
            setModalIsVisible(!modalIsVisible);
            setModalDataType('icon');
          }}
        >
          <MaterialCommunityIcons color="#fff" size={28} name={iconName} />
        </Button>
      </Box>
      <Box alignItems="center" w="120">
        <Text color="white" fontFamily="body" fontWeight="bold" fontSize="md">
          Cor
        </Text>
        <Button
          bg="primary.800"
          w="16"
          h="16"
          onPress={() => {
            setModalIsVisible(!modalIsVisible);
            setModalDataType('color');
          }}
        >
          <View style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: iconColor }} />
        </Button>
      </Box>
    </View>
  );
}
