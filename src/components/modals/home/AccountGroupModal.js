import React, { useMemo } from 'react';
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
import AccountAvatar from '../../ui/AccountAvatar';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { getAccountMeta } from '../../../utils/accountMetaLookup';

const TYPE_TITLE = {
  wallet: 'Wallet',
  bank: 'Bank Accounts',
  digitalWallet: 'Digital Wallets',
};

const AccountItem = ({ account, isLast, s, theme }) => {
  const meta = getAccountTypeMeta(account.type);
  const imageMeta = getAccountMeta(account.type, account.sourceId);
  return (
    <View style={[s.item, !isLast && s.itemDivider]}>
      {imageMeta.imageUri ? (
        <AccountAvatar
          imageUri={imageMeta.imageUri}
          initials={imageMeta.initials}
          color={imageMeta.color}
          size={wp(10)}
        />
      ) : (
        <PaymentIcon
          name={meta.iconName}
          backgroundColor={meta.iconBg}
          color={meta.iconColor}
          containerSize={wp(10)}
          size={wp(4.5)}
        />
      )}

      <View style={s.itemInfo}>
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

  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
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
                  <X size={wp(4.5)} color={theme.textMuted} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Account list */}
              <FlatList
                data={accounts}
                keyExtractor={item => item._id || item.id}
                scrollEnabled={accounts.length > 5}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                <AccountItem
                  account={item}
                  isLast={index === accounts.length - 1}
                  s={styles}
                  theme={theme}
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

const createStyles = t => StyleSheet.create({
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
    borderBottomColor: t.outlineVariant,
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
    backgroundColor: t.surfaceSecondary,
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
    borderBottomColor: t.outlineVariant,
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
    borderTopColor: t.outlineVariant,
  },
});

export default AccountGroupModal;
