import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

export function Icon({ iconLibraryName = 'FontAwesome5', ...rest }) {
  if (iconLibraryName === 'FontAwesome5') return <FontAwesome5 {...rest} />;
  if (iconLibraryName === 'AntDesign') return <AntDesign {...rest} />;
  if (iconLibraryName === 'Ionicons') return <Ionicons {...rest} />;
  if (iconLibraryName === 'MaterialCommunityIcons') return <MaterialCommunityIcons {...rest} />;
  if (iconLibraryName === 'MaterialIcons') return <MaterialIcons {...rest} />;
}
