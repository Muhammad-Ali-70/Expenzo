import React from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  Label,
  borderRadius,
  shadowPrimary,
} from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';

/**
 * ─────────────────────────────────────────────────────────────────
 *  VARIANT DEFINITIONS
 *  Each entry describes the full visual appearance of one variant.
 *  Add a new variant here — nothing else in the component changes.
 * ─────────────────────────────────────────────────────────────────
 *
 *  bg            Background color  (transparent for non-filled)
 *  borderColor   Border color      (undefined = no border)
 *  labelColor    Label `color` prop (key from colors or hex string)
 *  shadow        Whether to apply shadowPrimary
 */
const VARIANTS = {
  /** Solid filled green — primary CTA */
  primary: {
    bg: colors.primary,
    borderColor: undefined,
    labelColor: 'onPrimary',
    shadow: true,
  },

  /** Transparent with green border */
  outline: {
    bg: 'transparent',
    borderColor: colors.primary,
    labelColor: 'primary',
    shadow: false,
  },

  /** No background, no border — text-only */
  ghost: {
    bg: 'transparent',
    borderColor: undefined,
    labelColor: 'primary',
    shadow: false,
  },

  /** Destructive / danger action */
  danger: {
    bg: colors.error,
    borderColor: undefined,
    labelColor: 'onPrimary',
    shadow: false,
  },

  /** Danger outlined variant */
  dangerOutline: {
    bg: 'transparent',
    borderColor: colors.error,
    labelColor: 'error',
    shadow: false,
  },

  /** Secondary blue filled */
  secondary: {
    bg: colors.secondary,
    borderColor: undefined,
    labelColor: 'onPrimary',
    shadow: false,
  },

  /** Muted surface — less prominent action */
  surface: {
    bg: colors.surfaceContainer,
    borderColor: undefined,
    labelColor: 'primary',
    shadow: false,
  },
};

/**
 * SIZE DEFINITIONS
 * Controls height, horizontal padding, and label type/weight.
 */
const SIZES = {
  sm: {
    height: hp(5),
    px: wp(4),
    labelType: 'bodySmall',
    labelWeight: 'semiBold',
  },
  md: {
    height: hp(6),
    px: wp(5),
    labelType: 'bodySmall',
    labelWeight: 'semiBold',
  },
  lg: { height: hp(7), px: wp(6), labelType: 'body', labelWeight: 'semiBold' },
};

const PrimaryButton = ({
  variant = 'primary',
  size = 'lg',
  label,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = true,
  bg,
  borderColor,
  labelColor,
  radius = borderRadius.xl,
  onPress,
  style,
  labelStyle,
}) => {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.lg;

  const resolvedBg = bg ?? v.bg;
  const resolvedBorder =
    borderColor === 'none' ? undefined : borderColor ?? v.borderColor;
  const resolvedLabelColor = labelColor ?? v.labelColor;

  const isInteractive = !disabled && !loading;

  return (
    <TouchableOpacity
      onPress={isInteractive ? onPress : undefined}
      activeOpacity={isInteractive ? 0.82 : 1}
      style={[
        styles.base,
        v.shadow && !disabled && shadowPrimary,
        {
          height: s.height,
          paddingHorizontal: s.px,
          backgroundColor: resolvedBg,
          borderRadius: radius,
          borderWidth: resolvedBorder ? 1.5 : 0,
          borderColor: resolvedBorder,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: disabled ? 0.45 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            resolvedLabelColor === 'onPrimary'
              ? colors.white
              : colors[resolvedLabelColor] ?? resolvedLabelColor
          }
          size="small"
        />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          {label ? (
            <Label
              type={s.labelType}
              weight={s.labelWeight}
              color={resolvedLabelColor}
              style={[styles.label, labelStyle]}
            >
              {label}
            </Label>
          ) : null}

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: wp(2),
  },
  iconRight: {
    marginLeft: wp(2),
  },
});

export default PrimaryButton;
