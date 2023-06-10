import { Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Icon } from '../../Global/Icon';

export default function ProfileActionButton({
  text,
  iconName,
  iconLibName,
  style,
  iconParams,
  ...rest
}) {
  return (
    <TouchableOpacity
      style={{
        width: '90%',
        borderRadius: 4,
        height: 60,
        backgroundColor: '#151515',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 15,
        ...style,
      }}
      {...rest}
    >
      <Icon iconLibraryName={iconLibName} name={iconName} size={28} color="#fff" {...iconParams} />
      <Text color="light.100" fontFamily="body" fontWeight="bold" fontSize="md" marginLeft="5">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
