// globalstyle.js - Update the import
import React from 'react';
import { Text as RNText } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from './colors';
import fonts from './fonts'; // Changed from { FONTS }
import { wp } from './responsive';

export const borderRadiusPrimary = 8;
export const borderRadiusSecondary = 5;
export const iconSizePrimary = wp(4);

export const shadowPrimary = {
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 4,
};

export const TEXT_TYPES = {
  h1: RFValue(28), // Large titles
  h2: RFValue(24), // Section headings
  h3: RFValue(22), // Subheadings
  h4: RFValue(20), // Smaller headings
  h5: RFValue(18), // Minor headings
  body: RFValue(16), // Default body text
  bodySmall: RFValue(14), // Small body text
  bodyXs: RFValue(12), // Extra small text
  caption: RFValue(10), // Captions or metadata
};

const FONT_WEIGHTS = {
  regular: fonts.regular, // Changed from FONTS
  medium: fonts.medium, // Changed from FONTS
  semiBold: fonts.semiBold, // Changed from FONTS
  bold: fonts.bold, // Changed from FONTS
  extraBold: fonts.extraBold, // Changed from FONTS
  black: fonts.black, // Changed from FONTS
};

const DEFAULT_WEIGHTS = {
  h1: 'extraBold',
  h2: 'bold',
  h3: 'semiBold',
  h4: 'semiBold',
  h5: 'semiBold',
  body: 'regular',
  bodySmall: 'regular',
  bodyXs: 'regular',
  caption: 'regular',
};

export const Label = ({
  children,
  type = 'body',
  weight,
  color = 'black',
  underline = false,
  style,
  ...props
}) => {
  const fontSize = TEXT_TYPES[type] || TEXT_TYPES.body;
  const fontWeight = weight || DEFAULT_WEIGHTS[type] || 'regular';
  const fontFamily = FONT_WEIGHTS[fontWeight] || fonts.regular; // Changed from FONTS
  const textColor = colors[color] || color;

  const textStyle = {
    fontFamily,
    fontSize,
    color: textColor,
    ...(underline && { textDecorationLine: 'underline' }),
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};
