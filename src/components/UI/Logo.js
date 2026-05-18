import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import colors from '../../constants/colors';

const Logo = ({ width = wp(75), height = hp(8), style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* <Image
        source={require('../../assets/images/static/logos/MainLogo.png')}
        style={{ width, height, resizeMode: 'cover' }}
      /> */}
      <Label type="displayMd" color={colors.primary}>
        Expenzo.
      </Label>
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
