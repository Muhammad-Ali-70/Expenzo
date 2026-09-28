import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle, TrendingUp } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { Label, shadowCard } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';

const DebtSummaryCard = ({ outstandingTotal, receivableTotal, onPress }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (outstandingTotal === 0 && receivableTotal === 0) {
    return null;
  }

  const netDebt = receivableTotal - outstandingTotal;
  const isPositive = netDebt >= 0;

  return (
    <TouchableOpacity
      style={[styles.card, shadowCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <AlertCircle size={wp(5)} color={theme.textMain} />
        </View>
        <Label type="bodySmall" weight="semiBold" color="textMain">
          Debt Summary
        </Label>
      </View>

      <View style={styles.content}>
        <View style={styles.debtRow}>
          <View style={styles.debtItem}>
            <Label type="bodyXs" weight="regular" color="textMuted">
              I Owe
            </Label>
            <Label type="bodyMedium" weight="bold" color="error">
              PKR {outstandingTotal.toLocaleString()}
            </Label>
          </View>

          <View style={styles.divider} />

          <View style={styles.debtItem}>
            <Label type="bodyXs" weight="regular" color="textMuted">
              They Owe Me
            </Label>
            <Label type="bodyMedium" weight="bold" color="primary">
              PKR {receivableTotal.toLocaleString()}
            </Label>
          </View>
        </View>

        <View style={styles.netRow}>
          <Label type="bodyXs" weight="regular" color="textMuted">
            Net Position
          </Label>
          <Label
            type="bodySmall"
            weight="semiBold"
            color={isPositive ? 'primary' : 'error'}
          >
            {isPositive ? '+' : ''}PKR {Math.abs(netDebt).toLocaleString()}
          </Label>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = t =>
  StyleSheet.create({
    card: {
      marginHorizontal: wp(5),
      marginTop: hp(2),
      backgroundColor: t.surfacePrimary,
      borderRadius: 12,
      padding: wp(4),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
      marginBottom: hp(1.5),
    },
    iconWrap: {
      width: wp(8),
      height: wp(8),
      borderRadius: wp(4),
      backgroundColor: t.surfaceContainer,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      gap: hp(1.5),
    },
    debtRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    debtItem: {
      flex: 1,
      alignItems: 'center',
      gap: hp(0.5),
    },
    divider: {
      width: 1,
      height: hp(4),
      backgroundColor: t.outlineVariant,
    },
    netRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: hp(1),
      borderTopWidth: 1,
      borderTopColor: t.outlineVariant,
    },
  });

export default DebtSummaryCard;
