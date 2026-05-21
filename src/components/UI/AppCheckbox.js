import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

import colors from '../../constants/colors';
import { wp } from '../../constants/responsive';
import { borderRadius } from '../../constants/globalstyle';

const AppCheckbox = ({ checked = false, onToggle, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={[styles.box, checked && styles.checked, style]}
    >
      {checked ? (
        <Check size={wp(3.2)} color={colors.onPrimary} strokeWidth={3} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: wp(5),
    height: wp(5),
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfacePrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export default AppCheckbox;
