import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AlignLeft } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../constants/fonts';
import { useThemeColors } from '@hooks/useThemeColors';

const NotesInput = ({ value, onChangeText }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
  <View style={styles.card}>
    <View style={styles.labelRow}>
      <AlignLeft size={wp(4)} color={theme.textMuted} strokeWidth={1.8} />
      <Label type="bodySmall" weight="medium" color="textMuted">
        Notes (Optional)
      </Label>
    </View>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Add some details about the purchase..."
      placeholderTextColor={theme.outlineVariant}
      multiline
      numberOfLines={3}
      maxLength={200}
      textAlignVertical="top"
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
    gap: hp(1),
    ...shadowCard,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  input: {
    fontSize: RFValue(13),
    fontFamily: fonts.regular,
    color: t.textMain,
    padding: 0,
    includeFontPadding: false,
    minHeight: hp(8),
  },
});

export default NotesInput;
