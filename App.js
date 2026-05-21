import React from 'react';
import RootNavigator from './src/navigations/RootNavigator.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import colors from './src/constants/colors.js';
import ToastCustomProvider from './src/contexts/ToastProvider.js';

const App = () => {
  return (
    <SafeAreaProvider>
      <ToastCustomProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          edges={['top', 'bottom']}
          backgroundColor={colors.background}
        >
          <StatusBar hidden={false} barStyle={'dark-content'} translucent />
          <RootNavigator />
        </SafeAreaView>
      </ToastCustomProvider>
    </SafeAreaProvider>
  );
};

export default App;
