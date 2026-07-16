import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp } from '../../constants/responsive';
import ToggleButtons from '../ui/ToggleButtons';

const ReminderChannelToggle = ({ value, onChange }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const options = [
    { value: 'email', label: 'Email' },
    { value: 'push', label: 'Push' },
    { value: 'both', label: 'Both' },
  ];

  const getToggleValue = (channels) => {
    if (!channels || channels.length === 0) return 'email';
    if (channels.length === 2) return 'both';
    return channels[0];
  };

  const handleSelect = (selected) => {
    if (selected === 'both') {
      onChange(['email', 'push']);
    } else {
      onChange([selected]);
    }
  };

  return (
    <View style={styles.container}>
      <Label type="bodySmall" weight="semiBold" color="textMain" style={styles.label}>
        Reminder Channels
      </Label>
      <ToggleButtons
        options={options}
        activeValue={getToggleValue(value)}
        onSelect={handleSelect}
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

export default ReminderChannelToggle;
