import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { setToastRef } from '../utils/ToastService';
import { hp, wp } from '../constants/responsive';
import { borderRadiusPrimary, Label } from '../constants/globalstyle';
import { useIsDarkMode } from '@hooks/useIsDarkMode';
import { RFValue } from 'react-native-responsive-fontsize';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react-native';

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle,
  },
  danger: {
    icon: XCircle,
  },
  warning: {
    icon: AlertTriangle,
  },
  info: {
    icon: Info,
  },
};

const LIGHT_TOAST = {
  success: {
    bg: '#F0FDF4',
    border: '#10B981',
    iconColor: '#10B981',
    textColor: '#065F46',
  },
  danger: {
    bg: '#FEF2F2',
    border: '#EF4444',
    iconColor: '#EF4444',
    textColor: '#991B1B',
  },
  warning: {
    bg: '#FFFBEB',
    border: '#F59E0B',
    iconColor: '#F59E0B',
    textColor: '#92400E',
  },
  info: {
    bg: '#EFF6FF',
    border: '#3B82F6',
    iconColor: '#3B82F6',
    textColor: '#1E40AF',
  },
};

const DARK_TOAST = {
  success: {
    bg: '#064E3B',
    border: '#10B981',
    iconColor: '#34D399',
    textColor: '#D1FAE5',
  },
  danger: {
    bg: '#7F1D1D',
    border: '#EF4444',
    iconColor: '#F87171',
    textColor: '#FEE2E2',
  },
  warning: {
    bg: '#78350F',
    border: '#F59E0B',
    iconColor: '#FBBF24',
    textColor: '#FEF3C7',
  },
  info: {
    bg: '#1E3A8A',
    border: '#3B82F6',
    iconColor: '#60A5FA',
    textColor: '#DBEAFE',
  },
};

const CustomToast = ({ message, type }) => {
  const isDark = useIsDarkMode();
  const palette = isDark ? DARK_TOAST : LIGHT_TOAST;
  const config = palette[type] ?? palette.success;
  const meta = TOAST_CONFIG[type] ?? TOAST_CONFIG.success;
  const IconComponent = meta.icon;

  return (
    <View
      style={[
        styles.toast,
        { backgroundColor: config.bg, borderColor: config.border },
      ]}
    >
      <IconComponent
        size={RFValue(16)}
        color={config.iconColor}
        strokeWidth={2.5}
      />
      <Label
        type="bodySmall"
        weight="semiBold"
        style={[styles.text, { color: config.textColor }]}
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
    gap: wp(3),
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderRadius: borderRadiusPrimary,
    borderWidth: 1.5,
    marginVertical: hp(1),
    marginHorizontal: wp(4),
  },
  text: {
    fontSize: RFValue(11),
    flexShrink: 1,
    lineHeight: RFValue(16),
  },
});

export default ToastCustomProvider;
