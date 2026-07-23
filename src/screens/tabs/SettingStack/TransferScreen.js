import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { ArrowRightLeft, CheckCircle } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { Label, borderRadius } from '../../../constants/globalstyle';
import ScreenHeader from '../../../components/common/Screenheader';
import AppTextInput from '../../../components/ui/AppTextInput';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import SelectableIcon from '../../../components/ui/SelectableIcon';
import CurrencyView from '../../../components/common/CurrencyView';
import { transferFundsApi } from '../../../services/accountService';
import { getAccountTypeMeta } from '../../../constants/theme/accountMeta';
import { getAccountMeta } from '../../../utils/accountMetaLookup';
import useAccountStore from '../../../store/useAccountStore';
import { useToastService } from '../../../utils/ToastService';

const TransferScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const toast = useToastService();
  const accounts = useAccountStore(s => s.accounts);
  const fetchAccounts = useAccountStore(s => s.fetchAccounts);

  const [fromAccountId, setFromAccountId] = useState(null);
  const [toAccountId, setToAccountId] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const fromAccount = useMemo(
    () => accounts.find(a => a._id === fromAccountId),
    [accounts, fromAccountId],
  );
  const toAccount = useMemo(
    () => accounts.find(a => a._id === toAccountId),
    [accounts, toAccountId],
  );

  const groupedAccounts = useMemo(() => {
    return ['wallet', 'bank', 'digitalWallet']
      .map(type => ({
        type,
        label: (getAccountTypeMeta(type).label || type).toUpperCase() + 'S',
        items: accounts.filter(a => a.type === type),
      }))
      .filter(g => g.items.length > 0);
  }, [accounts]);

  const validToAccounts = useMemo(() => {
    return accounts.filter(a => a._id !== fromAccountId);
  }, [accounts, fromAccountId]);

  const handleTransfer = useCallback(async () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    if (!fromAccountId || !toAccountId) {
      Alert.alert('Missing Accounts', 'Please select both source and destination accounts.');
      return;
    }
    if (fromAccountId === toAccountId) {
      Alert.alert('Same Account', 'Source and destination must be different.');
      return;
    }
    if (fromAccount && fromAccount.balance < parsedAmount) {
      Alert.alert('Insufficient Balance', `Only PKR ${fromAccount.balance.toLocaleString()} available in ${fromAccount.label}.`);
      return;
    }

    setSaving(true);
    try {
      await transferFundsApi({
        fromAccountId,
        toAccountId,
        amount: parsedAmount,
        description: description.trim() || undefined,
      });
      await fetchAccounts();
      toast.success('Transfer completed successfully');
      navigation.goBack();
    } catch (e) {
      const message = e?.message || 'Transfer failed. Please try again.';
      if (message === 'Insufficient balance in source account.') {
        toast.warning('Insufficient balance in source account.');
      } else {
        toast.error(message);
      }
    } finally {
      setSaving(false);
    }
  }, [amount, fromAccountId, toAccountId, fromAccount, description, fetchAccounts, navigation, toast]);

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenHeader
        title="Transfer Funds"
        onBack={() => navigation.goBack()}
        backIcon="arrow"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <ArrowRightLeft size={wp(10)} color={theme.primary} strokeWidth={1.5} />
          <Label type="bodySmall" weight="regular" color="textMuted" style={styles.heroText}>
            Move money between your accounts
          </Label>
        </View>

        <View style={styles.form}>
          <Label type="bodyMedium" weight="semiBold" color="textMain">
            From Account
          </Label>
          {groupedAccounts.map(group => (
            <View key={group.type}>
              <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.sectionLabel}>
                {group.label}
              </Label>
              <View style={styles.accountRow}>
                {group.items.map(account => {
                  const meta = getAccountTypeMeta(account.type);
                  const imageMeta = getAccountMeta(account.type, account.sourceId);
                  const isSelected = fromAccountId === account._id;
                  return (
                    <View key={account._id} style={styles.accountItem}>
                      <SelectableIcon
                        iconName={meta.iconName}
                        iconBg={meta.iconBg}
                        iconColor={meta.iconColor}
                        label={account.label}
                        active={isSelected}
                        onPress={() => {
                          setFromAccountId(account._id);
                          if (toAccountId === account._id) setToAccountId(null);
                        }}
                        size="grid"
                        imageUri={imageMeta.imageUri}
                        initials={imageMeta.initials}
                        color={imageMeta.color}
                      />
                      <CurrencyView
                        amount={account.balance ?? 0}
                        type="caption"
                        weight="regular"
                        color={isSelected ? 'primary' : 'textMuted'}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          ))}

          {fromAccountId && (
            <>
              <View style={styles.arrowDown}>
                <ArrowRightLeft size={wp(5)} color={theme.textMuted} strokeWidth={1.5} />
              </View>

              <Label type="bodyMedium" weight="semiBold" color="textMain">
                To Account
              </Label>
              {groupedAccounts.map(group => {
                const items = group.items.filter(a => a._id !== fromAccountId);
                if (items.length === 0) return null;
                return (
                  <View key={group.type}>
                    <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.sectionLabel}>
                      {group.label}
                    </Label>
                    <View style={styles.accountRow}>
                      {items.map(account => {
                        const meta = getAccountTypeMeta(account.type);
                        const imageMeta = getAccountMeta(account.type, account.sourceId);
                        return (
                          <View key={account._id} style={styles.accountItem}>
                            <SelectableIcon
                              iconName={meta.iconName}
                              iconBg={meta.iconBg}
                              iconColor={meta.iconColor}
                              label={account.label}
                              active={toAccountId === account._id}
                              onPress={() => setToAccountId(account._id)}
                              size="grid"
                              imageUri={imageMeta.imageUri}
                              initials={imageMeta.initials}
                              color={imageMeta.color}
                            />
                            <CurrencyView
                              amount={account.balance ?? 0}
                              type="caption"
                              weight="regular"
                              color={toAccountId === account._id ? 'primary' : 'textMuted'}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </>
          )}

          {fromAccountId && toAccountId && (
            <>
              <AppTextInput
                label="Transfer Amount"
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                leftIconName="card"
              />

              {fromAccount && parseFloat(amount) > 0 && (
                <View style={styles.previewBox}>
                  <Label type="bodySmall" weight="regular" color="textMuted">
                    {fromAccount.label}{' '}
                    <Label type="bodySmall" weight="semiBold" color="error">
                      -PKR {parseFloat(amount).toLocaleString()}
                    </Label>
                    {'  →  '}
                    {toAccount?.label}{' '}
                    <Label type="bodySmall" weight="semiBold" color="primary">
                      +PKR {parseFloat(amount).toLocaleString()}
                    </Label>
                  </Label>
                </View>
              )}

              <AppTextInput
                label="Description (optional)"
                placeholder="e.g., Monthly savings transfer"
                value={description}
                onChangeText={setDescription}
              />
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          variant="primary"
          size="lg"
          label={saving ? 'Transferring…' : 'Transfer'}
          icon={<CheckCircle size={wp(5)} color={theme.onPrimary} />}
          onPress={handleTransfer}
          disabled={saving || !fromAccountId || !toAccountId || !amount}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: t.background },
    scrollContent: { paddingBottom: hp(2) },
    hero: {
      alignItems: 'center',
      paddingVertical: hp(3),
      gap: hp(1),
    },
    heroText: { textAlign: 'center', paddingHorizontal: wp(10) },
    form: { paddingHorizontal: wp(5), gap: hp(1.5) },
    sectionLabel: {
      letterSpacing: 0.8,
      marginBottom: hp(0.5),
    },
    accountRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: wp(2),
      marginBottom: hp(1.5),
    },
    accountItem: {
      alignItems: 'center',
      gap: hp(0.3),
    },
    arrowDown: {
      alignItems: 'center',
      paddingVertical: hp(0.5),
    },
    previewBox: {
      backgroundColor: t.surfaceSecondary,
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      borderRadius: borderRadius.lg,
      alignItems: 'center',
    },
    footer: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
      backgroundColor: t.background,
    },
  });

export default TransferScreen;
