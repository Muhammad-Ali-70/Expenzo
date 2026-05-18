import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import PaymentIcon from '../common/Paymenticon';

const RecentActivityItem = ({
  iconName,
  iconColor,
  iconBg,
  title,
  subtitle,
  amount,
  onPress,
}) => {
  const isPositive = amount >= 0;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.row}>
      <PaymentIcon
        name={iconName}
        backgroundColor={iconBg}
        color={iconColor}
        containerSize={wp(11)}
        size={wp(5.5)}
      />

      <View style={styles.info}>
        <Label type="bodySmall" weight="semiBold" color="textMain">
          {title}
        </Label>
        <Label type="bodyXs" weight="regular" color="textMuted">
          {subtitle}
        </Label>
      </View>

      <CurrencyView
        amount={Math.abs(amount)}
        type="bodySmall"
        weight="semiBold"
        positive={isPositive}
        negative={!isPositive}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.lg,
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    gap: wp(3),
  },
  info: {
    flex: 1,
    gap: hp(0.3),
  },
});

export default RecentActivityItem;
