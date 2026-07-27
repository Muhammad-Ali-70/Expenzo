import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowRightLeft } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';

const TransferLink = ({ onPress }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ArrowRightLeft
        size={wp(4.5)}
        color={theme.primary}
        strokeWidth={1.8}
      />
      <Label type="bodySmall" weight="regular" color="primary" underline>
        Transfer between accounts
      </Label>
    </TouchableOpacity>
  );
};

const createStyles = t =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp(2),
      paddingVertical: hp(1),
      marginHorizontal: wp(5),
    },
  });

export default TransferLink;
