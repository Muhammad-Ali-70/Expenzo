import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

import HomeHeader from '../../components/home/HomeHeader';
import BalanceSummaryCard from '../../components/home/BalanceSummaryCard';
import AccountBreakdownRow from '../../components/home/AccountBreakdownRow';
import MonthlySpendingCard from '../../components/home/MonthlySpendingCard';
import SmartInsightCard from '../../components/home/SmartInsightCard';
import RecentActivitySection from '../../components/home/RecentActivitySection';

import useAccountStore from '../../store/useAccountStore';
import useCategoryStore from '../../store/useCategoryStore';
import { getHomeDataApi } from '../../services/transactionService';
import { groupTransactions } from '../../utils/transactionUtils';
import PrimaryLoader from '../../components/ui/PrimaryLoader';
import { getRandomLoadingText } from '../../constants/dummy/loadingTexts';
import { Label } from '../../constants/globalstyle';

const HomeScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const accounts = useAccountStore(s => s.accounts);
  const fetchAccounts = useAccountStore(s => s.fetchAccounts);
  const categories = useCategoryStore(s => s.categories);
  const fetchCategories = useCategoryStore(s => s.fetchCategories);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [dailySpending, setDailySpending] = useState([]);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingText] = useState(getRandomLoadingText);

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const loadHomeData = useCallback(async () => {
    try {
      const data = await getHomeDataApi({ month, year });
      setTotalExpenses(data.totalExpenses);
      setDailySpending(data.dailySpending);
      setBudget(data.budget);

      const groups = groupTransactions(data.recentTransactions);
      setRecentTransactions(groups.flatMap(g => g.transactions));
    } catch (err) {
      console.error('Failed to load home data:', err);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    if (accounts.length === 0) fetchAccounts();
  }, [accounts.length, fetchAccounts]);

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, [categories.length, fetchCategories]);

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

  if (loading) {
    return (
      <View style={styles.safe}>
        <HomeHeader onBellPress={() => {}} />
        <View style={styles.loadingWrap}>
          <PrimaryLoader width={100} height={100} />
          <Label
            type="bodySmall"
            weight="regular"
            color="textMuted"
            style={styles.loadingText}
          >
            {loadingText}
          </Label>
        </View>
      </View>
    );
  }

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
            colors={[theme.primary]}
            tintColor={theme.primary}
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
          budgetPercent={budget?.percentUsed ?? 0}
          remainingAmount={budget?.remaining}
          budgetStatus={budget?.status}
          remainingLabel={budget ? undefined : "Set a budget in Plan tab"}
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

const createStyles = t =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: t.background,
    },
    flex: { flex: 1 },
    scrollContent: {
      paddingBottom: hp(12),
    },
    loadingWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginTop: hp(1.5),
      textAlign: 'center',
    },
  });

export default HomeScreen;
