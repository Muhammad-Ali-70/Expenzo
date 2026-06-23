import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label } from '../../../constants/globalstyle';
import ScreenHeader from '../../../components/common/Screenheader';
import PrimaryLoader from '../../../components/ui/PrimaryLoader';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import { getDebtByIdApi, deleteDebtApi } from '../../../services/debtService';
import { format } from 'date-fns';
import { ThemedView } from '../../../components/ui/ThemedView'; // Assuming this component exists

const DebtDetailScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [debt, setDebt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchDebtDetail = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDebtByIdApi(id);
      setDebt(data);
    } catch (err) {
      console.error('Failed to fetch debt details:', err);
      Alert.alert('Error', 'Failed to load debt details. Please try again.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [id, navigation]);

  useEffect(() => {
    fetchDebtDetail();
  }, [fetchDebtDetail]);

  const handleDeleteDebt = async () => {
    Alert.alert('Delete Debt', 'Are you sure you want to delete this debt? This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setDeleting(true);
          try {
            await deleteDebtApi(id);
            Alert.alert('Success', 'Debt deleted successfully.');
            navigation.goBack();
          } catch (err) {
            console.error('Failed to delete debt:', err);
            Alert.alert('Error', 'Failed to delete debt. Please try again.');
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.safe}>
        <ScreenHeader title="Debt Details" onBack={() => navigation.goBack()} />
        <View style={styles.loadingWrap}>
          <PrimaryLoader width={100} height={100} />
        </View>
      </View>
    );
  }

  if (!debt) {
    return (
      <View style={styles.safe}>
        <ScreenHeader title="Debt Details" onBack={() => navigation.goBack()} />
        <View style={styles.emptyWrap}>
          <Label type="bodySmall" color="textMuted">
            Debt not found.
          </Label>
          <PrimaryButton
            variant="primary"
            size="sm"
            label="Go Back"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <ThemedView style={styles.safe}>
      <ScreenHeader
        title="Debt Details"
        onBack={() => navigation.goBack()}
        rightIcon={
          <View style={styles.headerActions}>
            <PrimaryButton
              variant="ghost"
              size="sm"
              icon={<Pencil size={wp(5)} color={theme.textMain} />}
              onPress={() => navigation.navigate('AddEditDebtScreen', { debtId: debt.id })}
              style={styles.actionButton}
            />
            <PrimaryButton
              variant="dangerOutline"
              size="sm"
              icon={<Trash2 size={wp(5)} color={theme.error} />}
              onPress={handleDeleteDebt}
              loading={deleting}
              style={styles.actionButton}
            />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.detailCard}>
          <Label type="bodySmall" weight="semiBold" color="textMuted">Description</Label>
          <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{debt.description || 'N/A'}</Label>
        </View>
        <View style={styles.detailCard}>
          <Label type="bodySmall" weight="semiBold" color="textMuted">Total Amount</Label>
          <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>PKR {debt.totalAmount?.toLocaleString()}</Label>
        </View>
        <View style={styles.detailCard}>
          <Label type="bodySmall" weight="semiBold" color="textMuted">Counterparty Name</Label>
          <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{debt.counterpartyName}</Label>
        </View>
        <View style={styles.detailCard}>
          <Label type="bodySmall" weight="semiBold" color="textMuted">Counterparty Email</Label>
          <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{debt.counterpartyEmail || 'N/A'}</Label>
        </View>
        <View style={styles.detailCard}>
          <Label type="bodySmall" weight="semiBold" color="textMuted">Start Date</Label>
          <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{format(new Date(debt.startDate), 'MMM dd, yyyy')}</Label>
        </View>
        <View style={styles.detailCard}>
          <Label type="bodySmall" weight="semiBold" color="textMuted">Due Date</Label>
          <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{format(new Date(debt.dueDate), 'MMM dd, yyyy')}</Label>
        </View>
        {debt.interestRate && (
          <View style={styles.detailCard}>
            <Label type="bodySmall" weight="semiBold" color="textMuted">Interest Rate</Label>
            <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{debt.interestRate}% ({debt.interestType})</Label>
          </View>
        )}
        {debt.category && (
          <View style={styles.detailCard}>
            <Label type="bodySmall" weight="semiBold" color="textMuted">Category</Label>
            <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{debt.category}</Label>
          </View>
        )}
        {debt.notes && (
          <View style={styles.detailCard}>
            <Label type="bodySmall" weight="semiBold" color="textMuted">Notes</Label>
            <Label type="body" weight="regular" color="textMain" style={styles.detailValue}>{debt.notes}</Label>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: t.background,
    },
    loadingWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: hp(1.5),
    },
    scrollContent: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
    },
    detailCard: {
      backgroundColor: t.surfacePrimary,
      borderRadius: 12,
      padding: wp(4),
      marginBottom: hp(1.5),
      borderWidth: 1,
      borderColor: t.outlineVariant,
    },
    detailValue: {
      marginTop: hp(0.5),
    },
    headerActions: {
      flexDirection: 'row',
      gap: wp(2),
    },
    actionButton: {
        width: wp(10), // Adjust width to fit icon and make it circular or square
        height: wp(10), // Adjust height
        borderRadius: wp(5), // Half of width/height for circular
        paddingHorizontal: 0,
    },
  });

export default DebtDetailScreen;
