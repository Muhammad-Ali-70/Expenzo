import React from 'react';
import { Text as RNText } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from './colors';
import fonts from './fonts';
import { wp } from './responsive';

// Border Radius — from design system
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const borderRadiusPrimary = borderRadius.md;
export const borderRadiusSecondary = borderRadius.sm;
export const iconSizePrimary = wp(4);

export const shadowPrimary = {
  shadowColor: '#0b1c30',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 4,
};

export const shadowCard = {
  shadowColor: '#0b1c30',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 4,
};

// Typography — matched to design system scale
export const TEXT_TYPES = {
  displayLg: RFValue(32), // display-lg
  displayMd: RFValue(24), // display-md
  h1: RFValue(28),
  h2: RFValue(24),
  h3: RFValue(20), // title-lg
  h4: RFValue(18),
  h5: RFValue(16),
  body: RFValue(14), // body-lg
  bodySmall: RFValue(12), // body-md
  bodyXs: RFValue(10), // label-sm
  caption: RFValue(9),
};

const FONT_WEIGHTS = {
  regular: fonts.regular,
  medium: fonts.medium,
  semiBold: fonts.semiBold,
  bold: fonts.bold,
  extraBold: fonts.extraBold,
  black: fonts.black,
};

const DEFAULT_WEIGHTS = {
  displayLg: 'extraBold',
  displayMd: 'bold',
  h1: 'extraBold',
  h2: 'bold',
  h3: 'semiBold',
  h4: 'semiBold',
  h5: 'semiBold',
  body: 'regular',
  bodySmall: 'regular',
  bodyXs: 'semiBold', // label-sm is semiBold per design system
  caption: 'regular',
};

export const Label = ({
  children,
  type = 'body',
  weight,
  color = 'textMain',
  underline = false,
  style,
  transformText, // 👈 add this
  ...props
}) => {
  const fontSize = TEXT_TYPES[type] || TEXT_TYPES.body;
  const fontWeight = weight || DEFAULT_WEIGHTS[type] || 'regular';
  const fontFamily = FONT_WEIGHTS[fontWeight] || fonts.regular;
  const textColor = colors[color] || color;

  const formatText = text => {
    if (!text) return text;

    switch (transformText) {
      case 'uppercase':
        return text.toUpperCase();
      case 'capitalize':
        return text.charAt(0).toUpperCase() + text.slice(1);
      case 'lowercase':
        return text.toLowerCase();
      default:
        return text;
    }
  };

  return (
    <RNText
      style={[
        {
          fontFamily,
          fontSize,
          color: textColor,
          ...(underline && { textDecorationLine: 'underline' }),
        },
        style,
      ]}
      {...props}
    >
      {formatText(children)}
    </RNText>
  );
};
