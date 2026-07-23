import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HomeHeader from '../../../components/home/HomeHeader';
import SettingsProfileCard from '../../../components/settings/SettingsProfileCard';
import SettingsSection from '../../../components/settings/SettingsSection';
import SettingsRow from '../../../components/settings/SettingsRow';
import { Label, borderRadius } from '../../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp, wp } from '../../../constants/responsive';
import { useNavigation } from '@react-navigation/native';
import SignOutButton from '../../../components/settings/SignOutButton';
import ExportModal from '../../../components/modals/export/ExportModal';
import { useAccounts } from '../../../database/hooks/useAccounts';
import useAppStore from '@store/useAppStore';
import useAuthStore, { selectDisplayName } from '../../../store/useAuthStore';

const TYPE_LABEL = {
  wallet: 'Wallet',
  bank: 'Bank',
  digitalWallet: 'Digital Wallet',
};

const AccountRow = ({ account, isLast, tc }) => (
  <View
    style={[
      styles.accountRow,
      !isLast && {
        borderBottomWidth: 0.5,
        borderBottomColor: tc.outlineVariant,
      },
    ]}
  >
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

const SettingsScreen = () => {
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const user = useAuthStore(s => s.user);
  const displayName = useAuthStore(selectDisplayName);
  const { accounts, loading, totalBalance } = useAccounts();
  const theme = useAppStore(s => s.theme);
  const toggleTheme = useAppStore(s => s.toggleTheme);
  const logout = useAuthStore(s => s.logout);

  const darkMode = theme === 'dark';
  const themeColors = useThemeColors();

  const navigation = useNavigation();

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

  return (
    <View style={[styles.safe, { backgroundColor: themeColors.background }]}>
      <HomeHeader onBellPress={() => navigation.navigate('Notifications')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SettingsProfileCard
          name={displayName}
          email={email}
          isPremium={false}
          avatarUrl={user?.avatar}
          onEditPress={() => navigation.navigate('EditProfile')}
        />

        {/* ── Preferences ── */}
        <SettingsSection title="PREFERENCES">
          <SettingsRow
            iconName="trendingup"
            title="Debt Calculator"
            subtitle="Manage your debts and loans"
            onPress={() => navigation.navigate('DebtScreen')}
            showDivider
          />
          <SettingsRow
            iconName="trendingup"
            title="Investments"
            subtitle="Track your investment returns"
            onPress={() => navigation.navigate('InvestmentsScreen')}
            showDivider
          />
          <SettingsRow
            iconName="trendingup"
            title="Transfer Funds"
            subtitle="Move money between accounts"
            onPress={() => navigation.navigate('TransferScreen')}
            showDivider
          />
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
            onPress={() => navigation.navigate('Notifications')}
            showDivider
          />
          <SettingsRow
            iconName="upload"
            title="Export Transactions"
            onPress={() => setExportModalVisible(true)}
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
              <View
                style={[
                  styles.totalRow,
                  { borderTopColor: themeColors.outlineVariant },
                ]}
              >
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

      <ExportModal
        visible={exportModalVisible}
        onClose={() => setExportModalVisible(false)}
      />
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

  version: {
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default SettingsScreen;
