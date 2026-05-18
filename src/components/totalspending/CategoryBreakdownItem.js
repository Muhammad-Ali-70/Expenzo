import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import PaymentIcon from '../common/Paymenticon';
import CurrencyView from '../common/CurrencyView';

// status: 'normal' | 'warning' | 'overspent'
const getStatus = percent => {
  if (percent >= 100) return 'overspent';
  if (percent >= 85) return 'warning';
  return 'normal';
};

const STATUS_BAR_COLOR = {
  normal: colors.bankAccount,
  warning: '#F59E0B',
  overspent: colors.error,
};

const StatusLabel = ({ percent, status }) => {
  if (status === 'overspent') {
    return (
      <View style={styles.overspentWrap}>
        <Label type="bodyXs" weight="semiBold" color="error">
          Overspent
        </Label>
        <Label type="bodySmall" weight="bold" color="error">
          {percent}%
        </Label>
      </View>
    );
  }
  if (status === 'warning') {
    return (
      <View style={styles.warningWrap}>
        <AlertTriangle size={wp(3.5)} color="#F59E0B" strokeWidth={2} />
        <Label type="bodySmall" weight="bold" style={{ color: '#F59E0B' }}>
          {percent}%
        </Label>
      </View>
    );
  }
  return (
    <Label type="bodySmall" weight="bold" color="textMain">
      {percent}%
    </Label>
  );
};

const CategoryBreakdownItem = ({
  iconName,
  iconBg,
  iconColor,
  label,
  spentAmount,
  limitAmount,
  barColor,
}) => {
  const percent = Math.round((spentAmount / limitAmount) * 100);
  const status = getStatus(percent);
  const resolvedBarColor = barColor ?? STATUS_BAR_COLOR[status];
  const leftAccent = status !== 'normal' ? resolvedBarColor : 'transparent';

  return (
    <View style={[styles.card, { borderLeftColor: leftAccent }]}>
      <View style={styles.topRow}>
        <PaymentIcon
          name={iconName}
          backgroundColor={iconBg}
          color={iconColor}
          containerSize={wp(11)}
          size={wp(5.2)}
        />

        <View style={styles.info}>
          <Label type="bodySmall" weight="semiBold" color="textMain">
            {label}
          </Label>
          <View style={styles.amountRow}>
            <CurrencyView
              amount={spentAmount}
              type="bodyXs"
              weight="regular"
              color="textMuted"
            />
            <Label type="bodyXs" weight="regular" color="textMuted">
              {' '}
              of{' '}
            </Label>
            <CurrencyView
              amount={limitAmount}
              type="bodyXs"
              weight="regular"
              color="textMuted"
            />
          </View>
        </View>

        <StatusLabel percent={percent} status={status} />
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.min(percent, 100)}%`,
              backgroundColor: resolvedBarColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.lg,
    padding: wp(4),
    gap: hp(1.2),
    borderLeftWidth: 3,
    ...shadowCard,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  info: {
    flex: 1,
    gap: hp(0.3),
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overspentWrap: {
    alignItems: 'flex-end',
  },
  warningWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  track: {
    height: hp(0.8),
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});

export default CategoryBreakdownItem;
