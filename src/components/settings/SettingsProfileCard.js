import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Pencil } from 'lucide-react-native';
import { Label, borderRadius } from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';

const SettingsProfileCard = ({
  name,
  email,
  isPremium,
  avatarSource,
  onEditPress,
}) => (
  <View style={styles.container}>
    <View style={styles.avatarWrap}>
      {avatarSource ? (
        <Image source={avatarSource} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}>
          <Label type="h4" weight="bold" color="onPrimary">
            {name?.charAt(0) ?? 'U'}
          </Label>
        </View>
      )}
      <TouchableOpacity
        onPress={onEditPress}
        activeOpacity={0.8}
        style={styles.editBadge}
      >
        <Pencil size={wp(3.5)} color={colors.onPrimary} strokeWidth={2} />
      </TouchableOpacity>
    </View>

    <Label type="h3" weight="bold" color="textMain" style={styles.name}>
      {name}
    </Label>
    <Label
      type="bodySmall"
      weight="regular"
      color="textMuted"
      style={styles.email}
    >
      {email}
    </Label>

    {isPremium && (
      <View style={styles.badge}>
        <Label
          type="bodyXs"
          weight="semiBold"
          color="primary"
          style={styles.badgeText}
        >
          PREMIUM MEMBER
        </Label>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: hp(1.5),
  },
  avatar: {
    width: wp(22),
    height: wp(22),
    borderRadius: borderRadius.xl,
  },
  avatarFallback: {
    width: wp(22),
    height: wp(22),
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: -wp(1),
    right: -wp(1),
    width: wp(7.5),
    height: wp(7.5),
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  name: {
    marginBottom: hp(0.4),
  },
  email: {
    marginBottom: hp(1.2),
  },
  badge: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.6),
    backgroundColor: colors.surfaceContainerLow,
  },
  badgeText: {
    letterSpacing: 0.6,
  },
});

export default SettingsProfileCard;
