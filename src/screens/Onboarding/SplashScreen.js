import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

import PrimaryLoader from '../../components/ui/PrimaryLoader';
import Logo from '../../components/ui/Logo';
import BackImage from '../../assets/images/onboarding/splashbackground.png';

const SplashScreen = () => (
  <ImageBackground
    source={BackImage}
    style={styles.background}
    resizeMode="cover"
  >
    <Logo />
    <PrimaryLoader marginTop={2} />
  </ImageBackground>
);

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
