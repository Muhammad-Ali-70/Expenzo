import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import AppTextInput from '../../components/ui/AppTextInput';
import PrimaryButton from '../../components/ui/PrimaryButton';
import AuthTagline from '../../components/auth/AuthTagline';
import AuthFooter from '../../components/auth/AuthFooter';
import TermsAgreementRow from '../../components/auth/TermsAgreementRow';
import SectionDivider from '../../components/onboarding/Sectiondivider';
import { validateSignUp } from '../../utils/validation';
import { useToastService } from '../../utils/ToastService';
import GoogleImage from '../../assets/images/static/logos/google.png';
import useAuthStore from '../../store/useAuthStore';

const SignUpScreen = ({ navigation }) => {
  const toast = useToastService();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const { signup, isLoading } = useAuthStore();

  const [fullName, setFullName] = useState('Argon James');
  const [email, setEmail] = useState('tridduxasifeu-6204@yopmail.com');
  const [password, setPassword] = useState('admin@123');
  const [confirmPassword, setConfirmPassword] = useState('admin@123');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const clearError = key => setErrors(prev => ({ ...prev, [key]: undefined }));

  const handleSignUp = async () => {
    const validationErrors = validateSignUp({
      fullName,
      email,
      password,
      confirmPassword,
      agreedToTerms,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const result = await signup({
      name: fullName.trim(),
      email: email.trim(),
      password,
    });

    if (result.success) {
      toastRef.current.success(
        `Welcome to Expenzo, ${fullName.split(' ')[0]}!`,
      );
    } else {
      toastRef.current.error(
        result.message || 'Sign up failed. Please try again.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={hp(1)}
    >
      <View style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthTagline
            title="Create Account"
            subtitle="Join Expenzo to start tracking your finances with precision."
          />

          <AppTextInput
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={text => {
              setFullName(text);
              clearError('fullName');
            }}
            autoCapitalize="words"
            error={errors.fullName}
            leftIconName="user"
          />

          <AppTextInput
            label="Email Address"
            placeholder="john@example.com"
            value={email}
            onChangeText={text => {
              setEmail(text);
              clearError('email');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIconName="mail"
          />

          <AppTextInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={text => {
              setPassword(text);
              clearError('password');
            }}
            secureTextEntry={!showPassword}
            error={errors.password}
            leftIconName="lock"
            rightIconName={showPassword ? 'eye' : 'eye-off'}
            onRightIconPress={() => setShowPassword(v => !v)}
          />

          <AppTextInput
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              clearError('confirmPassword');
            }}
            secureTextEntry={!showConfirm}
            error={errors.confirmPassword}
            leftIconName="lock"
            rightIconName={showConfirm ? 'eye' : 'eye-off'}
            onRightIconPress={() => setShowConfirm(v => !v)}
          />

          <TermsAgreementRow
            checked={agreedToTerms}
            onToggle={() => {
              setAgreedToTerms(v => !v);
              clearError('agreedToTerms');
            }}
            error={errors.agreedToTerms}
            onTermsPress={() => {}}
            onPrivacyPress={() => {}}
          />

          <View style={styles.ctaWrapper}>
            <PrimaryButton
              variant="primary"
              size="lg"
              label={isLoading ? 'Creating account…' : 'Sign Up'}
              onPress={handleSignUp}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          <SectionDivider label="OR CONTINUE WITH" style={styles.divider} />

          <PrimaryButton
            variant="outline"
            size="lg"
            label="Google"
            leftIcon={
              <Image
                source={GoogleImage}
                style={styles.googleLogo}
                resizeMode="contain"
              />
            }
            onPress={() => {}}
          />

          <AuthFooter
            prompt="Already have an account?"
            actionLabel="Log In"
            onActionPress={() => navigation.navigate('LoginScreen')}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  ctaWrapper: { marginTop: hp(2.5) },
  divider: { paddingHorizontal: 0 },
  googleLogo: {
    width: 25,
    height: 25,
  },
});

export default SignUpScreen;
