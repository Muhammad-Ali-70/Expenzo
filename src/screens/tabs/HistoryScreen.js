import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
  CalendarDays,
  LayoutGrid,
  Wallet,
  User,
  Calendar,
  DollarSign,
  X,
} from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label } from '../../constants/globalstyle';
import HomeHeader from '../../components/home/HomeHeader';
import SearchBar from '../../components/ui/SearchBar';
import FilterTagList from '../../components/history/FilterTagList';
import DateRangeSection from '../../components/history/DateRangeSection';
import AmountRangeSection from '../../components/history/AmountRangeSection';
import RecentActivityItem from '../../components/home/RecentActivityItem';
import TransactionDetailModal from '../../components/modals/transaction/TransactionDetailModal';
import AccountFilterModal from '../../components/modals/history/AccountFilterModal';
import PrimaryLoader from '../../components/ui/PrimaryLoader';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { getRandomLoadingText } from '../../constants/dummy/loadingTexts';
import { useTransactions } from '../../database/hooks/useTransactions';
import useAccountStore from '../../store/useAccountStore';
import { storage } from '../../services/storage';

const FILTER_TAGS = [
  { id: 'all', label: 'All', icon: CalendarDays },
  { id: 'expense', label: 'Expenses', icon: LayoutGrid },
  { id: 'income', label: 'Income', icon: Wallet },
  { id: 'account', label: 'Account', icon: User },
  { id: 'date', label: 'Date', icon: Calendar },
  { id: 'amount', label: 'Amount', icon: DollarSign },
];

const STORAGE_KEY = 'history-filters';

const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const loadFilters = () => {
  try {
    const saved = storage.getString(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load filters:', e);
  }
  return null;
};

const saveFilters = filters => {
  try {
    storage.set(STORAGE_KEY, JSON.stringify(filters));
  } catch (e) {
    console.error('Failed to save filters:', e);
  }
};

const HistoryScreen = ({ route }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const accounts = useAccountStore(s => s.accounts);

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loadingText] = useState(getRandomLoadingText);

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [dateFrom, setDateFrom] = useState(
    thirtyDaysAgo.toISOString().split('T')[0],
  );
  const [dateTo, setDateTo] = useState(today.toISOString().split('T')[0]);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  useEffect(() => {
    const savedFilters = loadFilters();
    if (savedFilters) {
      if (savedFilters.activeFilter) setActiveFilter(savedFilters.activeFilter);
      if (savedFilters.selectedAccountId && accounts.length > 0) {
        const account = accounts.find(
          a => a._id === savedFilters.selectedAccountId,
        );
        if (account) setSelectedAccount(account);
      }
      if (savedFilters.dateFrom) setDateFrom(savedFilters.dateFrom);
      if (savedFilters.dateTo) setDateTo(savedFilters.dateTo);
      if (savedFilters.minAmount) setMinAmount(savedFilters.minAmount);
      if (savedFilters.maxAmount) setMaxAmount(savedFilters.maxAmount);
    }
  }, [accounts]);

  useEffect(() => {
    const filters = {
      activeFilter,
      selectedAccountId: selectedAccount?._id || null,
      dateFrom,
      dateTo,
      minAmount,
      maxAmount,
    };
    saveFilters(filters);
  }, [activeFilter, selectedAccount, dateFrom, dateTo, minAmount, maxAmount]);

  const debouncedSearch = useDebounce(search, 400);
  const debouncedMinAmount = useDebounce(minAmount, 600);
  const debouncedMaxAmount = useDebounce(maxAmount, 600);

  const { loading, loadingMore, error, getGrouped, fetchNextPage, refresh } =
    useTransactions({
      accountId: selectedAccount?._id,
      dateFrom,
      dateTo,
      minAmount: debouncedMinAmount || undefined,
      maxAmount: debouncedMaxAmount || undefined,
    });

  const refreshTrigger = route?.params?.refresh;
  useEffect(() => {
    if (refreshTrigger) refresh();
  }, [refreshTrigger, refresh]);

  const groups = useMemo(() => {
    return getGrouped({
      search: debouncedSearch,
      type: activeFilter === 'all' ? null : activeFilter,
    });
  }, [getGrouped, debouncedSearch, activeFilter]);

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

  const handleFilterSelect = filterId => {
    if (filterId === 'all' || filterId === 'expense' || filterId === 'income') {
      setActiveFilter(filterId);
      setExpandedFilter(null);
    } else if (filterId === 'account') {
      setAccountModalVisible(true);
      setExpandedFilter(null);
    } else if (filterId === 'date') {
      setExpandedFilter(expandedFilter === 'date' ? null : 'date');
    } else if (filterId === 'amount') {
      setExpandedFilter(expandedFilter === 'amount' ? null : 'amount');
    }
  };

  const hasActiveFilters = useMemo(() => {
    return selectedAccount !== null || minAmount !== '' || maxAmount !== '';
  }, [selectedAccount, minAmount, maxAmount]);

  const handleClearAllFilters = () => {
    setActiveFilter('all');
    setSelectedAccount(null);
    setExpandedFilter(null);
    setMinAmount('');
    setMaxAmount('');

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    setDateFrom(thirtyDaysAgo.toISOString().split('T')[0]);
    setDateTo(today.toISOString().split('T')[0]);
  };

  const isFilterActive = filterId => {
    if (filterId === 'all' || filterId === 'expense' || filterId === 'income') {
      return activeFilter === filterId;
    }
    if (filterId === 'account') return !!selectedAccount;
    if (filterId === 'date') return expandedFilter === 'date';
    if (filterId === 'amount') return expandedFilter === 'amount';
    return false;
  };

  const renderItem = useCallback(
    ({ item }) => {
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
    },
    [styles],
  );

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
        color={theme.primary}
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

      <View style={styles.clearFilterWrap}>
        {hasActiveFilters && (
          <TouchableOpacity onPress={handleClearAllFilters} activeOpacity={0.7}>
            <Label type="bodySmall" weight="semiBold" color="primary" underline>
              Clear all
            </Label>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tagsWrap}>
        <FilterTagList
          tags={FILTER_TAGS}
          activeId={activeFilter}
          isFilterActive={isFilterActive}
          onSelect={handleFilterSelect}
        />
      </View>

      {expandedFilter === 'date' && (
        <DateRangeSection
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
        />
      )}

      {expandedFilter === 'amount' && (
        <AmountRangeSection
          minAmount={minAmount}
          maxAmount={maxAmount}
          onMinChange={setMinAmount}
          onMaxChange={setMaxAmount}
        />
      )}

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

      <AccountFilterModal
        visible={accountModalVisible}
        accounts={accounts}
        selectedAccount={selectedAccount}
        onSelect={setSelectedAccount}
        onClose={() => setAccountModalVisible(false)}
      />

      <TransactionDetailModal
        visible={!!selectedTx}
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: t.background,
    },
    searchWrap: {
      paddingHorizontal: wp(5),
      marginBottom: hp(1),
    },
    clearFilterWrap: {
      paddingHorizontal: wp(5),
      marginBottom: hp(1),
      alignItems: 'flex-end',
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
