import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import OnboardingHeader from '../../components/onboarding/Onboardingheader';
import OnboardingTagline from '../../components/onboarding/Onboardingtagline';
import SectionDivider from '../../components/onboarding/Sectiondivider';
import AccountSetupCard from '../../components/onboarding/AccountSetupCard';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { ACCOUNT_CONFIG } from '../../constants/onboarding/initialConfig';
import useAuthStore from '../../store/useAuthStore';
import useAccountStore from '../../store/useAccountStore';
import { seedAccountsApi } from '../../services/accountService';

const OnboardingScreen = () => {
  const setOnboarded = useAuthStore(s => s.setOnboarded);
  const fetchAccounts = useAccountStore(s => s.fetchAccounts);

  const [walletBalance, setWalletBalance] = useState('');
  const [bankAccounts, setBankAccounts] = useState([]);
  const [digitalWallets, setDigitalWallets] = useState([]);
  const [saving, setSaving] = useState(false);
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleGetStarted = useCallback(async () => {
    if (!walletBalance) return;
    setSaving(true);
    try {
      const accounts = [
        {
          type: 'wallet',
          label: 'Wallet Cash',
          color: '#10B981',
          initials: 'WC',
          balance: Number(walletBalance),
          isPrimary: true,
          sortOrder: 0,
        },
        ...bankAccounts.map((acct, idx) => ({
          type: 'bank',
          sourceId: acct.id === 'other' ? null : acct.id,
          label: acct.label,
          color: acct.color,
          initials: acct.initials,
          balance: Number(acct.balance),
          isPrimary: idx === 0,
          sortOrder: 10 + idx,
        })),
        ...digitalWallets.map((acct, idx) => ({
          type: 'digitalWallet',
          sourceId: acct.id === 'other' ? null : acct.id,
          label: acct.label,
          color: acct.color,
          initials: acct.initials,
          balance: Number(acct.balance),
          isPrimary: idx === 0,
          sortOrder: 20 + idx,
        })),
      ];

      await seedAccountsApi({ accounts });

      // Pull the newly created accounts into Zustand before navigating.
      // setOnboarded() fires after so the navigator transitions only once
      // accounts are already in the store — no empty state flash.
      await fetchAccounts();
      setOnboarded();
    } catch (e) {
      console.error('Onboarding save failed:', e);
    } finally {
      setSaving(false);
    }
  }, [
    walletBalance,
    bankAccounts,
    digitalWallets,
    fetchAccounts,
    setOnboarded,
  ]);

  const handleSkip = useCallback(async () => {
    // Skipping — no accounts seeded, nothing to fetch.
    setOnboarded();
  }, [setOnboarded]);

  return (
    <View style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={hp(1)}
      >
        <OnboardingHeader onSkip={handleSkip} />

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <OnboardingTagline
            title="Master your money"
            subtitle="The effortless way to track expenses and achieve your savings goals."
          />

          <SectionDivider label="INITIAL SETUP" />

          {ACCOUNT_CONFIG.map(account => (
            <AccountSetupCard
              key={account.id}
              iconName={account.iconName}
              iconColor={account.iconColor}
              iconBg={account.iconBg}
              name={account.name}
              description={account.description}
              accountType={account.accountType}
              value={walletBalance}
              onChangeText={setWalletBalance}
              onAccountsChange={
                account.accountType === 'bank'
                  ? setBankAccounts
                  : account.accountType === 'digitalWallet'
                  ? setDigitalWallets
                  : undefined
              }
            />
          ))}

          <View style={styles.cta}>
            <PrimaryButton
              variant="primary"
              size="lg"
              label={saving ? 'Saving…' : 'Get Started'}
              onPress={handleGetStarted}
              disabled={saving}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.surfacePrimary },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: hp(3) },
  cta: { paddingHorizontal: wp(5), marginTop: hp(3) },
});

export default OnboardingScreen;
