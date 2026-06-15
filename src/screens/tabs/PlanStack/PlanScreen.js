import React, { useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Pencil } from 'lucide-react-native';
import HomeHeader from '../../../components/home/HomeHeader';
import TotalSpendingCard from '../../../components/totalspending/TotalSpendingCard';
import CategoryBreakdownList from '../../../components/totalspending/CategoryBreakdownList';
import SmartInsightCard from '../../../components/home/SmartInsightCard';
import { useThemeColors } from '@hooks/useThemeColors';
import { borderRadius, Label } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';

const PlanScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const breakdownItems = useMemo(() => [
    {
      id: 'housing',
      label: 'Housing',
      iconName: 'home',
      iconBg: '#EFF6FF',
      iconColor: theme.bankAccount,
      spentAmount: 1200,
      limitAmount: 1500,
    },
    {
      id: 'food',
      label: 'Food & Drinks',
      iconName: 'food',
      iconBg: '#FFF3E6',
      iconColor: '#F97316',
      spentAmount: 580,
      limitAmount: 600,
    },
    {
      id: 'entertainment',
      label: 'Entertainment',
      iconName: 'gift',
      iconBg: '#FFF1F2',
      iconColor: theme.error,
      spentAmount: 320,
      limitAmount: 250,
      barColor: theme.error,
    },
    {
      id: 'transport',
      label: 'Transport',
      iconName: 'car',
      iconBg: '#F5F3FF',
      iconColor: theme.savings,
      spentAmount: 120,
      limitAmount: 400,
      barColor: theme.savings,
    },
  ], [theme]);

  return (
    <View style={styles.safe}>
      <HomeHeader onBellPress={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.monthRow}>
          <View>
            <Label
              type="bodyXs"
              weight="semiBold"
              color="textMuted"
              style={styles.monthLabel}
            >
              MONTHLY BUDGET
            </Label>
            <Label type="headingMedium" weight="bold" color="textMain">
              September 2023
            </Label>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.75}>
            <Pencil size={wp(3.8)} color={theme.primary} strokeWidth={2} />
            <Label type="bodyXs" weight="semiBold" color="primary">
              Edit Budget
            </Label>
          </TouchableOpacity>
        </View>

        <TotalSpendingCard
          spentAmount={3420.5}
          limitAmount={4200}
          remainingAmount={779.5}
          dailyAverage={114}
          percentUsed={82}
        />

        <CategoryBreakdownList items={breakdownItems} onDetails={() => {}} />

        <SmartInsightCard message="You're spending 15% more on entertainment this month. Consider reallocating from your Transport surplus." />
      </ScrollView>
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: t.background,
    },
    scrollContent: {
      paddingBottom: hp(12),
    },
    monthRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      marginBottom: hp(2),
    },
    monthLabel: {
      letterSpacing: 0.8,
      marginBottom: hp(0.3),
    },
    editBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(1.5),
      borderWidth: 1,
      borderColor: t.primary,
      borderRadius: borderRadius.full,
      paddingHorizontal: wp(3.5),
      paddingVertical: hp(0.9),
    },
  });

export default PlanScreen;
