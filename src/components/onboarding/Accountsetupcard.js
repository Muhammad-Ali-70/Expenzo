import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import {
  borderRadius,
  Label,
  shadowPrimary,
} from '../../constants/globalstyle';
import colors from '../../constants/colors';
import PaymentIcon from '../common/Paymenticon';
import CurrencyInput from '../common/CurrencyInput';

const AccountSetupCard = ({
  iconName = 'wallet',
  iconColor = colors.white,
  iconBg = colors.primary,
  name,
  description,
  value,
  onChangeText,
  currency,
  isActive = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[styles.card, isActive && styles.cardActive, style]}
    >
      <View style={styles.row}>
        <PaymentIcon
          name={iconName}
          color={iconColor}
          backgroundColor={iconBg}
          containerSize={wp(11)}
          radius={borderRadius.md}
        />

        <View style={styles.info}>
          <Label type="bodySmall" weight="semiBold" color="textMain">
            {name}
          </Label>
        </View>

        <CurrencyInput
          value={value}
          onChangeText={onChangeText}
          currency={currency}
          label="Set Balance"
          showLabel
        />
      </View>

      {isActive && (
        <View style={styles.tooltip}>
          <View style={styles.tooltipDivider} />
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.xl,
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
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
  tooltip: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: wp(4),
    paddingBottom: hp(1.6),
  },
  tooltipDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginBottom: hp(1.2),
  },
  tooltipText: {
    lineHeight: 18,
  },
});

export default AccountSetupCard;
