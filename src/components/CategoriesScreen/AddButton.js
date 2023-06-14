import { Button } from 'native-base';
import { Icon } from '../Global/Icon';
import { TouchableOpacity } from 'react-native';

export function AddButton({ ...rest }) {
  return (
    <TouchableOpacity style={{ position: 'absolute', top: 32, right: 30 }} {...rest}>
      <Icon
        iconLibraryName="MaterialCommunityIcons"
        name="bookmark-plus-outline"
        size={32}
        color="#fff"
      />
    </TouchableOpacity>
  );
}
