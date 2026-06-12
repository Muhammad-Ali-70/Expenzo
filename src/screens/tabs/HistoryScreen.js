import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { CalendarDays, LayoutGrid, Wallet } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label } from '../../constants/globalstyle';
import HomeHeader from '../../components/home/HomeHeader';
import SearchBar from '../../components/ui/SearchBar';
import FilterTagList from '../../components/history/FilterTagList';
import RecentActivityItem from '../../components/home/RecentActivityItem';
import TransactionDetailModal from '../../components/modals/transaction/TransactionDetailModal';
import PrimaryLoader from '../../components/ui/PrimaryLoader';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { getRandomLoadingText } from '../../constants/dummy/loadingTexts';
import { useTransactions } from '../../database/hooks/useTransactions';

const FILTER_TAGS = [
  { id: 'all', label: 'All', icon: CalendarDays },
  { id: 'expense', label: 'Expenses', icon: LayoutGrid },
  { id: 'income', label: 'Income', icon: Wallet },
];

// Debounce hook — delays value update until user stops typing
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const HistoryScreen = ({ route }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTx, setSelectedTx] = useState(null);
  const [loadingText] = useState(getRandomLoadingText);

  const debouncedSearch = useDebounce(search, 400);

  const now = new Date();
  const { loading, loadingMore, error, getGrouped, fetchNextPage, refresh } =
    useTransactions({
      month: now.getMonth(),
      year: now.getFullYear(),
    });

  const refreshTrigger = route?.params?.refresh;
  useEffect(() => {
    if (refreshTrigger) refresh();
  }, [refreshTrigger, refresh]);

  // Local filter + search runs on already-fetched data — instant, no API call
  const groups = useMemo(() => {
    return getGrouped({
      search: debouncedSearch,
      type: activeFilter === 'all' ? null : activeFilter,
    });
  }, [getGrouped, debouncedSearch, activeFilter]);

  // FlashList needs a flat list — sections become header + items
  const flatData = useMemo(() => {
    const items = [];
    groups.forEach(group => {
      items.push({ _type: 'header', key: `header-${group.key}`, ...group });
      group.transactions.forEach(tx => {
        items.push({ _type: 'item', key: tx.id, groupKey: group.key, ...tx });
      });
    });
    return items;
  }, [groups]);

  const renderItem = useCallback(({ item }) => {
    if (item._type === 'header') {
      return (
        <View style={styles.sectionHeader}>
          <Label type="headingXs" weight="bold" color="textMain">
            {item.label}
          </Label>
          <Label
            type="bodySmall"
            weight="semiBold"
            color={item.total >= 0 ? 'primary' : 'error'}
          >
            {item.total >= 0 ? '+' : ''}PKR{' '}
            {Math.abs(item.total).toLocaleString()}
          </Label>
        </View>
      );
    }
    const { _type, groupKey, key, ...itemProps } = item;
    return (
      <RecentActivityItem
        {...itemProps}
        onPress={() => setSelectedTx(item.raw)}
      />
    );
  }, []);

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <Label
        type="bodySmall"
        weight="regular"
        color="textMuted"
        style={styles.empty}
      >
        {search ? 'No transactions match your search.' : 'No transactions yet.'}
      </Label>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <ActivityIndicator
        size="small"
        color={colors.primary}
        style={styles.loadingMore}
      />
    );
  };

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

      {loading ? (
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
      ) : error ? (
        <View style={styles.errorWrap}>
          <Label type="bodySmall" color="error" style={styles.empty}>
            {error}
          </Label>
          <PrimaryButton
            variant="primary"
            size="sm"
            label="Retry"
            onPress={refresh}
          />
        </View>
      ) : (
        <FlashList
          data={flatData}
          keyExtractor={item => item.key}
          renderItem={renderItem}
          estimatedItemSize={hp(7)}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.4}
          onRefresh={refresh}
          refreshing={loading}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.scrollContent}
          getItemType={item => item._type}
        />
      )}

      <TransactionDetailModal
        visible={!!selectedTx}
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
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
    paddingHorizontal: wp(5),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(2.5),
    paddingBottom: hp(1),
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
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(1.5),
  },
  empty: {
    textAlign: 'center',
    marginTop: hp(10),
  },
  loadingMore: {
    paddingVertical: hp(2),
  },
});

export default HistoryScreen;
