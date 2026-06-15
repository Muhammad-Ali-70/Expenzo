import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label, shadowPrimary } from '../../constants/globalstyle';

const HomeHeader = ({ avatarSource, onBellPress }) => {
  const theme = useThemeColors();

  return (
    <View style={[styles.container, shadowPrimary]}>
      <View style={styles.left}>
        <Label type="body" weight="bold" color="primary">
          Expenzo.
        </Label>
      </View>

      <TouchableOpacity
        onPress={onBellPress}
        activeOpacity={0.7}
        style={styles.bell}
      >
        <Bell size={wp(5.5)} color={theme.textMuted} strokeWidth={1.8} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  bell: {
    padding: wp(1.5),
  },
});

export default HomeHeader;
