import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label } from '../../constants/globalstyle';
import { useAccounts } from '../../database/hooks/useAccounts';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import useAppStore from '@store/useAppStore';

const TYPE_LABEL = {
  wallet: 'Wallet',
  bank: 'Bank',
  digitalWallet: 'Digital Wallet',
};

const AccountCard = ({ account }) => (
  <View style={styles.card}>
    <View style={[styles.dot, { backgroundColor: account.color }]} />
    <View style={styles.info}>
      <Label type="bodySmall" weight="semiBold" color="textMain">
        {account.label}
      </Label>
      <Label type="bodyXs" weight="regular" color="textMuted">
        {TYPE_LABEL[account.type]} {account.isPrimary ? '· primary' : ''}
      </Label>
    </View>
    <Label type="bodySmall" weight="semiBold" color="textMain">
      PKR {account.balance?.toLocaleString() ?? '0'}
    </Label>
  </View>
);

const DatabaseTestScreen = () => {
  const { accounts, loading, totalBalance } = useAccounts();
  const database = useDatabase();
  const setOnboardingComplete = useAppStore(s => s.setOnboardingComplete);
  const resetOnboarding = useAppStore(s => s.resetOnboarding); // see note below

  const handleClearAll = () => {
    Alert.alert(
      'Clear Everything?',
      'This will delete all DB records and reset onboarding. Cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              // Wipe all WatermelonDB tables
              await database.write(async () => {
                await database.unsafeResetDatabase();
              });

              // Reset Zustand persisted state
              resetOnboarding();

              Alert.alert('Done', 'Database and onboarding state cleared.');
            } catch (e) {
              console.error('Clear failed:', e);
              Alert.alert('Error', 'Something went wrong. Check console.');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <Label type="bodyLarge" weight="bold" color="textMain">
          DB Verification
        </Label>
        <Label type="bodyXs" weight="regular" color="textMuted">
          {accounts.length} account{accounts.length !== 1 ? 's' : ''} loaded
          from WatermelonDB
        </Label>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {loading ? (
          <Label
            type="bodySmall"
            weight="regular"
            color="textMuted"
            style={styles.center}
          >
            Loading…
          </Label>
        ) : accounts.length === 0 ? (
          <Label
            type="bodySmall"
            weight="regular"
            color="textMuted"
            style={styles.center}
          >
            No accounts found.
          </Label>
        ) : (
          <>
            {accounts.map(account => (
              <AccountCard key={account.id} account={account} />
            ))}
            <View style={styles.total}>
              <Label type="bodySmall" weight="regular" color="textMuted">
                Total Balance
              </Label>
              <Label type="bodyLarge" weight="bold" color="primary">
                PKR {totalBalance.toLocaleString()}
              </Label>
            </View>
          </>
        )}

        {/* ── Clear button ── */}
        <TouchableOpacity style={styles.clearBtn} onPress={handleClearAll}>
          <Label type="bodySmall" weight="semiBold" color="textMain">
            🗑 Clear DB + Reset Onboarding
          </Label>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surfacePrimary },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(6),
    paddingBottom: hp(2),
    gap: hp(0.4),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.outlineVariant,
  },
  scroll: { padding: wp(5), gap: hp(1.2) },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 12,
    padding: wp(4),
    gap: wp(3),
  },
  dot: { width: wp(3), height: wp(3), borderRadius: wp(1.5) },
  info: { flex: 1, gap: hp(0.3) },
  total: {
    marginTop: hp(2),
    alignItems: 'center',
    gap: hp(0.5),
    paddingTop: hp(2),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.outlineVariant,
  },
  center: { textAlign: 'center', marginTop: hp(5) },
  clearBtn: {
    marginTop: hp(3),
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.error ?? '#e53935',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default DatabaseTestScreen;
