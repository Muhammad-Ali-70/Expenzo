import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DebtScreen from '../screens/tabs/SettingStack/DebtScreen';
import DebtDetailScreen from '../screens/tabs/SettingStack/DebtDetailScreen';
import AddEditDebtScreen from '../screens/tabs/SettingStack/AddEditDebtScreen';

const Stack = createNativeStackNavigator();

const DebtStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DebtScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DebtScreen" component={DebtScreen} />
      <Stack.Screen name="DebtDetailScreen" component={DebtDetailScreen} />
      <Stack.Screen name="AddEditDebtScreen" component={AddEditDebtScreen} />
    </Stack.Navigator>
  );
};

export default DebtStack;
