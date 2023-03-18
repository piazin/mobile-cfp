import { View, Text, StatusBar } from 'react-native';
import { styles } from './styles';

const statusBarHeight = StatusBar.currentHeight;

export default function Wallet() {
  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Text style={{ color: 'white' }}>Hello</Text>

      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
    </View>
  );
}
