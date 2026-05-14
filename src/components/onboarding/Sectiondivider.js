import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';

const SectionDivider = ({ label, style }) => {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.line} />
      <Label
        type="bodyXs"
        weight="semiBold"
        color="textMuted"
        style={styles.label}
      >
        {label}
      </Label>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginVertical: hp(2),
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
  },
  label: {
    marginHorizontal: wp(3),
    letterSpacing: 1.2,
  },
});

export default SectionDivider;
