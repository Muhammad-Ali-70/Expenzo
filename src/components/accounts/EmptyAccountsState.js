import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Wallet } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import PrimaryButton from '../ui/PrimaryButton';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const EmptyAccountsState = ({ onGetStarted }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Wallet size={wp(20)} color={theme.textMuted} strokeWidth={1.5} />
      </View>

      <Label type="h3" weight="bold" color="textMain" style={styles.title}>
        No Accounts Found
      </Label>

      <Label type="bodySmall" weight="regular" color="textMuted" style={styles.message}>
        You don't have any accounts set up yet. Add your first account to start tracking your finances.
      </Label>

      <PrimaryButton
        variant="primary"
        size="lg"
        label="Get Started"
        onPress={onGetStarted}
        style={styles.button}
      />
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  iconContainer: {
    marginBottom: hp(3),
    opacity: 0.3,
  },
  title: {
    marginBottom: hp(1),
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: hp(3),
    lineHeight: 20,
  },
  button: {
    minWidth: wp(50),
  },
});

export default EmptyAccountsState;
