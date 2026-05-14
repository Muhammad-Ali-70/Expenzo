import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { CalendarDays, LayoutGrid, Wallet } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import HomeHeader from '../../components/home/HomeHeader';
import SearchBar from '../../components/ui/SearchBar';
import FilterTagList from '../../components/history/FilterTagList';
import RecentActivitySection from '../../components/home/RecentActivitySection';

const FILTER_TAGS = [
  { id: 'date', label: 'Date', icon: CalendarDays },
  { id: 'category', label: 'Category', icon: LayoutGrid },
  { id: 'source', label: 'Source', icon: Wallet },
];

const GROUPED_TRANSACTIONS = [
  {
    id: 'today',
    label: 'Today',
    total: -124.5,
    transactions: [
      {
        id: 't1',
        iconName: 'food',
        iconBg: '#FFF3E6',
        iconColor: '#F97316',
        title: 'Wildwood Kitchen',
        subtitle: 'Lunch • 12:45 PM',
        amount: -42,
      },
      {
        id: 't2',
        iconName: 'phone',
        iconBg: '#EFF6FF',
        iconColor: colors.bankAccount,
        title: 'Apple Store',
        subtitle: 'Gadgets • 10:15 AM',
        amount: -82.5,
      },
    ],
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    total: 2450,
    transactions: [
      {
        id: 't3',
        iconName: 'work',
        iconBg: '#E6FBF4',
        iconColor: colors.walletCash,
        title: 'Monthly Salary',
        subtitle: 'Income • 09:00 AM',
        amount: 2800,
      },
      {
        id: 't4',
        iconName: 'home',
        iconBg: '#F5F3FF',
        iconColor: colors.savings,
        title: 'Rent Payment',
        subtitle: 'Housing • 08:30 AM',
        amount: -350,
      },
    ],
  },
  {
    id: 'march12',
    label: 'March 12',
    total: -18.25,
    transactions: [
      {
        id: 't5',
        iconName: 'car',
        iconBg: '#F1F5F9',
        iconColor: colors.textMuted,
        title: 'City Transit',
        subtitle: 'Transport • 06:15 PM',
        amount: -18.25,
      },
    ],
  },
];

const HistoryScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('date');

  const filtered = GROUPED_TRANSACTIONS.map(group => ({
    ...group,
    transactions: group.transactions.filter(tx =>
      tx.title.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter(group => group.transactions.length > 0);

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
        {filtered.map(group => (
          <RecentActivitySection
            key={group.id}
            label={group.label}
            total={group.total}
            transactions={group.transactions}
          />
        ))}
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
});

export default HistoryScreen;
