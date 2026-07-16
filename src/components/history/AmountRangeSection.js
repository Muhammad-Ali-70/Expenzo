import React from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { borderRadius, Label } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import AppTextInput from '../ui/AppTextInput';

const AmountRangeSection = ({ minAmount, maxAmount, onMinChange, onMaxChange }) => {
  const theme = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceSecondary }]}>
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.label}>
            Min Amount
          </Label>
          <AppTextInput
            value={minAmount}
            onChangeText={onMinChange}
            placeholder="0"
            keyboardType="numeric"
            leftIconName="minus-circle"
            containerStyle={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.label}>
            Max Amount
          </Label>
          <AppTextInput
            value={maxAmount}
            onChangeText={onMaxChange}
            placeholder="No limit"
            keyboardType="numeric"
            leftIconName="plus-circle"
            containerStyle={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginTop: hp(1),
  },
  row: {
    flexDirection: 'row',
    gap: wp(3),
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    marginBottom: hp(0.8),
  },
  input: {
    marginBottom: 0,
  },
});

export default AmountRangeSection;
