import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import LottieView from 'lottie-react-native';

import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label, shadowPrimary } from '../../constants/globalstyle';

const AuthHeader = ({ showBack = false, onBack, style }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={[styles.container, style]}>
      {showBack ? (
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <ChevronLeft size={wp(5.5)} color={theme.primary} strokeWidth={2} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtn} />
      )}

      <View style={styles.titleRow}>
        {/* <LottieView
          source={require('../../assets/animations/RollingCoins.json')}
          autoPlay
          loop
          speed={0.5}
          style={styles.lottie}
        /> */}

        <Label type="body" weight="bold" color="primary">
          Expenzo.
        </Label>
      </View>

      <View style={styles.backBtn} />
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
    backgroundColor: t.background,
    ...shadowPrimary,
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lottie: {
    width: wp(8),
    height: wp(8),
    marginRight: wp(1.5),
  },
});

export default AuthHeader;
