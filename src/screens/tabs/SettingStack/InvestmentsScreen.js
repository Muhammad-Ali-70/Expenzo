import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { TrendingUp, Settings } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label, borderRadius, shadowCard } from '../../../constants/globalstyle';
import ScreenHeader from '../../../components/common/Screenheader';
import SearchBar from '../../../components/ui/SearchBar';
import PrimaryLoader from '../../../components/ui/PrimaryLoader';
import { getInvestmentsApi } from '../../../services/investmentService';
import { useDebounce } from '../../../hooks/useDebounce';
import CurrencyView from '../../../components/common/CurrencyView';

const FREQ_LABEL = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' };

const STATUS_COLORS = {
  active: '#10B981',
  paused: '#F59E0B',
  stopped: '#EF4444',
  inactive: '#94A3B8',
};

const InvestmentItem = ({ item, onPress, themeColors, styles: s }) => (
  <TouchableOpacity
    style={[s.card, shadowCard, { backgroundColor: themeColors.surfacePrimary, borderColor: themeColors.outlineVariant }]}
    onPress={() => onPress(item._id)}
    activeOpacity={0.7}
  >
    <View style={s.cardHeader}>
      <View style={[s.iconWrap, { backgroundColor: themeColors.primary + '18' }]}>
        <TrendingUp size={wp(4.5)} color={themeColors.primary} strokeWidth={2} />
      </View>
      <View style={s.cardInfo}>
        <Label type="bodySmall" weight="semiBold" color="textMain" numberOfLines={1}>
          {item.title}
        </Label>
        <Label type="bodyXs" weight="regular" color="textMuted">
          {item.accountId?.label || 'Account'} · {FREQ_LABEL[item.frequency] || item.frequency}
        </Label>
      </View>
      <View style={[s.statusBadge, { backgroundColor: (STATUS_COLORS[item.status] || '#94A3B8') + '20' }]}>
        <Label type="caption" weight="semiBold" style={{ color: STATUS_COLORS[item.status] || '#94A3B8' }}>
          {item.status}
        </Label>
      </View>
    </View>

    <View style={s.cardBody}>
      <View style={s.statCol}>
        <Label type="bodyXs" weight="regular" color="textMuted">Principal</Label>
        <CurrencyView amount={item.principal} type="bodySmall" weight="semiBold" color="textMain" />
      </View>
      <View style={s.statCol}>
        <Label type="bodyXs" weight="regular" color="textMuted">Returned</Label>
        <CurrencyView amount={item.totalReturned} type="bodySmall" weight="semiBold" color="primary" />
      </View>
      <View style={s.statCol}>
        <Label type="bodyXs" weight="regular" color="textMuted">Next Due</Label>
        <Label type="bodyXs" weight="semiBold" color="textMain">
          {item.nextReturnDate
            ? new Date(item.nextReturnDate).toLocaleDateString()
            : '—'}
        </Label>
      </View>
    </View>
  </TouchableOpacity>
);

const InvestmentsScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [search, setSearch] = useState('');
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  const fetchInvestments = useCallback(
    async (isRefresh = false, searchParam = debouncedSearch, pageNum = 1) => {
      if (isRefresh) setLoading(true);
      else if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const data = await getInvestmentsApi({ search: searchParam, page: pageNum, limit: 10 });
        const list = data.investments || [];
        if (isRefresh || pageNum === 1) {
          setInvestments(list);
        } else {
          setInvestments(prev => [...prev, ...list]);
        }
        setHasMore(data.pagination?.hasNextPage || false);
        setPage(pageNum);
      } catch (err) {
        console.error('Failed to load investments:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    },
    [debouncedSearch],
  );

  useEffect(() => {
    fetchInvestments(true);
  }, [debouncedSearch, fetchInvestments]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchInvestments(true, debouncedSearch, 1);
  }, [debouncedSearch, fetchInvestments]);

  const fetchNextPage = useCallback(() => {
    if (hasMore && !loadingMore && !loading) {
      fetchInvestments(false, debouncedSearch, page + 1);
    }
  }, [hasMore, loadingMore, loading, debouncedSearch, page, fetchInvestments]);

  const renderItem = useCallback(
    ({ item }) => (
      <InvestmentItem item={item} onPress={() => {}} themeColors={theme} styles={styles} />
    ),
    [theme, styles],
  );

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <Label type="bodySmall" weight="regular" color="textMuted" style={styles.empty}>
        {search ? 'No investments match your search.' : 'No investments yet.'}
      </Label>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="small" color={theme.primary} style={styles.loadingMore} />;
  };

  return (
    <View style={styles.safe}>
      <ScreenHeader
        title="Investments"
        onBack={() => navigation.goBack()}
        backIcon="arrow"
        rightElement={
          <TouchableOpacity
            onPress={() => navigation.navigate('InvestmentSettingsScreen')}
            activeOpacity={0.7}
          >
            <Settings size={wp(5.5)} color={theme.textMain} strokeWidth={2} />
          </TouchableOpacity>
        }
      />

      <View style={styles.searchWrap}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search investments..."
        />
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingWrap}>
          <PrimaryLoader width={100} height={100} />
        </View>
      ) : (
        <FlashList
          data={investments}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          estimatedItemSize={hp(14)}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.4}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.scrollContent}
        />
      )}
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: t.background },
    searchWrap: { paddingHorizontal: wp(5), marginBottom: hp(1.5), marginTop: hp(1) },
    scrollContent: { paddingBottom: hp(12), paddingHorizontal: wp(5) },
    loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    empty: { textAlign: 'center', marginTop: hp(10) },
    loadingMore: { paddingVertical: hp(2) },
    card: {
      borderRadius: borderRadius.xl,
      borderWidth: 1,
      padding: wp(4),
      marginBottom: hp(1.5),
      gap: hp(1.5),
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(3),
    },
    iconWrap: {
      width: wp(9),
      height: wp(9),
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardInfo: { flex: 1, gap: hp(0.2) },
    statusBadge: {
      paddingHorizontal: wp(2.5),
      paddingVertical: hp(0.4),
      borderRadius: 999,
    },
    cardBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: hp(1),
      borderTopWidth: 0.5,
      borderTopColor: t.outlineVariant,
    },
    statCol: { alignItems: 'flex-start', gap: hp(0.2) },
  });

export default InvestmentsScreen;
