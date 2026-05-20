import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { ACTIVE_CURRENCY, sanitiseInput } from '../../utils/currency';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../constants/fonts';

const CurrencyInput = ({
  value,
  onChangeText,
  currency = ACTIVE_CURRENCY,
  label = 'Set Balance',
  showLabel = true,
  placeholder,
  containerStyle,
  inputStyle,
  ...rest
}) => {
  const derivedPlaceholder =
    placeholder ??
    (currency.decimals > 0 ? `0.${'0'.repeat(currency.decimals)}` : '0');

  const handleChange = text => {
    const clean = sanitiseInput(text, currency);
    onChangeText?.(clean);
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {showLabel && (
        <Label
          type="bodyXs"
          weight="medium"
          color="textMuted"
          style={styles.label}
        >
          {label}
        </Label>
      )}

      <View style={styles.row}>
        <Label type="bodySmall" color="black" style={styles.symbol}>
          {currency.symbol}
          {'  '}
        </Label>

        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={handleChange}
          placeholder={derivedPlaceholder}
          placeholderTextColor={colors.outlineVariant}
          keyboardType={currency.decimals > 0 ? 'decimal-pad' : 'number-pad'}
          maxLength={12}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-end',
    minWidth: wp(20),
  },
  label: {
    marginBottom: hp(0.3),
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  symbol: {
    includeFontPadding: false,
  },
  input: {
    fontSize: RFValue(15),
    fontFamily: fonts.bold,
    color: colors.primary,
    padding: 0,
    minWidth: wp(12),
    textAlign: 'right',
    includeFontPadding: false,
  },
});

export default CurrencyInput;
