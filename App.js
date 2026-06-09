import React from 'react';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View, StyleSheet } from 'react-native';
import colors from './src/constants/colors.js';
import ToastCustomProvider from './src/contexts/ToastProvider.js';
import RootNavigator from './src/navigations/RootNavigator.js';
import { initSentry } from './src/services/sentry.js';
import { Label } from './src/constants/globalstyle.js';
import PrimaryButton from './src/components/ui/PrimaryButton.js';

initSentry();

const ErrorFallback = ({ resetError }) => (
  <View style={fallbackStyles.container}>
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

const App = () => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ resetError }) => <ErrorFallback resetError={resetError} />}
    >
      <SafeAreaProvider>
        <ToastCustomProvider>
          <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.topSafeArea} />
            <View style={styles.mainContainer}>
              <StatusBar hidden={false} barStyle={'dark-content'} translucent />
              <RootNavigator />
            </View>
            <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea} />
          </View>
        </ToastCustomProvider>
      </SafeAreaProvider>
    </Sentry.ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  topSafeArea: { backgroundColor: colors.background },
  mainContainer: { flex: 1, backgroundColor: colors.background },
  bottomSafeArea: { backgroundColor: colors.white },
});

const fallbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: colors.background,
    gap: 12,
  },
  emoji: { marginBottom: 8 },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', lineHeight: 22, marginBottom: 8 },
});

export default Sentry.wrap(App);
