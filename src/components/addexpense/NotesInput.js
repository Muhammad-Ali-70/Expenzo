import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AlignLeft } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../constants/fonts';

const NotesInput = ({ value, onChangeText }) => (
  <View style={styles.card}>
    <View style={styles.labelRow}>
      <AlignLeft size={wp(4)} color={colors.textMuted} strokeWidth={1.8} />
      <Label type="bodySmall" weight="medium" color="textMuted">
        Notes (Optional)
      </Label>
    </View>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Add some details about the purchase..."
      placeholderTextColor={colors.outlineVariant}
      multiline
      numberOfLines={3}
      maxLength={200}
      textAlignVertical="top"
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    backgroundColor: colors.surfacePrimary,
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
    color: colors.textMain,
    padding: 0,
    includeFontPadding: false,
    minHeight: hp(8),
  },
});

export default NotesInput;
