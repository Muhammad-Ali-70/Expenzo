import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../../constants/responsive';
import {
  borderRadius,
  Label,
  shadowPrimary,
} from '../../../constants/globalstyle';
import colors from '../../../constants/colors';

/**
 * CardShell — the outer touchable card wrapper shared by all card types.
 * Handles active border, shadow, and optional tooltip footer.
 */
const CardShell = ({
  isActive,
  onPress,
  style,
  children,
  description,
  footer, // optional extra node rendered below divider (e.g. extra banks)
}) => (
  <TouchableOpacity
    activeOpacity={0.88}
    onPress={onPress}
    style={[styles.card, isActive && styles.cardActive, style]}
  >
    {children}

    {isActive && description && (
      <View style={styles.tooltip}>
        <View style={styles.divider} />
        <Label
          type="bodyXs"
          weight="regular"
          color="textMuted"
          style={styles.tooltipText}
        >
          {description}
        </Label>
      </View>
    )}

    {footer}
  </TouchableOpacity>
);

export const CardRow = ({ children }) => (
  <View style={styles.row}>{children}</View>
);

export const CardInfo = ({ children }) => (
  <View style={styles.info}>{children}</View>
);

export const CardRight = ({ children }) => (
  <View style={styles.rightCol}>{children}</View>
);

export const SectionDividerLine = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.xl,
    marginHorizontal: wp(5),
    marginBottom: hp(0.5),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
    ...shadowPrimary,
  },
  cardActive: {
    borderColor: colors.primary,
    shadowOpacity: 0.13,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  info: {
    flex: 1,
    marginLeft: wp(3),
    marginRight: wp(2),
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: hp(0.6),
  },
  tooltip: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: wp(4),
    paddingBottom: hp(1.6),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginBottom: hp(1.2),
  },
  tooltipText: {
    lineHeight: 18,
  },
});

export default CardShell;
