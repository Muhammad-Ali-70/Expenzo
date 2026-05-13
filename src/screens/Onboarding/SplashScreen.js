import { StyleSheet, View } from 'react-native';
import React from 'react';
import PrimaryLoader from '../../components/UI/PrimaryLoader.js';
import { colors } from '../../constants/colors';
import { Label } from '../../constants/globalstyle.js';
import Logo from '../../components/UI/Logo.js';

const SplashScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Logo />
      <PrimaryLoader marginTop={2} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
