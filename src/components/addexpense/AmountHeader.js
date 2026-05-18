import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label } from '../../constants/globalstyle';
import { ACTIVE_CURRENCY, sanitiseInput } from '../../utils/currency';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../constants/fonts';

const AmountHeader = ({ value, onChangeText, currency = ACTIVE_CURRENCY }) => {
  const handleChange = text => onChangeText(sanitiseInput(text, currency));

  return (
    <View style={styles.container}>
      <Label
        type="bodyXs"
        weight="medium"
        color="textMuted"
        style={styles.label}
      >
        AMOUNT SPENT
      </Label>
      <View style={styles.row}>
        <Label
          type="displayMedium"
          weight="bold"
          color="primary"
          style={styles.symbol}
        >
          {currency.symbol}
        </Label>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder={
            currency.decimals > 0 ? `0.${'0'.repeat(currency.decimals)}` : '0'
          }
          placeholderTextColor={colors.textMain}
          keyboardType={currency.decimals > 0 ? 'decimal-pad' : 'number-pad'}
          maxLength={12}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: hp(3.5),
    gap: hp(0.8),
  },
  label: {
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  symbol: {
    lineHeight: undefined,
  },
  input: {
    fontSize: RFValue(36),
    fontFamily: fonts.bold,
    color: colors.textMain,
    minWidth: wp(30),
    padding: 0,
    includeFontPadding: false,
  },
});

export default AmountHeader;
