import { StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import PrimaryLoader from '../../components/ui/PrimaryLoader.js';
import Logo from '../../components/ui/Logo.js';
import BackImage from '../../assets/images/onboarding/splashbackground.png';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <ImageBackground
      source={BackImage}
      style={styles.background}
      resizeMode="cover"
    >
      <Logo />
      <PrimaryLoader marginTop={2} />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
