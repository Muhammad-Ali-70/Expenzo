import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';

const RootNavigator = () => (
  <NavigationContainer>
    <RootStackNavigator />
  </NavigationContainer>
);

export default RootNavigator;
