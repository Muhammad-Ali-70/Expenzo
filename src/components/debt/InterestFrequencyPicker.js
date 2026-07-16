import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp } from '../../constants/responsive';
import ToggleButtons from '../ui/ToggleButtons';

const InterestFrequencyPicker = ({ value, onChange, disabled = false }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const options = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'annually', label: 'Annually' },
  ];

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <Label
        type="bodySmall"
        weight="semiBold"
        color={disabled ? 'textMuted' : 'textMain'}
        style={styles.label}
      >
        Interest Frequency
      </Label>
      <ToggleButtons
        options={options}
        activeValue={value}
        onSelect={onChange}
        disabled={disabled}
      />
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    container: {
      marginBottom: hp(1),
    },
    label: {
      marginBottom: hp(0.7),
    },
    disabled: {
      opacity: 0.5,
    },
  });

export default InterestFrequencyPicker;
