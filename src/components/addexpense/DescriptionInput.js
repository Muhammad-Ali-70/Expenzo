import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../constants/fonts';
import { useThemeColors } from '@hooks/useThemeColors';

const DescriptionInput = ({ value, onChangeText }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
  <View style={styles.card}>
    <Label type="bodyXs" weight="medium" color="textMuted">
      What's this for?
    </Label>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Lunch at Cafe Blue"
      placeholderTextColor={theme.outlineVariant}
      maxLength={80}
      returnKeyType="done"
    />
  </View>
  );
};

const createStyles = t => StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    backgroundColor: t.surfacePrimary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    gap: hp(0.8),
    ...shadowCard,
  },
  input: {
    fontSize: RFValue(15),
    fontFamily: fonts.regular,
    color: t.textMain,
    padding: 0,
    includeFontPadding: false,
  },
});

export default DescriptionInput;
