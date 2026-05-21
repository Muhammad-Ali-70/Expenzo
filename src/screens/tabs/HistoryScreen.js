import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { CalendarDays, LayoutGrid, Wallet } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label } from '../../constants/globalstyle';
import HomeHeader from '../../components/home/HomeHeader';
import SearchBar from '../../components/ui/SearchBar';
import FilterTagList from '../../components/history/FilterTagList';
import RecentActivitySection from '../../components/home/RecentActivitySection';
import { useTransactions } from '../../database/hooks/useTransactions';

const FILTER_TAGS = [
  { id: 'all', label: 'All', icon: CalendarDays },
  { id: 'expense', label: 'Expenses', icon: LayoutGrid },
  { id: 'income', label: 'Income', icon: Wallet },
];

const HistoryScreen = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { getGrouped, loading } = useTransactions();

  const groups = useMemo(() => {
    const category =
      activeFilter === 'expense' || activeFilter === 'income'
        ? null // type filter, not category
        : null;

    const all = getGrouped({ search });

    // Log all transactions
    console.log('=== All Transactions ===');
    console.log(
      'Total transactions:',
      all.reduce((acc, group) => acc + group.transactions.length, 0),
    );
    console.log('Raw groups data:', JSON.stringify(all, null, 2));

    all.forEach((group, groupIndex) => {
      console.log(`\n--- Group ${groupIndex + 1}: ${group.label} ---`);
      console.log(`Total for ${group.label}:`, group.total);
      group.transactions.forEach((tx, txIndex) => {
        console.log(`Transaction ${txIndex + 1}:`, {
          id: tx.id,
          description: tx.description,
          amount: tx.amount,
          type: tx.type,
          category: tx.category,
          date: tx.date,
          dateString: new Date(tx.date).toLocaleString(),
          note: tx.note,
          accountId: tx.accountId,
        });
      });
    });
    console.log('========================');

    // Apply type filter (expense / income) at the transaction level
    if (activeFilter === 'all') return all;

    return all
      .map(group => ({
        ...group,
        transactions: group.transactions.filter(tx =>
          activeFilter === 'expense' ? tx.amount < 0 : tx.amount >= 0,
        ),
        total: group.transactions
          .filter(tx =>
            activeFilter === 'expense' ? tx.amount < 0 : tx.amount >= 0,
          )
          .reduce((sum, tx) => sum + tx.amount, 0),
      }))
      .filter(group => group.transactions.length > 0);
  }, [getGrouped, search, activeFilter]);

  return (
    <View style={styles.safe}>
      <HomeHeader onBellPress={() => {}} />

      <View style={styles.searchWrap}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search transactions..."
        />
      </View>

      <View style={styles.tagsWrap}>
        <FilterTagList
          tags={FILTER_TAGS}
          activeId={activeFilter}
          onSelect={setActiveFilter}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <Label
            type="bodySmall"
            weight="regular"
            color="textMuted"
            style={styles.empty}
          >
            Loading…
          </Label>
        ) : groups.length === 0 ? (
          <Label
            type="bodySmall"
            weight="regular"
            color="textMuted"
            style={styles.empty}
          >
            {search
              ? 'No transactions match your search.'
              : 'No transactions yet.'}
          </Label>
        ) : (
          groups.map(group => (
            <RecentActivitySection
              key={group.key}
              label={group.label}
              total={group.total}
              transactions={group.transactions}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchWrap: {
    paddingHorizontal: wp(5),
    marginBottom: hp(1.5),
  },
  tagsWrap: {
    marginBottom: hp(1),
  },
  scrollContent: {
    paddingBottom: hp(12),
  },
  empty: {
    textAlign: 'center',
    marginTop: hp(10),
  },
});

export default HistoryScreen;
