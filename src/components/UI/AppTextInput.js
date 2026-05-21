import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Label, borderRadius } from '../../constants/globalstyle';
import colors from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Search,
  Phone,
  Calendar,
  CreditCard,
} from 'lucide-react-native';

const ICON_MAP = {
  user: User,
  mail: Mail,
  lock: Lock,
  eye: Eye,
  'eye-off': EyeOff,
  search: Search,
  phone: Phone,
  calendar: Calendar,
  card: CreditCard,
};

const AppIcon = ({ name, size = wp(4.5), color = colors.textMuted }) => {
  const Icon = ICON_MAP[name];
  return Icon ? <Icon size={size} color={color} /> : null;
};

const AppTextInput = ({
  label,
  leftIconName,
  rightIconName,
  onRightIconPress,
  secureTextEntry = false,
  error,
  containerStyle,
  inputStyle,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : focused
    ? colors.primary
    : colors.outlineVariant;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Label
          type="bodySmall"
          weight="semiBold"
          color="textMain"
          style={styles.label}
        >
          {label}
        </Label>
      ) : null}

      <View style={[styles.inputRow, { borderColor }]}>
        {leftIconName ? (
          <View style={styles.leftIcon}>
            <AppIcon name={leftIconName} />
          </View>
        ) : null}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {rightIconName ? (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            <AppIcon name={rightIconName} />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Label type="bodyXs" color="error" style={styles.error}>
          {error}
        </Label>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: hp(1) },
  label: { marginBottom: hp(0.7) },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    height: hp(6),
    paddingHorizontal: wp(4),
  },
  leftIcon: { marginRight: wp(2.5) },
  rightIcon: { marginLeft: wp(2.5) },
  input: {
    flex: 1,
    color: colors.textMain,
    fontSize: 14,
    paddingVertical: 0,
  },
  error: { marginTop: hp(0.5), marginLeft: wp(1) },
});

export default AppTextInput;
