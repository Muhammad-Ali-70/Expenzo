import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import AppCheckbox from '../ui/AppCheckbox';

const LoginOptionsRow = ({ rememberMe, onRememberMeToggle, onForgotPassword, style }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity
      style={styles.rememberRow}
      activeOpacity={0.7}
      onPress={onRememberMeToggle}
    >
      <AppCheckbox checked={rememberMe} onToggle={onRememberMeToggle} />
      <Label type="bodySmall" weight="regular" color="textMuted" style={styles.rememberLabel}>
        Remember Me
      </Label>
    </TouchableOpacity>

    <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
      <Label type="bodySmall" weight="semiBold" color="primary">
        Forgot Password?
      </Label>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberLabel: {
    marginLeft: hp(1),
  },
});

export default LoginOptionsRow;
