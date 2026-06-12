import React from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import SpendingBarChart from '../common/SpendingBarChart';

const BudgetProgressBar = ({ percent = 72, remainingLabel }) => (
  <View style={styles.progressSection}>
    <View style={styles.progressHeader}>
      <Label type="bodyXs" weight="medium" color="textMuted">
        Budget Progress
      </Label>
      <Label type="bodyXs" weight="semiBold" color="textMain">
        {percent}% used
      </Label>
    </View>
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(percent, 100)}%` }]} />
    </View>
    {remainingLabel && (
      <Label
        type="bodyXs"
        weight="regular"
        color="textMuted"
        style={styles.remaining}
      >
        {remainingLabel}
      </Label>
    )}
  </View>
);

const MonthlySpendingCard = ({
  spendingAmount = 0,
  dailySpending = [],
  budgetPercent = 72,
  remainingLabel,
}) => (
  <View style={styles.card}>
    <View style={styles.top}>
      <View>
        <Label type="bodyXs" weight="medium" color="textMuted">
          Monthly Spending
        </Label>
        <CurrencyView
          amount={spendingAmount}
          type="headingSmall"
          weight="bold"
          color="textMain"
          style={styles.spendingAmount}
        />
      </View>
    </View>

    <View style={styles.chartContainer}>
      <SpendingBarChart dailySpending={dailySpending} />
    </View>

    <BudgetProgressBar
      percent={budgetPercent}
      remainingLabel={remainingLabel}
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.lg,
    padding: wp(5),
    gap: hp(2),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spendingAmount: {
    marginTop: hp(0.3),
  },
  chartContainer: {
    marginTop: hp(0.5),
  },
  progressSection: {
    gap: hp(0.8),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    height: hp(0.9),
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  remaining: {
    marginTop: hp(0.2),
  },
});

export default MonthlySpendingCard;
