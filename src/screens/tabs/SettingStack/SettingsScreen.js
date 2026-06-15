import React from 'react';
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
import { useThemeColors } from '@hooks/useThemeColors';
import { hp, wp } from '../../../constants/responsive';
import SignOutButton from '../../../components/settings/SignOutButton';
import { useAccounts } from '../../../database/hooks/useAccounts';
import useAppStore from '@store/useAppStore';
import useAuthStore, { selectDisplayName } from '../../../store/useAuthStore';

const TYPE_LABEL = {
  wallet: 'Wallet',
  bank: 'Bank',
  digitalWallet: 'Digital Wallet',
};

const AccountRow = ({ account, isLast, tc }) => (
  <View style={[
    styles.accountRow,
    !isLast && { borderBottomWidth: 0.5, borderBottomColor: tc.outlineVariant },
  ]}>
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
  const user = useAuthStore(s => s.user);
  const displayName = useAuthStore(selectDisplayName);
  const { accounts, loading, totalBalance } = useAccounts();
  const resetOnboarding = useAppStore(s => s.resetOnboarding);
  const theme = useAppStore(s => s.theme);
  const toggleTheme = useAppStore(s => s.toggleTheme);
  const logout = useAuthStore(s => s.logout);

  const darkMode = theme === 'dark';
  const themeColors = useThemeColors();

  const email = user?.email ?? '';

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
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
              // TODO: call API endpoint to clear user data
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
    <View style={[styles.safe, { backgroundColor: themeColors.background }]}>
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
                onValueChange={toggleTheme}
                trackColor={{
                  false: themeColors.outlineVariant,
                  true: themeColors.primaryContainer,
                }}
                thumbColor={themeColors.surfacePrimary}
              />
            }
            onPress={toggleTheme}
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
                  key={account._id || account.id}
                  account={account}
                  isLast={idx === accounts.length - 1}
                  tc={themeColors}
                />
              ))}

              {/* Total balance footer */}
              <View style={[styles.totalRow, { borderTopColor: themeColors.outlineVariant }]}>
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
            <View style={[styles.clearIcon, { backgroundColor: darkMode ? '#3B1A1A' : '#FFF0F0' }]}>
              <Trash2
                size={wp(4.5)}
                color={themeColors.error}
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
              style={[styles.destructiveLabel, { color: themeColors.error }]}
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
  },
  scrollContent: {
    paddingBottom: hp(12),
  },

  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    gap: wp(3),
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
  },
  loadingRow: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    flex: 1,
    gap: hp(0.3),
  },
  destructiveLabel: {},

  version: {
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default SettingsScreen;
