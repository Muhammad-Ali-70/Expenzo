import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import SpendingLineChart from '../common/SpendingLineChart';
import { useThemeColors } from '@hooks/useThemeColors';

const MonthlySpendingCard = ({
  spendingAmount = 0,
  dailySpending = [],
  budgetPercent = 72,
  remainingLabel,
}) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
  <View style={styles.card}>
    <View>
      <Label type="bodyXs" weight="medium" color="textMuted">
        Monthly Spending
      </Label>
      <CurrencyView
        amount={spendingAmount}
        type="headingSmall"
        weight="bold"
        color="textMain"
        style={styles.amount}
      />
    </View>

    <SpendingLineChart dailySpending={dailySpending} />

    <View style={styles.progressSection}>
      <View style={styles.progressHeader}>
        <Label type="bodyXs" weight="medium" color="textMuted">
          Budget Progress
        </Label>
        <Label type="bodyXs" weight="semiBold" color="textMain">
          {budgetPercent}% used
        </Label>
      </View>
      <View style={styles.track}>
        <View
          style={[styles.fill, { width: `${Math.min(budgetPercent, 100)}%` }]}
        />
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
  </View>
  );
};

const createStyles = t => StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    backgroundColor: t.surfacePrimary,
    borderRadius: borderRadius.lg,
    padding: wp(5),
    gap: hp(2),
  },
  amount: {
    marginTop: hp(0.3),
  },
  progressSection: {
    gap: hp(0.7),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    height: hp(0.8),
    backgroundColor: t.surfaceContainer,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: t.primary,
    borderRadius: borderRadius.full,
  },
  remaining: {
    marginTop: hp(0.1),
  },
});

export default MonthlySpendingCard;
