import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuthStore, {
  selectToken,
  selectIsOnboarded,
} from '../store/useAuthStore';
import useAccountStore from '../store/useAccountStore';
import useCategoryStore from '../store/useCategoryStore';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AuthStack from './AuthStack';
import AddTransactionScreen from '../screens/tabs/AddTrasaction/AddTransactionScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  const token = useAuthStore(selectToken);
  const isOnboarded = useAuthStore(selectIsOnboarded);
  const fetchAccounts = useAccountStore(s => s.fetchAccounts);
  const fetchCategories = useCategoryStore(s => s.fetchCategories);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(splashTimer);
  }, []);

  // Boot-time fetch: token exists but we got here without going through login
  // (app restarted / killed and reopened). Fires once when the navigator mounts.
  useEffect(() => {
    if (token && isOnboarded) {
      fetchAccounts();
      fetchCategories();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Intentionally empty deps — we only want this to run once on mount,
  // not re-run every time token/isOnboarded change during a session.

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
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
