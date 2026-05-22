import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';

import HomeHeader from '../../components/home/HomeHeader';
import BalanceSummaryCard from '../../components/home/BalanceSummaryCard';
import AccountBreakdownRow from '../../components/home/AccountBreakdownRow';
import MonthlySpendingCard from '../../components/home/MonthlySpendingCard';
import SmartInsightCard from '../../components/home/SmartInsightCard';
import RecentActivitySection from '../../components/home/RecentActivitySection';

import { useAccounts } from '../../database/hooks/useAccounts';
import { useTransactions } from '../../database/hooks/useTransactions';

const HomeScreen = ({ navigation }) => {
  const { accounts, totalBalance } = useAccounts();

  const now = new Date();
  const { totalExpenses, getGrouped } = useTransactions({
    month: now.getMonth(),
    year: now.getFullYear(),
  });

  // Recent activity: latest 5 transactions across all groups, flattened
  const recentTransactions = getGrouped()
    .flatMap(g => g.transactions)
    .slice(0, 5);

  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader onBellPress={() => {}} />

        <BalanceSummaryCard
          totalBalance={totalBalance}
          monthlyChange={`-PKR ${totalExpenses.toLocaleString()}`}
        />

        <AccountBreakdownRow accounts={accounts} />

        <MonthlySpendingCard
          spendingAmount={totalExpenses}
          budgetPercent={72}
          remainingLabel="Track your spending this month."
        />

        <SmartInsightCard message="Tap any account card to see its breakdown." />

        <RecentActivitySection
          transactions={recentTransactions}
          onSeeAll={() => navigation?.navigate('History')}
        />
      </ScrollView>
    </View>
  );
};

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
});

export default HomeScreen;
