import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { borderRadius } from '../../constants/globalstyle';

import HomeHeader from '../../components/home/HomeHeader';
import BalanceSummaryCard from '../../components/home/BalanceSummaryCard';
import AccountBreakdownRow from '../../components/home/AccountBreakdownRow';
import MonthlySpendingCard from '../../components/home/MonthlySpendingCard';
import SmartInsightCard from '../../components/home/SmartInsightCard';
import RecentActivitySection from '../../components/home/RecentActivitySection';

const TRANSACTIONS = [
  {
    id: '1',
    iconName: 'food',
    iconBg: '#FFF3E6',
    iconColor: '#F97316',
    title: 'The Green Bistro',
    subtitle: 'Today, 12:45 PM',
    amount: -42,
  },
  {
    id: '2',
    iconName: 'shopping',
    iconBg: '#EFF6FF',
    iconColor: colors.bankAccount,
    title: 'Whole Foods',
    subtitle: 'Yesterday, 06:20 PM',
    amount: -128.5,
  },
  {
    id: '3',
    iconName: 'work',
    iconBg: '#E6FBF4',
    iconColor: colors.walletCash,
    title: 'Salary Deposit',
    subtitle: 'Jun 15, 09:00 AM',
    amount: 4200,
  },
];

const HomeScreen = ({ navigation }) => (
  <View style={styles.safe}>
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader onBellPress={() => {}} />

      <BalanceSummaryCard totalBalance={12450} monthlyChange="+2.4%" />

      <AccountBreakdownRow
        walletBalance={1200}
        bankBalance={8450}
        savingsBalance={2800}
      />

      <MonthlySpendingCard
        spendingAmount={3240.5}
        budgetPercent={72}
        remainingLabel="You have Rs 850 left for June."
      />

      <SmartInsightCard message="Your dining expenses are 15% higher than last week. Consider home cooking to save Rs 40 this weekend." />

      <RecentActivitySection
        transactions={TRANSACTIONS}
        onSeeAll={() => navigation?.navigate('History')}
      />
    </ScrollView>

    <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
      <Plus size={wp(6)} color={colors.onPrimary} strokeWidth={2.5} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(12),
  },
  fab: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    width: wp(14),
    height: wp(14),
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
});

export default HomeScreen;
