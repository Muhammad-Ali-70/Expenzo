import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp, wp } from '../../constants/responsive';

const SignOutButton = ({ onPress }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.btn, shadowCard]}
    >
      <LogOut
        size={wp(4.5)}
        color={theme.error}
        strokeWidth={2}
        style={styles.icon}
      />
      <Label type="bodySmall" weight="semiBold" color="error">
        Sign Out
      </Label>
    </TouchableOpacity>
  );
};

const createStyles = t =>
  StyleSheet.create({
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp(2),
      marginHorizontal: wp(5),
      backgroundColor: t.surfacePrimary,
      borderRadius: borderRadius.xl,
      paddingVertical: hp(2),
      borderColor: '#FFDAD6',
      borderWidth: 1,
    },
    icon: {
      marginRight: wp(0.5),
    },
  });

export default SignOutButton;
