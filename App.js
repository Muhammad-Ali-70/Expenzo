import React from 'react';
import RootNavigator from './src/navigations/RootNavigator.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View, StyleSheet } from 'react-native';
import colors from './src/constants/colors.js';
import ToastCustomProvider from './src/contexts/ToastProvider.js';

const App = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topSafeArea: {
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottomSafeArea: {
    backgroundColor: colors.white,
  },
});

export default App;
