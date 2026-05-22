import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import PaymentIcon from '../common/Paymenticon';
import { ACCOUNT_TYPE_META } from '../../constants/theme/accountMeta';

const AccountTag = ({ label, type }) => {
  const meta = ACCOUNT_TYPE_META[type] ?? ACCOUNT_TYPE_META.wallet;
  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: meta.iconBg,
          borderColor: meta.iconColor,
        },
      ]}
    >
      <Label type="caption" weight="semiBold" style={{ color: meta.iconColor }}>
        {label}
      </Label>
    </View>
  );
};

const RecentActivityItem = ({
  iconName,
  iconColor,
  iconBg,
  title,
  subtitle,
  amount,
  accountLabel,
  accountType,
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
        <View style={styles.titleRow}>
          <Label
            type="bodySmall"
            weight="semiBold"
            color="textMain"
            numberOfLines={1}
            style={styles.titleText}
          >
            {title}
          </Label>
          {accountLabel ? (
            <AccountTag label={accountLabel} type={accountType} />
          ) : null}
        </View>

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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    flexShrink: 1,
  },
  titleText: {
    flexShrink: 1,
  },
  tag: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    flexShrink: 0,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
  },
});

export default RecentActivityItem;
