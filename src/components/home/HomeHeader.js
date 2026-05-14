import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label } from '../../constants/globalstyle';

const HomeHeader = ({ avatarSource, onBellPress }) => (
  <View style={styles.container}>
    <View style={styles.left}>
      {/* <View style={styles.avatar}>
        {avatarSource ? (
          <Image source={avatarSource} style={styles.avatarImage} />
        ) : (
          <Label type="bodySmall" weight="bold" color="onPrimary">
            FT
          </Label>
        )}
      </View> */}
      <Label type="body" weight="bold" color="primary">
        Expenzo.
      </Label>
    </View>

    <TouchableOpacity
      onPress={onBellPress}
      activeOpacity={0.7}
      style={styles.bell}
    >
      <Bell size={wp(5.5)} color={colors.textMuted} strokeWidth={1.8} />
    </TouchableOpacity>
  </View>
);

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
  avatar: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  bell: {
    padding: wp(1.5),
  },
});

export default HomeHeader;
