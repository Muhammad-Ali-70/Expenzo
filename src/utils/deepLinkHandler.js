import { parseShortcutType } from '../services/appShortcutsService';

export const handleShortcutAction = (shortcutItem, navigation, authStore, toastService) => {
  const actionType = parseShortcutType(shortcutItem);
  
  if (!actionType) {
    console.warn('[DeepLink] Unknown shortcut action:', shortcutItem);
    return;
  }

  const isAuthenticated = authStore.token;
  const isOnboarded = authStore.user?.isOnboarded;

  if (!isAuthenticated) {
    toastService.info('Please log in to continue');
    authStore.setPendingAction(actionType);
    return;
  }

  if (!isOnboarded) {
    toastService.info('Please complete onboarding first');
    authStore.setPendingAction(actionType);
    return;
  }

  setTimeout(() => {
    executeShortcutNavigation(actionType, navigation);
  }, 1000);
};

export const executeShortcutNavigation = (actionType, navigation) => {
  if (!navigation) {
    console.warn('[DeepLink] Navigation not ready');
    return;
  }

  try {
    switch (actionType) {
      case 'ADD_EXPENSE':
        if (navigation.navigate) {
          navigation.navigate('AddTransaction', { type: 'expense' });
        }
        break;
      case 'ADD_INCOME':
        if (navigation.navigate) {
          navigation.navigate('AddTransaction', { type: 'income' });
        }
        break;
      case 'VIEW_HISTORY':
        if (navigation.navigate) {
          navigation.navigate('TabNavigator', {
            screen: 'History',
          });
        }
        break;
      default:
        console.warn('[DeepLink] Unhandled action type:', actionType);
    }
  } catch (error) {
    console.error('[DeepLink] Navigation error:', error);
  }
};

export const executePendingAction = (pendingAction, navigation, clearPendingAction) => {
  if (!pendingAction) return;

  executeShortcutNavigation(pendingAction, navigation);
  clearPendingAction();
};
