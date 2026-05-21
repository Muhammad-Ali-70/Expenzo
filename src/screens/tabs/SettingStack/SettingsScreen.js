import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Trash2 } from 'lucide-react-native';
import HomeHeader from '../../../components/home/HomeHeader';
import SettingsProfileCard from '../../../components/settings/SettingsProfileCard';
import SettingsSection from '../../../components/settings/SettingsSection';
import SettingsRow from '../../../components/settings/SettingsRow';
import { Label, borderRadius } from '../../../constants/globalstyle';
import colors from '../../../constants/colors';
import { hp, wp } from '../../../constants/responsive';
import SignOutButton from '../../../components/settings/SignOutButton';
import { supabase } from '../../../services/supabase';
import { useToastService } from '../../../utils/ToastService';
import { useAccounts } from '../../../database/hooks/useAccounts';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import useAppStore from '../../../store/useAppStore';

const TYPE_LABEL = {
  wallet: 'Wallet',
  bank: 'Bank',
  digitalWallet: 'Digital Wallet',
};

// Inline account row — matches the visual style of DatabaseTestScreen
const AccountRow = ({ account, isLast }) => (
  <View style={[styles.accountRow, !isLast && styles.accountRowDivider]}>
    <View style={[styles.accountDot, { backgroundColor: account.color }]} />
    <View style={styles.accountInfo}>
      <Label type="bodySmall" weight="semiBold" color="textMain">
        {account.label}
      </Label>
      <Label type="bodyXs" weight="regular" color="textMuted">
        {TYPE_LABEL[account.type] ?? account.type}
        {account.isPrimary ? ' · primary' : ''}
      </Label>
    </View>
    <Label type="bodySmall" weight="semiBold" color="textMain">
      PKR {account.balance?.toLocaleString() ?? '0'}
    </Label>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const toast = useToastService();

  const { accounts, loading, totalBalance } = useAccounts();
  const database = useDatabase();
  const resetOnboarding = useAppStore(s => s.resetOnboarding);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const displayName =
    user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'User';
  const email = user?.email ?? '';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data?',
      'This permanently deletes all accounts and transactions and resets the app to onboarding. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Everything',
          style: 'destructive',
          onPress: async () => {
            try {
              await database.write(async () => {
                await database.unsafeResetDatabase();
              });
              resetOnboarding();
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
      <HomeHeader onBellPress={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SettingsProfileCard
          name={displayName}
          email={email}
          isPremium={false}
          avatarSource={null}
        />

        {/* ── Preferences ── */}
        <SettingsSection title="PREFERENCES">
          <SettingsRow
            iconName="moon"
            title="Dark Mode"
            subtitle="Adjust system appearance"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{
                  false: colors.outlineVariant,
                  true: colors.primaryContainer,
                }}
                thumbColor={colors.surfacePrimary}
              />
            }
            onPress={() => setDarkMode(p => !p)}
            showDivider
          />
          <SettingsRow
            iconName="currency"
            title="Default Currency"
            subtitle="Set your primary currency"
            rightLabel="PKR"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsSection>

        {/* ── System & Data ── */}
        <SettingsSection title="SYSTEM & DATA">
          <SettingsRow
            iconName="bell"
            title="Notifications"
            onPress={() => {}}
            showDivider
          />
          <SettingsRow
            iconName="upload"
            title="Export Transactions"
            onPress={() => {}}
            showDivider
          />
          <SettingsRow
            iconName="cloud"
            title="Cloud Backup"
            subtitle="Last synced 2h ago"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsSection>

        {/* ── Accounts ── */}
        <SettingsSection title="ACCOUNTS">
          {loading ? (
            <View style={styles.loadingRow}>
              <Label type="bodySmall" weight="regular" color="textMuted">
                Loading…
              </Label>
            </View>
          ) : accounts.length === 0 ? (
            <View style={styles.loadingRow}>
              <Label type="bodySmall" weight="regular" color="textMuted">
                No accounts found.
              </Label>
            </View>
          ) : (
            <>
              {accounts.map((account, idx) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  isLast={idx === accounts.length - 1}
                />
              ))}

              {/* Total balance footer */}
              <View style={styles.totalRow}>
                <Label type="bodyXs" weight="regular" color="textMuted">
                  Total Balance
                </Label>
                <Label type="bodyMedium" weight="bold" color="primary">
                  PKR {totalBalance.toLocaleString()}
                </Label>
              </View>
            </>
          )}
        </SettingsSection>

        {/* ── Danger zone ── */}
        <SettingsSection title="DANGER ZONE">
          <TouchableOpacity
            onPress={handleClearData}
            activeOpacity={0.7}
            style={styles.clearRow}
          >
            <View style={styles.clearIcon}>
              <Trash2
                size={wp(4.5)}
                color={colors.error ?? '#e53935'}
                strokeWidth={1.8}
              />
            </View>
            <View style={styles.clearText}>
              <Label type="bodySmall" weight="semiBold" color="textMain">
                Clear All Data
              </Label>
              <Label type="bodyXs" weight="regular" color="textMuted">
                Delete all accounts &amp; transactions
              </Label>
            </View>
            <Label
              type="bodyXs"
              weight="semiBold"
              style={styles.destructiveLabel}
            >
              Reset
            </Label>
          </TouchableOpacity>
        </SettingsSection>

        <SignOutButton onPress={handleSignOut} />

        <Label
          type="bodyXs"
          weight="regular"
          color="textMuted"
          style={styles.version}
        >
          Expenzo v1.0.01 (2026)
        </Label>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: hp(12),
  },

  // Account rows
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    gap: wp(3),
  },
  accountRowDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.outlineVariant,
  },
  accountDot: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
  },
  accountInfo: {
    flex: 1,
    gap: hp(0.3),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderTopWidth: 0.5,
    borderTopColor: colors.outlineVariant,
  },
  loadingRow: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },

  // Danger zone
  clearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    gap: wp(3),
  },
  clearIcon: {
    width: wp(9),
    height: wp(9),
    borderRadius: borderRadius.lg,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    flex: 1,
    gap: hp(0.3),
  },
  destructiveLabel: {
    color: colors.error ?? '#e53935',
  },

  version: {
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default SettingsScreen;
