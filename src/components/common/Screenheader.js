import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { X, ArrowLeft } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label, shadowPrimary } from '../../constants/globalstyle';

const ScreenHeader = ({ title, onBack, backIcon = 'close', rightElement }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const BackIcon = backIcon === 'arrow' ? ArrowLeft : X;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.iconBtn}
        activeOpacity={0.7}
      >
        <BackIcon size={wp(5.5)} color={theme.textMain} strokeWidth={2} />
      </TouchableOpacity>

      <Label type="bodyMedium" weight="bold" color="textMain">
        {title}
      </Label>

      <View style={styles.right}>
        {rightElement ?? <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp(5),
      paddingTop: hp(2),
      paddingBottom: hp(1.5),
      backgroundColor: t.background,
      ...shadowPrimary,
    },
    iconBtn: {
      padding: wp(1),
    },
    right: {
      minWidth: wp(9),
      alignItems: 'flex-end',
    },
    placeholder: {
      width: wp(9),
      height: wp(9),
    },
  });

export default ScreenHeader;
