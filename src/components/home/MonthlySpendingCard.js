import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';

// Dummy sparkline points — replace with real data
const SPARKLINE_POINTS = [18, 30, 22, 35, 28, 40, 32, 45, 36, 50];

const buildSparklinePath = (points, width, height) => {
  const maxVal = Math.max(...points);
  const minVal = Math.min(...points);
  const range = maxVal - minVal || 1;
  const stepX = width / (points.length - 1);

  const coords = points.map((p, i) => ({
    x: i * stepX,
    y: height - ((p - minVal) / range) * height * 0.8 - height * 0.1,
  }));

  const d = coords
    .map((pt, i) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = coords[i - 1];
      const cpX = (prev.x + pt.x) / 2;
      return `C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
    })
    .join(' ');

  return { d, coords };
};

const Sparkline = ({ width = wp(30), height = hp(7) }) => {
  const { d } = buildSparklinePath(SPARKLINE_POINTS, width, height);

  return (
    <Svg width={width} height={height}>
      <Path
        d={d}
        stroke={colors.primary}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

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
      <Sparkline />
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
