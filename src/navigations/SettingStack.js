import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/tabs/SettingStack/SettingsScreen';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingSreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SettingSreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
