import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';

const SettingsSection = ({ title, children }) => (
  <View style={styles.wrapper}>
    <Label
      type="bodyXs"
      weight="semiBold"
      color="textMuted"
      style={styles.sectionTitle}
    >
      {title}
    </Label>
    <View style={[styles.card, shadowCard]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: wp(5),
    marginBottom: hp(2.5),
  },
  sectionTitle: {
    letterSpacing: 0.8,
    marginBottom: hp(1),
  },
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
});

export default SettingsSection;
