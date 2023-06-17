import { Box } from 'native-base';
import Modal from 'react-native-modal';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { icons } from '../../constants/icons';

export function IconModal({
  modalIsVisible,
  setModalIsVisible,
  setIconName,
  setIconColor,
  modalDataType,
}) {
  return (
    <Modal isVisible={modalIsVisible} onBackButtonPress={() => setModalIsVisible(!modalIsVisible)}>
      {/*https://github.com/react-native-modal/react-native-modal*/}
      <View style={{ flex: 1 }}>
        <Box flexDirection="row" flexWrap="wrap">
          {modalDataType === 'icon'
            ? icons?.map((icone) => (
                <TouchableOpacity
                  key={icone}
                  onPress={() => {
                    setIconName(icone);
                    setModalIsVisible(!modalIsVisible);
                  }}
                  style={{ padding: 20 }}
                >
                  <MaterialCommunityIcons color="#fff" size={28} name={icone} />
                </TouchableOpacity>
              ))
            : colors?.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => {
                    setIconColor(color);
                    setModalIsVisible(!modalIsVisible);
                  }}
                  style={{ padding: 20 }}
                >
                  <View
                    style={{ width: 29, height: 28, borderRadius: 50, backgroundColor: color }}
                  />
                </TouchableOpacity>
              ))}
        </Box>
      </View>
    </Modal>
  );
}
