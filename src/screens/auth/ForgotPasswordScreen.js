import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MailCheck } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import AppTextInput from '../../components/ui/AppTextInput';
import PrimaryButton from '../../components/ui/PrimaryButton';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthTagline from '../../components/auth/AuthTagline';
import AuthFooter from '../../components/auth/AuthFooter';
import { isValidEmail } from '../../utils/validation';
import { useToastService } from '../../utils/ToastService';

const ForgotPasswordScreen = ({ navigation }) => {
  const toast = useToastService();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSubmitted(true);
    } catch (e) {
      toastRef.current.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={hp(1)}
    >
      <View style={styles.safe}>
        {/* <AuthHeader showBack onBack={() => navigation.goBack()} /> */}

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {submitted ? (
            <SuccessState
              email={email}
              onResend={handleSubmit}
              onBackToLogin={() => navigation.navigate('LoginScreen')}
            />
          ) : (
            <RequestState
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              setEmailError={setEmailError}
              loading={loading}
              onSubmit={handleSubmit}
              onBackToLogin={() => navigation.navigate('LoginScreen')}
            />
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const RequestState = ({
  email,
  setEmail,
  emailError,
  setEmailError,
  loading,
  onSubmit,
  onBackToLogin,
}) => (
  <>
    <AuthTagline
      title="Forgot Password?"
      subtitle="No worries. Enter your email and we'll send you a reset link."
    />

    <AppTextInput
      label="Email Address"
      placeholder="john@example.com"
      value={email}
      onChangeText={text => {
        setEmail(text);
        if (emailError) setEmailError('');
      }}
      keyboardType="email-address"
      autoCapitalize="none"
      error={emailError}
      leftIconName="mail"
    />

    <View style={styles.ctaWrapper}>
      <PrimaryButton
        variant="primary"
        size="lg"
        label={loading ? 'Sending…' : 'Send Reset Link'}
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
      />
    </View>

    <AuthFooter
      prompt="Remember your password?"
      actionLabel="Log In"
      onActionPress={onBackToLogin}
    />
  </>
);

const SuccessState = ({ email, onResend, onBackToLogin }) => (
  <View style={styles.successContainer}>
    <View style={styles.iconWrap}>
      <MailCheck size={wp(9)} color={colors.primary} strokeWidth={1.6} />
    </View>

    <Label
      type="h3"
      weight="extraBold"
      color="textMain"
      style={styles.successTitle}
    >
      Check your inbox
    </Label>

    <Label type="body" color="textMuted" style={styles.successSubtitle}>
      We've sent a password reset link to{' '}
      <Label type="body" weight="semiBold" color="textMain">
        {email}
      </Label>
      . It may take a minute to arrive.
    </Label>

    <View style={styles.ctaWrapper}>
      <PrimaryButton
        variant="primary"
        size="lg"
        label="Back to Log In"
        onPress={onBackToLogin}
      />
    </View>

    <View style={styles.resendRow}>
      <Label type="bodySmall" color="textMuted">
        Didn't receive it?{' '}
      </Label>
      <PrimaryButton
        variant="ghost"
        size="sm"
        label="Resend"
        onPress={onResend}
        fullWidth={false}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  ctaWrapper: { marginTop: hp(2.5), width: '100%' },
  successContainer: {
    marginTop: hp(4),
    alignItems: 'center',
  },
  iconWrap: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  successTitle: {
    marginBottom: hp(1.5),
    textAlign: 'center',
  },
  successSubtitle: {
    textAlign: 'center',
    lineHeight: hp(2.8),
    paddingHorizontal: wp(4),
    marginBottom: hp(1),
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
});

export default ForgotPasswordScreen;
