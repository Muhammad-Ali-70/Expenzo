import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanScreen from '../screens/tabs/PlanStack/PlanScreen';
import EditBudgetScreen from '../screens/tabs/PlanStack/EditBudgetScreen';
import CategoryDetailScreen from '../screens/tabs/PlanStack/CategoryDetailScreen';

const Stack = createNativeStackNavigator();

const PlanStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PlanScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PlanScreen" component={PlanScreen} />
      <Stack.Screen name="EditBudget" component={EditBudgetScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
    </Stack.Navigator>
  );
};

export default PlanStack;
