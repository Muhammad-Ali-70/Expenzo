import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, shadowPrimary } from '../../constants/globalstyle';

const AuthHeader = ({ showBack = false, onBack, style }) => (
  <View style={[styles.container, style]}>
    {showBack ? (
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={styles.backBtn}
      >
        <ChevronLeft size={wp(5.5)} color={colors.primary} strokeWidth={2} />
      </TouchableOpacity>
    ) : (
      <View style={styles.backBtn} />
    )}

    <Label type="body" weight="bold" color="primary">
      Expenzo.
    </Label>

    <View style={styles.backBtn} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
    backgroundColor: colors.background,
    ...shadowPrimary,
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthHeader;
