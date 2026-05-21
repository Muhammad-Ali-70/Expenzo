import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from '../services/supabase';
import useAppStore from '../store/useAppStore';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AddExpenseScreen from '../screens/tabs/AddExpense/AddExpenseScreen';
import DatabaseTestScreen from '../screens/onboarding/DatabaseTestScreen';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const [session, setSession] = useState(undefined);
  const [showSplash, setShowSplash] = useState(true);
  const hasCompletedOnboarding = useAppStore(s => s.hasCompletedOnboarding);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const splashTimer = setTimeout(() => setShowSplash(false), 1500);

    return () => {
      subscription.unsubscribe();
      clearTimeout(splashTimer);
    };
  }, []);

  // still loading
  if (session === undefined || showSplash) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  // no session → auth flow
  if (!session) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    );
  }

  // has session, no onboarding
  if (!hasCompletedOnboarding) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    );
  }

  // fully authenticated + onboarded
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="DatabaseTest" component={DatabaseTestScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
