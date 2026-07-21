import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ScreenHeader from '../../../components/common/Screenheader';
import CurrencyView from '../../../components/common/CurrencyView';
import PaymentIcon from '../../../components/common/Paymenticon';
import RecentActivityItem from '../../../components/home/RecentActivityItem';
import TransactionDetailModal from '../../../components/modals/transaction/TransactionDetailModal';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';
import { getCategoryMeta, getCategoryLabel } from '../../../constants/theme/accountMeta';
import { getTransactionsApi } from '../../../services/transactionService';
import useBudgetStore from '../../../store/useBudgetStore';

const CategoryDetailScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const currentBudget = useBudgetStore(s => s.currentBudget);
  const meta = getCategoryMeta(category);
  const breakdown = currentBudget?.spending?.byCategory?.find(c => c.category === category);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const data = await getTransactionsApi({
          dateFrom: start.toISOString().split('T')[0],
          dateTo: end.toISOString().split('T')[0],
          limit: 100,
        });
        const filtered = data.transactions.filter(
          (t) => t.category === category
        );
        setTransactions(filtered);
      } catch (_) {}
      setLoading(false);
    };
    fetchTransactions();
  }, [category]);

  const renderItem = useCallback(({ item }) => {
    const { _id, category: cat, ...rest } = item;
    return (
      <RecentActivityItem
        {...rest}
        raw={item}
        onPress={() => setSelectedTx(item)}
      />
    );
  }, []);

  return (
    <View style={styles.safe}>
      <ScreenHeader
        title={breakdown?.label || getCategoryLabel(category)}
        onBack={() => navigation.goBack()}
        backIcon="arrow"
      />

      {breakdown && (
        <View style={styles.summary}>
          <View style={styles.summaryCard}>
            <PaymentIcon
              name={meta.iconName}
              backgroundColor={meta.iconBg}
              color={meta.iconColor}
              containerSize={wp(14)}
              size={wp(7)}
            />
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Label type="bodyXs" weight="regular" color="textMuted">Spent</Label>
                <CurrencyView amount={breakdown.spent} type="bodySmall" weight="bold" color="textMain" />
              </View>
              {breakdown.limit && (
                <>
                  <View style={styles.summaryItem}>
                    <Label type="bodyXs" weight="regular" color="textMuted">Budget</Label>
                    <CurrencyView amount={breakdown.limit} type="bodySmall" weight="bold" color="textMain" />
                  </View>
                  <View style={styles.summaryItem}>
                    <Label type="bodyXs" weight="regular" color="textMuted">Remaining</Label>
                    <CurrencyView amount={breakdown.remaining} type="bodySmall" weight="bold" color={breakdown.remaining >= 0 ? 'primary' : 'error'} />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      )}

      <View style={styles.transactionHeader}>
        <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.transactionLabel}>
          THIS MONTH
        </Label>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={theme.primary} />
        </View>
      ) : transactions.length === 0 ? (
        <View style={styles.center}>
          <Label type="bodySmall" weight="regular" color="textMuted">
            No transactions in this category this month
          </Label>
        </View>
      ) : (
        <FlashList
          data={transactions}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          estimatedItemSize={hp(7)}
          contentContainerStyle={styles.listContent}
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

const createStyles = (t) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: t.background },
    summary: { paddingHorizontal: wp(5), marginTop: hp(2) },
    summaryCard: {
      backgroundColor: t.surfacePrimary,
      borderRadius: 16,
      padding: wp(5),
      alignItems: 'center',
      gap: hp(2),
    },
    summaryRow: { flexDirection: 'row', gap: wp(6) },
    summaryItem: { alignItems: 'center', gap: hp(0.3) },
    transactionHeader: { paddingHorizontal: wp(5), marginTop: hp(2.5), marginBottom: hp(1) },
    transactionLabel: { letterSpacing: 0.8 },
    listContent: { paddingHorizontal: wp(5), paddingBottom: hp(12) },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  });

export default CategoryDetailScreen;
