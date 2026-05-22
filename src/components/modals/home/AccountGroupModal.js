import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from 'react-native';
import { X } from 'lucide-react-native';
import { getAccountTypeMeta } from '../../../constants/theme/accountMeta';
import { borderRadius, Label } from '../../../constants/globalstyle';
import CurrencyView from '../../common/CurrencyView';
import PaymentIcon from '../../common/Paymenticon';
import { hp, wp } from '../../../constants/responsive';
import colors from '../../../constants/colors';

const TYPE_TITLE = {
  wallet: 'Wallet',
  bank: 'Bank Accounts',
  digitalWallet: 'Digital Wallets',
};

const AccountItem = ({ account, isLast }) => {
  const meta = getAccountTypeMeta(account.type);
  return (
    <View style={[styles.item, !isLast && styles.itemDivider]}>
      <View
        style={[styles.initials, { backgroundColor: account.color + '22' }]}
      >
        <Label type="bodyXs" weight="bold" style={{ color: account.color }}>
          {account.initials}
        </Label>
      </View>

      <View style={styles.itemInfo}>
        <Label type="bodySmall" weight="semiBold" color="textMain">
          {account.label}
        </Label>
        <Label type="bodyXs" weight="regular" color="textMuted">
          {TYPE_TITLE[account.type] ?? account.type}
          {account.isPrimary ? ' · primary' : ''}
        </Label>
      </View>

      <CurrencyView
        amount={account.balance ?? 0}
        type="bodySmall"
        weight="bold"
        color="textMain"
      />
    </View>
  );
};

const AccountGroupModal = ({ visible, type, accounts = [], onClose }) => {
  const meta = getAccountTypeMeta(type);
  const title = TYPE_TITLE[type] ?? 'Accounts';

  const total = accounts.reduce((sum, a) => sum + (a.balance ?? 0), 0);

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
              {/* Header */}
              <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                  <PaymentIcon
                    name={meta.iconName}
                    backgroundColor={meta.iconBg}
                    color={meta.iconColor}
                    containerSize={wp(9)}
                    size={wp(4.5)}
                  />
                  <Label type="bodyMedium" weight="bold" color="textMain">
                    {title}
                  </Label>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={styles.closeBtn}
                >
                  <X size={wp(4.5)} color={colors.textMuted} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Account list */}
              <FlatList
                data={accounts}
                keyExtractor={item => item.id}
                scrollEnabled={accounts.length > 5}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                  <AccountItem
                    account={item}
                    isLast={index === accounts.length - 1}
                  />
                )}
              />

              {/* Total footer */}
              <View style={styles.footer}>
                <Label type="bodySmall" weight="regular" color="textMuted">
                  Total
                </Label>
                <CurrencyView
                  amount={total}
                  type="bodyMedium"
                  weight="bold"
                  color="primary"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  card: {
    width: '100%',
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.xl,
    paddingTop: hp(2.5),
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingBottom: hp(1.5),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.outlineVariant,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  closeBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: wp(5),
    paddingTop: hp(0.5),
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
    borderBottomColor: colors.outlineVariant,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.8),
    borderTopWidth: 0.5,
    borderTopColor: colors.outlineVariant,
  },
});

export default AccountGroupModal;
