import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label, borderRadius } from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';

const SettingsProfileCard = ({ name, email, isPremium, avatarSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarFallback}>
          <Label type="h4" weight="bold" color="onPrimary">
            {name?.charAt(0)?.toUpperCase() ?? 'U'}
          </Label>
        </View>
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
};

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
  avatarFallback: {
    width: wp(22),
    height: wp(22),
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
