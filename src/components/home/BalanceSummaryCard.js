import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TrendingUp } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors, { gradients } from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';

const BalanceSummaryCard = ({ totalBalance = 0, monthlyChange = '+2.4%' }) => (
  <LinearGradient
    colors={gradients.primary}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.card}
  >
    <Label
      type="bodySmall"
      weight="medium"
      color="onPrimary"
      style={styles.label}
    >
      TOTAL BALANCE
    </Label>

    <CurrencyView
      amount={totalBalance}
      type="h4"
      weight="bold"
      color="onPrimary"
      style={styles.amount}
    />

    <View style={styles.badge}>
      <TrendingUp size={wp(3.5)} color={colors.onPrimary} strokeWidth={2} />

      <Label
        type="bodyXs"
        weight="semiBold"
        color="onPrimary"
        style={styles.badgeText}
      >
        {monthlyChange} this month
      </Label>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(1),
    borderRadius: borderRadius.xl,
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    gap: hp(0.8),
  },
  label: {
    opacity: 0.8,
    letterSpacing: 0.8,
  },
  amount: {
    color: colors.onPrimary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: borderRadius.full,
    marginTop: hp(0.5),
  },
  badgeText: {
    color: colors.onPrimary,
  },
});

export default BalanceSummaryCard;
