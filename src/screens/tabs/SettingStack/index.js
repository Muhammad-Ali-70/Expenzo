import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './SettingsScreen';
import DebtScreen from './DebtScreen';
import DebtDetailScreen from './DebtDetailScreen';
import AddEditDebtScreen from './AddEditDebtScreen';
import InvestmentsScreen from './InvestmentsScreen';
import InvestmentSettingsScreen from './InvestmentSettingsScreen';

const SettingStack = createNativeStackNavigator();

const SettingStackNavigator = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingStack.Screen name="DebtStack" component={DebtScreen} />
      <SettingStack.Screen name="DebtDetailScreen" component={DebtDetailScreen} />
      <SettingStack.Screen name="AddEditDebtScreen" component={AddEditDebtScreen} />
      <SettingStack.Screen name="InvestmentsScreen" component={InvestmentsScreen} />
      <SettingStack.Screen name="InvestmentSettingsScreen" component={InvestmentSettingsScreen} />
    </SettingStack.Navigator>
  );
};

export default SettingStackNavigator;
