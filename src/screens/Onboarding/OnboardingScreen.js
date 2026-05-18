import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label } from '../../constants/globalstyle';
import OnboardingHeader from '../../components/onboarding/Onboardingheader';
import OnboardingHeroImage from '../../components/onboarding/Onboardingheroimage';
import OnboardingTagline from '../../components/onboarding/Onboardingtagline';
import SectionDivider from '../../components/onboarding/Sectiondivider';
import { ACCOUNT_CONFIG } from '../../constants/onboarding/initialConfig';
import PrimaryButton from '../../components/ui/PrimaryButton';
import AccountSetupCard from '../../components/onboarding/AccountSetupCard';

const OnboardingScreen = ({ navigation }) => {
  const [balances, setBalances] = useState({
    walletCash: '',
    bankBalance: '',
    savings: '',
  });
  const [activeCardId, setActiveCardId] = useState(null);

  const handleBalanceChange = (id, text) => {
    setBalances(prev => ({ ...prev, [id]: text }));
  };

  const handleCardPress = id => {
    setActiveCardId(prev => (prev === id ? null : id));
  };

  const handleGetStarted = () => navigation?.navigate('TabNavigator');
  const handleSkip = () => navigation?.navigate('TabNavigator');
  const handleLogIn = () => navigation?.navigate('TabNavigator');

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
          <OnboardingHeroImage
            source={require('../../assets/images/onboarding/onboardingHero.png')}
          />

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
              value={balances[account.id]}
              onChangeText={text => handleBalanceChange(account.id, text)}
              isActive={activeCardId === account.id}
              onPress={() => handleCardPress(account.id)}
            />
          ))}

          <View style={styles.ctaContainer}>
            <PrimaryButton
              variant="primary"
              size="lg"
              label="Get Started"
              onPress={handleGetStarted}
            />

            <TouchableOpacity
              onPress={handleLogIn}
              activeOpacity={0.6}
              style={styles.loginRow}
            >
              <Label type="bodySmall" weight="regular" color="textMuted">
                Already have an account?{' '}
              </Label>
              <Label type="bodySmall" weight="semiBold" color="primary">
                Log In
              </Label>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(3),
  },
  ctaContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(3),
    gap: hp(1.5),
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
