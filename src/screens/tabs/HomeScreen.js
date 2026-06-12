import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';

import HomeHeader from '../../components/home/HomeHeader';
import BalanceSummaryCard from '../../components/home/BalanceSummaryCard';
import AccountBreakdownRow from '../../components/home/AccountBreakdownRow';
import MonthlySpendingCard from '../../components/home/MonthlySpendingCard';
import SmartInsightCard from '../../components/home/SmartInsightCard';
import RecentActivitySection from '../../components/home/RecentActivitySection';

import useAccountStore from '../../store/useAccountStore';
import { getHomeDataApi } from '../../services/transactionService';
import { groupTransactions } from '../../utils/transactionUtils';

const HomeScreen = ({ navigation }) => {
  const accounts = useAccountStore(s => s.accounts);
  const fetchAccounts = useAccountStore(s => s.fetchAccounts);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [dailySpending, setDailySpending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const loadHomeData = useCallback(async () => {
    try {
      const data = await getHomeDataApi({ month, year });
      setTotalExpenses(data.totalExpenses);
      setDailySpending(data.dailySpending);

      const groups = groupTransactions(data.recentTransactions);
      setRecentTransactions(groups.flatMap(g => g.transactions));
    } catch (err) {
      console.error('Failed to load home data:', err);
    }
  }, [month, year]);

  useEffect(() => {
    if (accounts.length === 0) fetchAccounts();
  }, [accounts.length, fetchAccounts]);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, [loadHomeData]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchAccounts(), loadHomeData()]);
    setRefreshing(false);
  }, [fetchAccounts, loadHomeData]);

  const totalBalance = accounts.reduce((sum, a) => sum + (a.balance ?? 0), 0);

  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <HomeHeader onBellPress={() => {}} />

        <BalanceSummaryCard
          totalBalance={totalBalance}
          monthlyChange={`-PKR ${totalExpenses.toLocaleString()}`}
        />

        <AccountBreakdownRow accounts={accounts} />

        <MonthlySpendingCard
          spendingAmount={totalExpenses}
          dailySpending={dailySpending}
          budgetPercent={'NAN'}
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
