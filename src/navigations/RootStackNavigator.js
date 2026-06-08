import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuthStore, {
  selectToken,
  selectIsOnboarded,
} from '../store/useAuthStore';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AuthStack from './AuthStack';
import AddTransactionScreen from '../screens/tabs/AddTrasaction/AddTransactionScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  const token = useAuthStore(selectToken);
  const isOnboarded = useAuthStore(selectIsOnboarded);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  if (!token) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    );
  }

  if (!isOnboarded) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
