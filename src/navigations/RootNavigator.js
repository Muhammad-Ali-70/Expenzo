import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';
import { useToastService } from '../utils/ToastService';
import useAuthStore, { selectPendingAction } from '../store/useAuthStore';
import {
  initializeShortcuts,
  subscribeToShortcuts,
  getInitialShortcut,
} from '../services/appShortcutsService';
import { handleShortcutAction } from '../utils/deepLinkHandler';

const RootNavigator = () => {
  const navigationRef = React.useRef();
  const toast = useToastService();
  const authStore = useAuthStore();
  const pendingAction = useAuthStore(selectPendingAction);

  useEffect(() => {
    initializeShortcuts();

    getInitialShortcut().then(shortcutItem => {
      if (shortcutItem && navigationRef.current) {
        handleShortcutAction(shortcutItem, navigationRef.current, authStore, toast);
      }
    });

    const handleShortcut = shortcutItem => {
      if (navigationRef.current) {
        handleShortcutAction(shortcutItem, navigationRef.current, authStore, toast);
      }
    };

    const unsubscribe = subscribeToShortcuts(handleShortcut);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [authStore, toast]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackNavigator pendingAction={pendingAction} />
    </NavigationContainer>
  );
};

export default RootNavigator;
