import React, { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Label, borderRadius } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp, wp } from '../../constants/responsive';

const DebtNotesInput = ({ value, onChangeText }) => {
  const [focused, setFocused] = useState(false);
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const borderColor = focused ? theme.primary : theme.outlineVariant;

  return (
    <View style={styles.wrapper}>
      <Label
        type="bodySmall"
        weight="semiBold"
        color="textMain"
        style={styles.label}
      >
        Notes (Optional)
      </Label>

      <View style={[styles.inputRow, { borderColor }]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Add any additional notes about this debt..."
          placeholderTextColor={theme.textMuted}
          multiline
          numberOfLines={3}
          maxLength={200}
          textAlignVertical="top"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    wrapper: {
      marginBottom: hp(1),
    },
    label: {
      marginBottom: hp(0.7),
    },
    inputRow: {
      backgroundColor: t.surfacePrimary,
      borderWidth: 1,
      borderRadius: borderRadius.lg,
      minHeight: hp(12),
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
    },
    input: {
      flex: 1,
      color: t.textMain,
      fontSize: 14,
      paddingVertical: 0,
      minHeight: hp(9),
    },
  });

export default DebtNotesInput;
