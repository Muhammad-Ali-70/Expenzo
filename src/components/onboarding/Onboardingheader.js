import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Label, shadowPrimary } from '../../constants/globalstyle';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const OnboardingHeader = ({ title = 'Expenzo.', showSkip = true, onSkip }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Label type="h4" weight="bold" color="primary">
        {title}
      </Label>

      {showSkip && (
        <TouchableOpacity
          onPress={onSkip}
          activeOpacity={0.6}
          hitSlop={styles.hitSlop}
        >
          <Label type="bodySmall" weight="medium" color="textMuted">
            SKIP
          </Label>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(1),
    backgroundColor: t.background,
    ...shadowPrimary,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 16,
    right: 4,
  },
});

export default OnboardingHeader;
