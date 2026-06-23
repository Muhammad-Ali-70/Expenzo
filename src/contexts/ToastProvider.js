import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { setToastRef } from '../utils/ToastService';
import { hp, wp } from '../constants/responsive';
import { borderRadiusPrimary, Label } from '../constants/globalstyle';
import { useIsDarkMode } from '@hooks/useIsDarkMode';
import { RFValue } from 'react-native-responsive-fontsize';

const TOAST_CONFIG = {
  success: {
    emoji: '✅',
  },
  danger: {
    emoji: '❌',
  },
  warning: {
    emoji: '⚠️',
  },
};

const LIGHT_TOAST = {
  success: { bg: '#F0FDF4', border: '#86EFAC', color: '#16A34A' },
  danger: { bg: '#FEF2F2', border: '#FCA5A5', color: '#DC2626' },
  warning: { bg: '#fff5e4', border: '#d0ad76', color: '#B45309' },
};

const DARK_TOAST = {
  success: { bg: '#052E16', border: '#166534', color: '#4ADE80' },
  danger: { bg: '#450A0A', border: '#991B1B', color: '#F87171' },
  warning: { bg: '#451A03', border: '#92400E', color: '#FBBF24' },
};

const CustomToast = ({ message, type }) => {
  const isDark = useIsDarkMode();
  const palette = isDark ? DARK_TOAST : LIGHT_TOAST;
  const config = palette[type] ?? palette.success;
  const meta = TOAST_CONFIG[type] ?? TOAST_CONFIG.success;

  return (
    <View
      style={[
        styles.toast,
        { backgroundColor: config.bg, borderColor: config.border },
      ]}
    >
      <Label type="bodySmall" weight="regular" style={styles.emoji}>
        {meta.emoji}
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
