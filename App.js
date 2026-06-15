import React from 'react';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View, StyleSheet } from 'react-native';
import useAppStore from '@store/useAppStore';
import { useThemeColors } from '@hooks/useThemeColors';
import ToastCustomProvider from '@contexts/ToastProvider.js';
import RootNavigator from '@navigations/RootNavigator.js';
import { initSentry } from '@services/sentry.js';
import { Label } from '@constants/globalstyle.js';
import PrimaryButton from '@components/ui/PrimaryButton.js';

initSentry();

const ErrorFallback = ({ resetError }) => {
  const theme = useThemeColors();
  return (
    <View style={[fallbackStyles.container, { backgroundColor: theme.background }]}>
      <Label
        type="displayMd"
        weight="bold"
        color="textMain"
        style={fallbackStyles.emoji}
      >
        ⚠️
      </Label>
      <Label
        type="h3"
        weight="semiBold"
        color="textMain"
        style={fallbackStyles.title}
      >
        Something went wrong
      </Label>
      <Label type="body" color="textMuted" style={fallbackStyles.subtitle}>
        The error has been reported. Please restart the app.
      </Label>
      <PrimaryButton
        variant="primary"
        size="lg"
        label="Try Again"
        onPress={resetError}
      />
    </View>
  );
};

const AppContent = () => {
  const theme = useAppStore(state => state.theme);
  const colors = useThemeColors();
  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }} />
      <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
        <StatusBar hidden={false} barStyle={barStyle} translucent />
        <RootNavigator />
      </View>
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: colors.white }} />
    </View>
  );
};

const App = () => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ resetError }) => <ErrorFallback resetError={resetError} />}
    >
      <SafeAreaProvider>
        <ToastCustomProvider>
          <AppContent />
        </ToastCustomProvider>
      </SafeAreaProvider>
    </Sentry.ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContainer: { flex: 1 },
});

const fallbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  emoji: { marginBottom: 8 },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', lineHeight: 22, marginBottom: 8 },
});

export default Sentry.wrap(App);
