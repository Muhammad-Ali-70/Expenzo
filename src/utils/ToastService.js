import { useToast } from 'react-native-toast-notifications';

let toastRef = null;
export const setToastRef = ref => (toastRef = ref);

export const showToast = (message, options = {}) => {
  if (!toastRef) return;
  toastRef.show(message, options);
};

export const useToastService = () => {
  const toast = useToast();

  const show = (type, message, options = {}) => {
    toast.show(message, {
      type,
      placement: 'top',
      duration: 3000,
      ...options,
    });
  };

  return {
    success: (msg, opts) => show('success', msg, opts),
    warning: (msg, opts) => show('warning', msg, opts),
    error: (msg, opts) => show('danger', msg, opts),
    info: (msg, opts) => show('info', msg, opts),
    hideAll: () => toastRef?.hideAll(),
  };
};
