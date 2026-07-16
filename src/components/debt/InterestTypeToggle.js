import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp } from '../../constants/responsive';
import ToggleButtons from '../ui/ToggleButtons';

const InterestTypeToggle = ({ value, onChange }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const options = [
    { value: 'none', label: 'None' },
    { value: 'simple', label: 'Simple' },
    { value: 'compound', label: 'Compound' },
  ];

  return (
    <View style={styles.container}>
      <Label type="bodySmall" weight="semiBold" color="textMain" style={styles.label}>
        Interest Type
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

export default InterestTypeToggle;
