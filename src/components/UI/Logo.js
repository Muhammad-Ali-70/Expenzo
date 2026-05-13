import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { wp, hp } from '../../constants/responsive';

const Logo = ({ width = wp(75), height = hp(8), style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../../assets/images/static/logos/MainLogoFull.png')}
        style={{ width, height, resizeMode: 'cover' }}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
