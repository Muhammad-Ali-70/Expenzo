import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import BottomSheet from '../../ui/BottomSheet';
import AppTextInput from '../../ui/AppTextInput';
import PrimaryButton from '../../ui/PrimaryButton';
import { Label } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const EditAccountModal = ({ visible, account, onClose, onSave }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [label, setLabel] = useState('');
  const [balance, setBalance] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (account && visible) {
      setLabel(account.label || '');
      setBalance(account.balance?.toString() || '0');
      setIsPrimary(account.isPrimary || false);
    }
  }, [account, visible]);

  const handleSave = async () => {
    if (!label.trim()) return;

    setSaving(true);
    await onSave({
      label: label.trim(),
      balance: parseFloat(balance) || 0,
      isPrimary,
    });
    setSaving(false);
  };

  const accountType = account?.type === 'bank' ? 'Bank Account' : 'Digital Wallet';

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Edit Account">
      <View style={styles.content}>
        <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.typeLabel}>
          {accountType.toUpperCase()}
        </Label>

        <View style={styles.section}>
          <Label type="bodySmall" weight="semiBold" color="textMain" style={styles.label}>
            Account Name
          </Label>
          <AppTextInput
            value={label}
            onChangeText={setLabel}
            placeholder="Enter account name"
            maxLength={30}
          />
        </View>

        <View style={styles.section}>
          <Label type="bodySmall" weight="semiBold" color="textMain" style={styles.label}>
            Current Balance
          </Label>
          <AppTextInput
            value={balance}
            onChangeText={setBalance}
            placeholder="0"
            keyboardType="numeric"
          />
          <Label type="bodyXs" weight="regular" color="textMuted" style={styles.hint}>
            This will update the balance directly
          </Label>
        </View>

        <View style={styles.primaryRow}>
          <View style={styles.primaryInfo}>
            <Label type="bodySmall" weight="semiBold" color="textMain">
              Set as Primary
            </Label>
            <Label type="bodyXs" weight="regular" color="textMuted">
              Primary account is used by default
            </Label>
          </View>
          <Switch
            value={isPrimary}
            onValueChange={setIsPrimary}
            trackColor={{
              false: theme.outlineVariant,
              true: theme.primaryContainer,
            }}
            thumbColor={theme.surfacePrimary}
          />
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            variant="primary"
            size="lg"
            label={saving ? 'Saving…' : 'Save Changes'}
            onPress={handleSave}
            disabled={saving || !label.trim()}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const createStyles = t => StyleSheet.create({
  content: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  typeLabel: {
    letterSpacing: 0.8,
    marginBottom: hp(2),
  },
  section: {
    marginBottom: hp(2),
  },
  label: {
    marginBottom: hp(0.8),
  },
  hint: {
    marginTop: hp(0.5),
  },
  primaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    marginBottom: hp(1),
  },
  primaryInfo: {
    flex: 1,
    gap: hp(0.3),
  },
  footer: {
    marginTop: hp(2),
  },
});

export default EditAccountModal;
