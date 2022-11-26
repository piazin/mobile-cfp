import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";

const { height } = Dimensions.get("window");

export function Modal({ show, close }) {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.containerModal,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <TouchableOpacity style={{ height: "100%" }} onPress={() => close()} />
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.indicator}></View>
        <Text>Deseja sair do app?</Text>

        <TouchableOpacity
          onPress={() => {
            close();
            BackHandler.exitApp();
          }}
        >
          <Text>Sim</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => close()}>
          <Text>Não</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: "#7E74F1",
    position: "absolute",
    width: "100%",
    height: "100%",
    elevation: 1,
  },
  modal: {
    backgroundColor: "#1e1e1e",
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 5,
  },
  indicator: {
    backgroundColor: "#ccc",
    borderRadius: 50,
    width: 50,
    height: 5,
    alignSelf: "center",
    marginTop: 5,
  },
});
