import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { hp } from '../../constants/responsive';

const PrimaryLoader = ({ marginTop = 0, marginBottom = 0 }) => {
  return (
    <View
      style={[
        styles.container,
        { marginTop: hp(marginTop), marginBottom: hp(marginBottom) },
      ]}
    >
      <LottieView
        source={require('../../assets/animations/moneyLoader.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 120,
    height: 120,
  },
});

export default PrimaryLoader;
