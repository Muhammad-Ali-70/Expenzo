import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  ChevronRight,
  Moon,
  CircleDollarSign,
  Bell,
  Upload,
  CloudCog,
  User,
  Shield,
  HelpCircle,
  LogOut,
} from 'lucide-react-native';
import { Label, borderRadius } from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';

const ICONS = {
  moon: Moon,
  currency: CircleDollarSign,
  bell: Bell,
  upload: Upload,
  cloud: CloudCog,
  user: User,
  shield: Shield,
  help: HelpCircle,
  logout: LogOut,
};

const ICON_THEMES = {
  moon: { bg: '#EFF6FF', color: colors.bankAccount },
  currency: { bg: '#E6FFF5', color: colors.primary },
  bell: { bg: '#EFF6FF', color: colors.bankAccount },
  upload: { bg: '#FFF3E6', color: '#F97316' },
  cloud: { bg: '#F5F3FF', color: colors.savings },
  user: { bg: '#E6FFF5', color: colors.primary },
  shield: { bg: '#FFF3E6', color: '#F97316' },
  help: { bg: '#F5F3FF', color: colors.savings },
  logout: { bg: '#FFF0F0', color: colors.error },
};

const SettingsRow = ({
  iconName,
  title,
  subtitle,
  rightLabel,
  rightElement,
  onPress,
  showDivider = true,
}) => {
  const IconComponent = ICONS[iconName];
  const theme = ICON_THEMES[iconName] ?? {
    bg: colors.surfaceContainer,
    color: colors.primary,
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.row}>
      {IconComponent ? (
        <View style={[styles.iconBox, { backgroundColor: theme.bg }]}>
          <IconComponent size={wp(4.5)} color={theme.color} strokeWidth={1.8} />
        </View>
      ) : null}

      <View style={styles.textWrap}>
        <Label type="bodySmall" weight="semiBold" color="textMain">
          {title}
        </Label>
        {subtitle ? (
          <Label
            type="bodyXs"
            weight="regular"
            color="textMuted"
            style={styles.subtitle}
          >
            {subtitle}
          </Label>
        ) : null}
      </View>

      <View style={styles.right}>
        {rightLabel ? (
          <Label type="bodySmall" weight="semiBold" color="primary">
            {rightLabel}
          </Label>
        ) : null}
        {rightElement ?? (
          <ChevronRight
            size={wp(4)}
            color={colors.textMuted}
            strokeWidth={1.8}
          />
        )}
      </View>

      {showDivider && <View style={styles.divider} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
  },
  iconBox: {
    width: wp(9),
    height: wp(9),
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  textWrap: {
    flex: 1,
  },
  subtitle: {
    marginTop: hp(0.3),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: wp(16),
    right: 0,
    height: 0.5,
    backgroundColor: colors.outlineVariant,
  },
});

export default SettingsRow;
