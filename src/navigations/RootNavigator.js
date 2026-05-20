import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import database from '../database';

const RootNavigator = () => (
  <DatabaseProvider database={database}>
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  </DatabaseProvider>
);

export default RootNavigator;
