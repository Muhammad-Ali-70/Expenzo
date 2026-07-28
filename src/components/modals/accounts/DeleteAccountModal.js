import React, { useMemo } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { borderRadius, Label } from '../../../constants/globalstyle';
import PrimaryButton from '../../ui/PrimaryButton';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const DeleteAccountModal = ({ visible, account, transactionCount, onConfirm, onCancel }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <AlertTriangle size={wp(12)} color={theme.error} strokeWidth={1.5} />
              </View>

              <Label type="h3" weight="bold" color="textMain" style={styles.title}>
                Archive Account?
              </Label>

              <Label type="bodySmall" weight="regular" color="textMuted" style={styles.message}>
                Are you sure you want to archive "{account?.label}"?
              </Label>

              {transactionCount > 0 && (
                <View style={styles.infoBox}>
                  <Label type="bodyXs" weight="regular" color="textMuted">
                    This account has {transactionCount} transaction{transactionCount !== 1 ? 's' : ''}. Your transaction history will be preserved.
                  </Label>
                </View>
              )}

              <View style={styles.actions}>
                <PrimaryButton
                  variant="outline"
                  size="md"
                  label="Cancel"
                  onPress={onCancel}
                  style={styles.button}
                />
                <PrimaryButton
                  variant="error"
                  size="md"
                  label="Archive"
                  onPress={onConfirm}
                  style={styles.button}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyles = t => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  card: {
    width: '100%',
    backgroundColor: t.surfacePrimary,
    borderRadius: borderRadius.xl,
    padding: wp(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 16,
  },
  iconContainer: {
    marginBottom: hp(2),
  },
  title: {
    textAlign: 'center',
    marginBottom: hp(1),
  },
  message: {
    textAlign: 'center',
    marginBottom: hp(2),
  },
  infoBox: {
    backgroundColor: t.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: wp(3),
    marginBottom: hp(2),
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    gap: wp(3),
    width: '100%',
  },
  button: {
    flex: 1,
  },
});

export default DeleteAccountModal;
