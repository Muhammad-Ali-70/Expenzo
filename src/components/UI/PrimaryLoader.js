import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../constants/colors';
import { hp } from '../../constants/responsive';

const PrimaryLoader = ({ marginTop = 0, marginBottom = 0, flex = 0 }) => {
  return (
    <View
      style={[
        styles.container,
        { marginTop: hp(marginTop), marginBottom: hp(marginBottom), flex },
      ]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrimaryLoader;
