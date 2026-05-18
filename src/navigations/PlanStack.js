import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanScreen from '../screens/tabs/PlanStack/PlanScreen';

const Stack = createNativeStackNavigator();

const PlanStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PlanScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PlanScreen" component={PlanScreen} />
    </Stack.Navigator>
  );
};

export default PlanStack;
