import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';

const AuthFooter = ({ prompt, actionLabel, onActionPress, style }) => (
  <View style={[styles.container, style]}>
    <Label type="bodySmall" color="textMuted">
      {prompt}{' '}
    </Label>
    <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
      <Label type="bodySmall" weight="semiBold" color="primary">
        {actionLabel}
      </Label>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
});

export default AuthFooter;
