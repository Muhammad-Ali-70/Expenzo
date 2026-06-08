import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import AppTextInput from '../../components/ui/AppTextInput';
import PrimaryButton from '../../components/ui/PrimaryButton';
import AuthTagline from '../../components/auth/AuthTagline';
import AuthFooter from '../../components/auth/AuthFooter';
import { isValidEmail } from '../../utils/validation';
import { useToastService } from '../../utils/ToastService';
import { forgotPasswordApi } from '../../services/authService';

const ForgotPasswordScreen = ({ navigation }) => {
  const toast = useToastService();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError('');
    setLoading(true);

    try {
      await forgotPasswordApi({ email: email.trim() });
      // Navigate to OTP screen — pass email so it's pre-filled
      navigation.navigate('VerifyOTPScreen', { email: email.trim() });
    } catch (e) {
      toastRef.current.error(
        e?.response?.data?.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [email, navigation]);

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
            title="Forgot Password?"
            subtitle="No worries. Enter your email and we'll send you a 6-digit OTP."
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
              label={loading ? 'Sending OTP…' : 'Send OTP'}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            />
          </View>

          <AuthFooter
            prompt="Remember your password?"
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
});

export default ForgotPasswordScreen;
