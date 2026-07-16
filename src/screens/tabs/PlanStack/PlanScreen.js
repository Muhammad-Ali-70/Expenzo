import React, { useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Pencil } from 'lucide-react-native';
import HomeHeader from '../../../components/home/HomeHeader';
import TotalSpendingCard from '../../../components/totalspending/TotalSpendingCard';
import CategoryBreakdownItem from '../../../components/totalspending/CategoryBreakdownItem';
import SmartInsightCard from '../../../components/home/SmartInsightCard';
import { useThemeColors } from '@hooks/useThemeColors';
import { borderRadius, Label } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';
import useBudgetStore from '../../../store/useBudgetStore';
import PrimaryLoader from '../../../components/ui/PrimaryLoader';
import PrimaryButton from '../../../components/ui/PrimaryButton';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const generateInsight = (spending) => {
  if (!spending) return null;
  const highest = spending.byCategory?.reduce((max, cat) => cat.percentUsed > (max?.percentUsed || 0) ? cat : max, null);
  const lowest = spending.byCategory?.reduce((min, cat) => cat.percentUsed < (min?.percentUsed || 100) ? cat : min, null);

  if (highest && highest.status === 'over') {
    return `You're spending over budget on ${highest.label}. Consider reallocating from other categories.`;
  }
  if (highest && highest.percentUsed >= 80) {
    return `You've used ${Math.round(highest.percentUsed)}% of your ${highest.label} budget. You're close to the limit.`;
  }
  if (lowest && lowest.percentUsed < 30 && lowest.limit) {
    return `Great job keeping ${lowest.label} spending low! You've only used ${Math.round(lowest.percentUsed)}% of the budget.`;
  }
  return `You've used ${Math.round(spending.percentUsed || 0)}% of your monthly budget. ${spending.remaining > 0 ? `You have ${Math.round(spending.remaining).toLocaleString()} PKR remaining.` : ''}`;
};

const PlanScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { currentBudget, loading, error, fetchCurrentBudget } = useBudgetStore();

  useEffect(() => {
    fetchCurrentBudget();
  }, []);

  const now = new Date();
  const monthLabel = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const spending = currentBudget?.spending;
  const budget = currentBudget?.budget;

  const insight = useMemo(() => generateInsight(spending), [spending]);

  const handleEditBudget = useCallback(() => {
    navigation.navigate('EditBudget');
  }, [navigation]);

  const handleCategoryDetails = useCallback((category) => {
    navigation.navigate('CategoryDetail', { category });
  }, [navigation]);

  if (loading) {
    return (
      <View style={[styles.safe, styles.center]}>
        <PrimaryLoader width={80} height={80} />
        <Label type="bodySmall" weight="regular" color="textMuted" style={{ marginTop: hp(2) }}>
          Loading budget...
        </Label>
      </View>
    );
  }

  if (error || !budget) {
    return (
      <View style={[styles.safe, styles.center]}>
        <HomeHeader />
        <Label type="bodySmall" weight="regular" color="textMuted" style={styles.emptyText}>
          {error || 'No budget set for this month'}
        </Label>
        <PrimaryButton
          variant="primary"
          size="lg"
          label="Set Up Budget"
          onPress={handleEditBudget}
          style={{ marginTop: hp(2) }}
        />
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <HomeHeader onBellPress={() => navigation.navigate('Notifications')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.monthRow}>
          <View>
            <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.monthLabel}>
              MONTHLY BUDGET
            </Label>
            <Label type="headingMedium" weight="bold" color="textMain">
              {monthLabel}
            </Label>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={handleEditBudget} activeOpacity={0.75}>
            <Pencil size={wp(3.8)} color={theme.primary} strokeWidth={2} />
            <Label type="bodyXs" weight="semiBold" color="primary">
              Edit Budget
            </Label>
          </TouchableOpacity>
        </View>

        <TotalSpendingCard
          spentAmount={spending.total}
          limitAmount={budget.totalLimit}
          remainingAmount={spending.remaining}
          dailyAverage={spending.dailyAverage}
          percentUsed={spending.percentUsed}
        />

        <View style={styles.breakdownSection}>
          <View style={styles.breakdownHeader}>
            <Label type="headingXs" weight="bold" color="textMain">
              Category Breakdown
            </Label>
          </View>
          <View style={styles.list}>
            {spending.byCategory.map((cat) => (
              <TouchableOpacity
                key={cat.category}
                activeOpacity={0.7}
                onPress={() => handleCategoryDetails(cat.category)}
              >
                <CategoryBreakdownItem
                  iconName={cat.iconName}
                  iconBg={cat.iconBg}
                  iconColor={cat.iconColor}
                  label={cat.label}
                  spentAmount={cat.spent}
                  limitAmount={cat.limit || cat.spent}
                  barColor={cat.status === 'over' ? theme.error : cat.status === 'warning' ? '#F59E0B' : theme.primary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {insight && <SmartInsightCard message={insight} />}
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
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContent: {
      paddingBottom: hp(12),
    },
    monthRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      marginBottom: hp(2),
    },
    monthLabel: {
      letterSpacing: 0.8,
      marginBottom: hp(0.3),
    },
    editBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(1.5),
      borderWidth: 1,
      borderColor: t.primary,
      borderRadius: borderRadius.full,
      paddingHorizontal: wp(3.5),
      paddingVertical: hp(0.9),
    },
    breakdownSection: {
      marginHorizontal: wp(5),
      marginTop: hp(3),
      gap: hp(1.5),
    },
    breakdownHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    list: {
      gap: hp(1.2),
    },
    emptyText: {
      textAlign: 'center',
      paddingHorizontal: wp(10),
    },
  });

export default PlanScreen;
