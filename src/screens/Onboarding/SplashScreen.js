import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PrimaryLoader from '../../components/ui/PrimaryLoader';
import Logo from '../../components/ui/Logo';
import BackImage from '../../assets/images/onboarding/splashbackground.png';

import useAppStore from '../../store/useAppStore';

const SplashScreen = () => {
  const navigation = useNavigation();
  const hasCompletedOnboarding = useAppStore(s => s.hasCompletedOnboarding);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(hasCompletedOnboarding ? 'DatabaseTest' : 'AuthStack');
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding, navigation]);

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
