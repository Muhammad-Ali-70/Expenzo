import { Platform } from 'react-native';
import QuickActions from 'react-native-quick-actions';

export const SHORTCUT_TYPES = {
  ADD_EXPENSE: 'com.expenzo.addExpense',
  ADD_INCOME: 'com.expenzo.addIncome',
  VIEW_HISTORY: 'com.expenzo.viewHistory',
};

export const initializeShortcuts = () => {
  try {
    const shortcuts = [
      {
        type: SHORTCUT_TYPES.ADD_EXPENSE,
        title: 'Add Expense',
        subtitle: 'Add a new expense',
        icon: Platform.select({ ios: 'Compose', android: 'ic_launcher' }),
        userInfo: { url: 'expenzo://addExpense' },
      },
      {
        type: SHORTCUT_TYPES.ADD_INCOME,
        title: 'Add Income',
        subtitle: 'Add a new income',
        icon: Platform.select({ ios: 'Add', android: 'ic_launcher' }),
        userInfo: { url: 'expenzo://addIncome' },
      },
      {
        type: SHORTCUT_TYPES.VIEW_HISTORY,
        title: 'View History',
        subtitle: 'View transaction history',
        icon: Platform.select({ ios: 'Time', android: 'ic_launcher' }),
        userInfo: { url: 'expenzo://history' },
      },
    ];

    QuickActions.setShortcutItems(shortcuts);
  } catch (error) {
    console.error('[AppShortcuts] Error initializing shortcuts:', error);
  }
};

export const subscribeToShortcuts = callback => {
  try {
    QuickActions.popInitialAction()
      .then(callback)
      .catch(err => console.error('[AppShortcuts] Error getting initial action:', err));

    const listener = QuickActions.addListener('quickActionShortcut', callback);
    return () => listener.remove();
  } catch (error) {
    console.error('[AppShortcuts] Error subscribing to shortcuts:', error);
    return () => {};
  }
};

export const unsubscribeFromShortcuts = () => {
  try {
    QuickActions.clearShortcutItems();
  } catch (error) {
    console.error('[AppShortcuts] Error unsubscribing from shortcuts:', error);
  }
};

export const getInitialShortcut = async () => {
  try {
    const action = await QuickActions.popInitialAction();
    return action || null;
  } catch (error) {
    console.error('[AppShortcuts] Error getting initial shortcut:', error);
    return null;
  }
};

export const parseShortcutType = shortcutItem => {
  if (!shortcutItem) return null;

  const type = shortcutItem.type;

  switch (type) {
    case SHORTCUT_TYPES.ADD_EXPENSE:
      return 'ADD_EXPENSE';
    case SHORTCUT_TYPES.ADD_INCOME:
      return 'ADD_INCOME';
    case SHORTCUT_TYPES.VIEW_HISTORY:
      return 'VIEW_HISTORY';
    default:
      return null;
  }
};
