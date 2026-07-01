import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { PlusCircle, Search } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label } from '../../../constants/globalstyle';
import ScreenHeader from '../../../components/common/Screenheader';
import SearchBar from '../../../components/ui/SearchBar';
import PrimaryLoader from '../../../components/ui/PrimaryLoader';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import { getRandomLoadingText } from '../../../constants/dummy/loadingTexts';
import { getDebtsApi } from '../../../services/debtService';
import { useDebounce } from '../../../hooks/useDebounce'; // Assuming you have or will create this hook
import { formatDate } from '../../../utils/date';

const DebtItem = ({ debt, onPress, themeColors, styles }) => (
  <TouchableOpacity
    style={[
      styles.debtItem,
      {
        backgroundColor: themeColors.surfacePrimary,
        borderColor: themeColors.outlineVariant,
      },
    ]}
    onPress={() => onPress(debt.id)}
  >
    <View style={styles.debtInfo}>
      <Label type="bodySmall" weight="semiBold" color="textMain">
        {debt.description || 'No Description'}
      </Label>
      <Label type="bodyXs" weight="regular" color="textMuted">
        {debt.counterpartyName} - Due: {formatDate(debt.dueDate)}
      </Label>
    </View>
    <Label
      type="bodySmall"
      weight="semiBold"
      color={debt.totalAmount >= 0 ? 'primary' : 'error'}
    >
      PKR {debt.totalAmount?.toLocaleString() ?? '0'}
    </Label>
  </TouchableOpacity>
);

const DebtScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [search, setSearch] = useState('');
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingText] = useState(getRandomLoadingText);

  const debouncedSearch = useDebounce(search, 400);

  const fetchDebts = useCallback(
    async (isRefresh = false, searchParam = debouncedSearch, pageNum = 1) => {
      if (isRefresh) setLoading(true);
      else if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const response = await getDebtsApi({
          search: searchParam,
          page: pageNum,
          limit: 10,
        });
        if (isRefresh || pageNum === 1) {
          setDebts(response.data);
        } else {
          setDebts(prev => [...prev, ...response.data]);
        }
        setHasMore(response.data.length === 10);
        setPage(pageNum);
      } catch (err) {
        console.error('Failed to load debts:', err);
        // Handle error display
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    },
    [debouncedSearch],
  );

  useEffect(() => {
    fetchDebts(true);
  }, [debouncedSearch, fetchDebts]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDebts(true, debouncedSearch, 1);
  }, [debouncedSearch, fetchDebts]);

  const fetchNextPage = useCallback(() => {
    if (hasMore && !loadingMore && !loading) {
      fetchDebts(false, debouncedSearch, page + 1);
    }
  }, [hasMore, loadingMore, loading, debouncedSearch, page, fetchDebts]);

  const renderItem = useCallback(
    ({ item }) => (
      <DebtItem
        debt={item}
        onPress={id => navigation.navigate('DebtDetailScreen', { id })}
        themeColors={theme}
        styles={styles}
      />
    ),
    [navigation, theme, styles],
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
        {search ? 'No debts match your search.' : 'No debts yet.'}
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
      <ScreenHeader
        title="Debt Calculator"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.searchWrap}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search debts..."
          leftIconName="search"
        />
      </View>

      {loading && !refreshing ? (
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
      ) : (
        <FlashList
          data={debts}
          keyExtractor={item => item._id || item.id}
          renderItem={renderItem}
          estimatedItemSize={hp(8)}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.4}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.scrollContent}
        />
      )}

      <View style={styles.fabWrap}>
        <PrimaryButton
          variant="primary"
          size="lg"
          label="Add New Debt"
          icon={<PlusCircle size={wp(5)} color={theme.onPrimary} />}
          onPress={() => navigation.navigate('AddEditDebtScreen')}
        />
      </View>
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
      marginBottom: hp(1.5),
    },
    scrollContent: {
      paddingBottom: hp(12),
      paddingHorizontal: wp(5),
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
    empty: {
      textAlign: 'center',
      marginTop: hp(10),
    },
    loadingMore: {
      paddingVertical: hp(2),
    },
    debtItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: hp(1.8),
      paddingHorizontal: wp(4),
      borderRadius: 12,
      borderWidth: 1,
      marginBottom: hp(1),
    },
    debtInfo: {
      flex: 1,
      gap: hp(0.3),
    },
    fabWrap: {
      position: 'absolute',
      bottom: hp(3),
      width: '100%',
      paddingHorizontal: wp(5),
    },
  });

export default DebtScreen;
