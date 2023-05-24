import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

export function SplashScreen({ route, navigation }) {
  const { nextScreenName } = route.params;

  const [fontLoad, setFontLoad] = useState(true);
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

  useEffect(() => {
    setFontLoad(fontsLoaded ? false : true);
  }, [fontsLoaded]);

  const handleFinishAnimation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: nextScreenName }],
    });
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splashscreen.json')}
        autoPlay={true}
        loop={fontLoad}
        duration={1500}
        onAnimationFinish={handleFinishAnimation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#7E74F1',
    alignItems: 'center',
  },
});
