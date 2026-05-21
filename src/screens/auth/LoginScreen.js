import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import AppTextInput from '../../components/ui/AppTextInput';
import PrimaryButton from '../../components/ui/PrimaryButton';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthTagline from '../../components/auth/AuthTagline';
import AuthFooter from '../../components/auth/AuthFooter';
import SectionDivider from '../../components/onboarding/Sectiondivider';
import { Label } from '../../constants/globalstyle';
import { isValidEmail, isStrongPassword } from '../../utils/validation';
import { useToastService } from '../../utils/ToastService';
import GoogleImage from '../../assets/images/static/logos/google.png';
import { supabase } from '../../services/supabase';
import LoginImage from '../../assets/images/auth/login.png';

const LoginScreen = ({ navigation }) => {
  const toast = useToastService();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const clearError = key => setErrors(prev => ({ ...prev, [key]: undefined }));

  const handleLogin = useCallback(async () => {
    const newErrors = {};

    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!isStrongPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      toastRef.current.success('Welcome back!');
    } catch (e) {
      toastRef.current.error(
        e.message ?? 'Login failed. Please check your credentials.',
      );
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={hp(1)}
    >
      <View style={styles.safe}>
        {/* <AuthHeader showBack={false} /> */}

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthTagline
            title="Welcome Back"
            subtitle="Sign in to continue tracking your finances."
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

          <TouchableOpacity
            style={styles.forgotBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Label type="bodySmall" weight="semiBold" color="primary">
              Forgot Password?
            </Label>
          </TouchableOpacity>

          <View style={styles.ctaWrapper}>
            <PrimaryButton
              variant="primary"
              size="lg"
              label={loading ? 'Signing in…' : 'Log In'}
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
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
            prompt="Don't have an account?"
            actionLabel="Sign Up"
            onActionPress={() => navigation.navigate('SignUpScreen')}
          />
        </ScrollView>

        {/* <Image
          source={LoginImage}
          style={styles.illustration}
          resizeMode="contain"
        /> */}
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: hp(-0.5),
    marginBottom: hp(1),
  },
  ctaWrapper: { marginTop: hp(1.5) },
  divider: { paddingHorizontal: 0 },

  googleLogo: {
    width: 25,
    height: 25,
  },
  illustration: {
    position: 'absolute',
    bottom: hp(0),
    right: wp(-5),
    width: wp(65),
    height: wp(65),
    opacity: 0.92,
  },
});

export default LoginScreen;
