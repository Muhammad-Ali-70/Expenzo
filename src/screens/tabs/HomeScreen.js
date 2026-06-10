import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';

import HomeHeader from '../../components/home/HomeHeader';
import BalanceSummaryCard from '../../components/home/BalanceSummaryCard';
import AccountBreakdownRow from '../../components/home/AccountBreakdownRow';
import MonthlySpendingCard from '../../components/home/MonthlySpendingCard';
import SmartInsightCard from '../../components/home/SmartInsightCard';
import RecentActivitySection from '../../components/home/RecentActivitySection';

import useAccountStore from '../../store/useAccountStore';
import {
  getTransactionsSummaryApi,
  getTransactionsApi,
} from '../../services/transactionService';
import { groupTransactions } from '../../utils/transactionUtils';

const HomeScreen = ({ navigation }) => {
  const accounts = useAccountStore(s => s.accounts);
  const fetchAccounts = useAccountStore(s => s.fetchAccounts);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    if (accounts.length === 0) fetchAccounts();
  }, []);

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  useEffect(() => {
    const load = async () => {
      try {
        const [summary, txData] = await Promise.all([
          getTransactionsSummaryApi({ month, year }),
          getTransactionsApi({ month, year, limit: 5 }),
        ]);

        const expenseItem = summary.summary?.find(s => s._id === 'expense');
        setTotalExpenses(expenseItem?.total ?? 0);

        const groups = groupTransactions(txData.transactions);
        setRecentTransactions(groups.flatMap(g => g.transactions));
      } catch (err) {
        console.error('Failed to load home data:', err);
      }
    };
    load();
  }, [month, year]);

  const totalBalance = accounts.reduce((sum, a) => sum + (a.balance ?? 0), 0);

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
