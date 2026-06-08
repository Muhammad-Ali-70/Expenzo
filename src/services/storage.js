import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'expenzo-storage',
});

export const mmkvStorage = {
  getItem: key => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.remove(key),
};
