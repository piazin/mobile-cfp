import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Text } from 'native-base';

export function PreviewIcon({ categoryName, iconColor, iconName }) {
  return (
    <>
      <Box
        w={52}
        h={52}
        alignItems="center"
        justifyContent="center"
        borderRadius={50}
        backgroundColor={iconColor}
        mt="30"
      >
        <MaterialCommunityIcons name={iconName} size={38} color="#fff" />
      </Box>

      <Text color="white" fontSize="md" fontWeight="bold" fontFamily="body">
        {categoryName}
      </Text>
    </>
  );
}
