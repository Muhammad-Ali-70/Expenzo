import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { setToastRef } from '../utils/ToastService';
import { hp, wp } from '../constants/responsive';
import { borderRadiusPrimary, Label } from '../constants/globalstyle';
import { RFValue } from 'react-native-responsive-fontsize';

const TOAST_CONFIG = {
  success: {
    bg: '#F0FDF4',
    border: '#86EFAC',
    color: '#16A34A',
    emoji: '✅',
  },
  danger: {
    bg: '#FEF2F2',
    border: '#FCA5A5',
    color: '#DC2626',
    emoji: '❌',
  },
  warning: {
    bg: '#fff5e4',
    border: '#d0ad76',
    color: '#B45309',
    emoji: '⚠️',
  },
};

const CustomToast = ({ message, type }) => {
  const config = TOAST_CONFIG[type] ?? TOAST_CONFIG.success;

  return (
    <View
      style={[
        styles.toast,
        { backgroundColor: config.bg, borderColor: config.border },
      ]}
    >
      <Label type="bodySmall" weight="regular" style={styles.emoji}>
        {config.emoji}
      </Label>
      <Label
        type="bodySmall"
        weight="semiBold"
        color={config.color}
        style={styles.text}
      >
        {message}
      </Label>
    </View>
  );
};

const ToastCustomProvider = ({ children }) => {
  useEffect(() => () => setToastRef(null), []);

  return (
    <ToastProvider
      onRef={ref => setToastRef(ref)}
      placement="top"
      duration={3000}
      offsetTop={60}
      swipeEnabled
      maxToasts={3}
      renderToast={toast => <CustomToast {...toast} />}
    >
      {children}
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    borderRadius: borderRadiusPrimary,
    borderWidth: 1,
    marginVertical: 8,
  },
  emoji: {
    fontSize: RFValue(12),
  },
  text: {
    fontSize: RFValue(10),
    flexShrink: 1,
  },
});

export default ToastCustomProvider;
