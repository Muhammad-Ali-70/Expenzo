import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp } from '../../constants/responsive';
import ToggleButtons from '../ui/ToggleButtons';

const ReminderFrequencyToggle = ({ value, onChange }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const options = [
    { value: 'once', label: 'Once' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'until_due', label: 'Until Due' },
  ];

  return (
    <View style={styles.container}>
      <Label type="bodySmall" weight="semiBold" color="textMain" style={styles.label}>
        Reminder Frequency
      </Label>
      <ToggleButtons
        options={options}
        activeValue={value}
        onSelect={onChange}
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
  });

export default ReminderFrequencyToggle;
