import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import AppCheckbox from '../ui/AppCheckbox';

const TermsAgreementRow = ({
  checked,
  onToggle,
  onTermsPress,
  onPrivacyPress,
  error,
  style,
}) => (
  <View style={[styles.wrapper, style]}>
    <View style={styles.row}>
      <AppCheckbox
        checked={checked}
        onToggle={onToggle}
        style={styles.checkbox}
      />
      <View style={styles.textWrap}>
        <Label type="bodySmall" color="textMuted">
          By creating an account, I agree to the{' '}
        </Label>
        <TouchableOpacity activeOpacity={0.7} onPress={onTermsPress}>
          <Label type="bodySmall" weight="semiBold" color="primary">
            Terms of Service
          </Label>
        </TouchableOpacity>
        <Label type="bodySmall" color="textMuted">
          {' '}
          and{' '}
        </Label>
        <TouchableOpacity activeOpacity={0.7} onPress={onPrivacyPress}>
          <Label type="bodySmall" weight="semiBold" color="primary">
            Privacy Policy
          </Label>
        </TouchableOpacity>
        <Label type="bodySmall" color="textMuted">
          .
        </Label>
      </View>
    </View>

    {error ? (
      <Label type="bodyXs" color="error" style={styles.error}>
        {error}
      </Label>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: hp(0.5),
    marginBottom: hp(0.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginTop: hp(0.3),
    marginRight: wp(3),
    flexShrink: 0,
  },
  textWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  error: {
    marginTop: hp(0.5),
    marginLeft: wp(8),
  },
});

export default TermsAgreementRow;
