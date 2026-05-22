import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import OnboardingHeader from '../../components/onboarding/Onboardingheader';
import OnboardingTagline from '../../components/onboarding/Onboardingtagline';
import SectionDivider from '../../components/onboarding/Sectiondivider';
import AccountSetupCard from '../../components/onboarding/AccountSetupCard';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { ACCOUNT_CONFIG } from '../../constants/onboarding/initialConfig';
import AccountRepository from '../../database/repositories/AccountRepository';
import useAppStore from '../../store/useAppStore';

const OnboardingScreen = ({ navigation }) => {
  const setOnboardingComplete = useAppStore(s => s.setOnboardingComplete);

  const [walletBalance, setWalletBalance] = useState('');
  const [bankAccounts, setBankAccounts] = useState([]);
  const [digitalWallets, setDigitalWallets] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleGetStarted = useCallback(async () => {
    if (!walletBalance) return;

    setSaving(true);

    try {
      const records = [
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
          label: acct.label,
          color: acct.color,
          initials: acct.initials,
          balance: Number(acct.balance),
          isPrimary: idx === 0,
          sortOrder: 10 + idx,
        })),
        ...digitalWallets.map((acct, idx) => ({
          type: 'digitalWallet',
          label: acct.label,
          color: acct.color,
          initials: acct.initials,
          balance: Number(acct.balance),
          isPrimary: idx === 0,
          sortOrder: 20 + idx,
        })),
      ];

      await AccountRepository.seedFromOnboarding(records);
      setOnboardingComplete();
    } catch (e) {
      console.error('Onboarding save failed:', e);
    } finally {
      setSaving(false);
    }
  }, [walletBalance, bankAccounts, digitalWallets, setOnboardingComplete]);

  const handleSkip = useCallback(async () => {
    setSaving(true);
    try {
      setOnboardingComplete();
    } catch (e) {
      console.error('Skip failed:', e);
    } finally {
      setSaving(false);
    }
  }, [setOnboardingComplete]);

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
              // WalletCard props
              value={walletBalance}
              onChangeText={setWalletBalance}
              // BankCard / DailyPayCard lift state up via these callbacks
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surfacePrimary },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: hp(3) },
  cta: { paddingHorizontal: wp(5), marginTop: hp(3) },
});

export default OnboardingScreen;
