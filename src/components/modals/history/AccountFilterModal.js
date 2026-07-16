import React, { useMemo } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import { getAccountTypeMeta } from '../../../constants/theme/accountMeta';
import { borderRadius, Label } from '../../../constants/globalstyle';
import PaymentIcon from '../../common/Paymenticon';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const TYPE_TITLE = {
  wallet: 'Wallet',
  bank: 'Bank Accounts',
  digitalWallet: 'Digital Wallets',
};

const AccountItem = ({ account, isSelected, isLast, onPress, s, theme }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[s.item, !isLast && s.itemDivider]}
    >
      <View style={[s.initials, { backgroundColor: account.color + '22' }]}>
        <Label type="bodyXs" weight="bold" style={{ color: account.color }}>
          {account.initials}
        </Label>
      </View>

      <View style={s.itemInfo}>
        <Label type="bodySmall" weight="semiBold" color="textMain">
          {account.label}
        </Label>
        <Label type="bodyXs" weight="regular" color="textMuted">
          {TYPE_TITLE[account.type] ?? account.type}
          {account.isPrimary ? ' · primary' : ''}
        </Label>
      </View>

      {isSelected && (
        <Check size={wp(5)} color={theme.primary} strokeWidth={2.5} />
      )}
    </TouchableOpacity>
  );
};

const AccountFilterModal = ({
  visible,
  accounts = [],
  selectedAccount,
  onSelect,
  onClose,
}) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleSelect = account => {
    onSelect(account);
    onClose();
  };

  const handleClearFilter = () => {
    onSelect(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Label type="bodyMedium" weight="bold" color="textMain">
                  Filter by Account
                </Label>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={styles.closeBtn}
                >
                  <X size={wp(4.5)} color={theme.textMuted} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleClearFilter}
                activeOpacity={0.7}
                style={[
                  styles.allAccountsItem,
                  !selectedAccount && styles.allAccountsItemSelected,
                ]}
              >
                <Label
                  type="bodySmall"
                  weight="semiBold"
                  color={!selectedAccount ? 'primary' : 'textMain'}
                >
                  All Accounts
                </Label>
                {!selectedAccount && (
                  <Check size={wp(5)} color={theme.primary} strokeWidth={2.5} />
                )}
              </TouchableOpacity>

              <FlatList
                data={accounts}
                keyExtractor={item => item._id || item.id}
                scrollEnabled={accounts.length > 6}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                  <AccountItem
                    account={item}
                    isSelected={selectedAccount?._id === item._id}
                    isLast={index === accounts.length - 1}
                    onPress={() => handleSelect(item)}
                    s={styles}
                    theme={theme}
                  />
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyles = t =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: wp(5),
    },
    card: {
      width: '100%',
      backgroundColor: t.surfacePrimary,
      borderRadius: borderRadius.xl,
      paddingTop: hp(2.5),
      maxHeight: '70%',
      elevation: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      paddingBottom: hp(1.5),
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    closeBtn: {
      width: wp(8),
      height: wp(8),
      borderRadius: wp(4),
      backgroundColor: t.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    allAccountsItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      paddingVertical: hp(1.8),
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    allAccountsItemSelected: {
      backgroundColor: t.surfaceSecondary,
    },
    list: {
      paddingHorizontal: wp(5),
      paddingBottom: hp(1),
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: hp(1.8),
      gap: wp(3),
    },
    itemDivider: {
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    initials: {
      width: wp(10),
      height: wp(10),
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemInfo: {
      flex: 1,
      gap: hp(0.3),
    },
  });

export default AccountFilterModal;
