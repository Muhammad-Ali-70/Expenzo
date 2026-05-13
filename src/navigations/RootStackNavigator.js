import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // ← changed
import SplashScreen from '../screens/Onboarding/SplashScreen';

const Stack = createNativeStackNavigator(); // ← changed

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
