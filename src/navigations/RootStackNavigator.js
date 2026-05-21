import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AddExpenseScreen from '../screens/tabs/AddExpense/AddExpenseScreen';
import DatabaseTestScreen from '../screens/onboarding/DatabaseTestScreen';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="AuthStack" component={AuthStack} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="TabNavigator" component={TabNavigator} />
    <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
    <Stack.Screen name="DatabaseTest" component={DatabaseTestScreen} />
  </Stack.Navigator>
);

export default RootStackNavigator;
