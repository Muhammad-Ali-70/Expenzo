import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';

const SettingsRow = ({
  icon,
  title,
  subtitle,
  rightLabel,
  rightElement,
  onPress,
  showDivider = true,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.row}>
    <View style={styles.iconWrap}>{icon}</View>
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
        <ChevronRight size={wp(4)} color={colors.textMuted} strokeWidth={1.8} />
      )}
    </View>
    {showDivider && <View style={styles.divider} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
  },
  iconWrap: {
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
