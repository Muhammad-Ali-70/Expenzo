import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TrendingUp } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import { useThemeColors } from '@hooks/useThemeColors';

const ProgressBar = ({ percent, color, s }) => (
  <View style={s.track}>
    <View
      style={[
        s.fill,
        { width: `${Math.min(percent, 100)}%`, backgroundColor: color },
      ]}
    />
  </View>
);

const TotalSpendingCard = ({
  spentAmount = 0,
  limitAmount = 0,
  remainingAmount = 0,
  dailyAverage = 0,
  percentUsed = 0,
}) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <LinearGradient
      colors={['#006c49', '#00a86b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <Label
          type="bodyXs"
          weight="medium"
          color="onPrimary"
          style={styles.sectionLabel}
        >
          TOTAL SPENDING
        </Label>
        <View style={styles.badge}>
          <TrendingUp size={wp(3.2)} color={theme.onPrimary} strokeWidth={2} />
          <Label type="bodyXs" weight="semiBold" color="onPrimary">
            {percentUsed}%
          </Label>
        </View>
      </View>

      <CurrencyView
        amount={spentAmount}
        type="h4"
        weight="bold"
        color="onPrimary"
      />

      <View style={styles.progressRow}>
        <Label
          type="bodyXs"
          weight="medium"
          color="onPrimary"
          style={styles.dimmed}
        >
          Budget Progress
        </Label>
        <CurrencyView
          amount={limitAmount}
          type="bodyXs"
          weight="medium"
          color="onPrimary"
          style={styles.dimmed}
          suffix=" Limit"
        />
      </View>

      <ProgressBar percent={percentUsed} color="rgba(255,255,255,0.9)" s={styles} />

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Label
            type="bodyXs"
            weight="regular"
            color="onPrimary"
            style={styles.dimmed}
          >
            Remaining
          </Label>
          <CurrencyView
            amount={remainingAmount}
            type="bodyMedium"
            weight="bold"
            color="onPrimary"
          />
        </View>
        <View style={styles.stat}>
          <Label
            type="bodyXs"
            weight="regular"
            color="onPrimary"
            style={styles.dimmed}
          >
            Daily Average
          </Label>
          <CurrencyView
            amount={dailyAverage}
            type="bodyMedium"
            weight="bold"
            color="onPrimary"
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const createStyles = t => StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    borderRadius: borderRadius.xl,
    paddingHorizontal: wp(6),
    paddingVertical: hp(3),
    gap: hp(1.2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    opacity: 0.8,
    letterSpacing: 0.8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: borderRadius.full,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
  },
  dimmed: {
    opacity: 0.75,
  },
  track: {
    height: hp(0.9),
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp(10),
    marginTop: hp(0.5),
  },
  stat: {
    gap: hp(0.3),
  },
});

export default TotalSpendingCard;
