import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Edit2, Trash2 } from 'lucide-react-native';
import { borderRadius, Label } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import { getAccountMeta } from '../../utils/accountMetaLookup';
import AccountAvatar from '../ui/AccountAvatar';

const TYPE_LABEL = {
  wallet: 'Wallet',
  bank: 'Bank Account',
  digitalWallet: 'Digital Wallet',
};

const AccountCard = ({ account, onEdit, onDelete, isLast }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  const imageMeta = getAccountMeta(account.type, account.sourceId);

  return (
    <View style={[styles.container, !isLast && styles.divider]}>
      <AccountAvatar
        imageUri={imageMeta.imageUri}
        initials={account.initials || imageMeta.initials}
        color={account.color || imageMeta.color}
        size={wp(12)}
      />

      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Label type="bodySmall" weight="semiBold" color="textMain">
            {account.label}
          </Label>
          {account.isPrimary && (
            <View style={styles.primaryBadge}>
              <Label type="bodyXs" weight="semiBold" color="primary">
                Primary
              </Label>
            </View>
          )}
        </View>
        <Label type="bodyXs" weight="regular" color="textMuted">
          {TYPE_LABEL[account.type] || account.type}
        </Label>
        <CurrencyView
          amount={account.balance ?? 0}
          type="bodySmall"
          weight="semiBold"
          color="textMain"
          style={styles.balance}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onEdit}
          activeOpacity={0.7}
          style={[styles.actionBtn, { backgroundColor: theme.primaryContainer }]}
        >
          <Edit2 size={wp(4)} color={theme.primary} strokeWidth={2} />
        </TouchableOpacity>
        {account.type !== 'wallet' && (
          <TouchableOpacity
            onPress={onDelete}
            activeOpacity={0.7}
            style={[styles.actionBtn, { backgroundColor: theme.errorContainer }]}
          >
            <Trash2 size={wp(4)} color={theme.error} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    gap: wp(3),
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: t.outlineVariant,
  },
  info: {
    flex: 1,
    gap: hp(0.3),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  primaryBadge: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.2),
    backgroundColor: t.primaryContainer,
    borderRadius: borderRadius.sm,
  },
  balance: {
    marginTop: hp(0.3),
  },
  actions: {
    flexDirection: 'row',
    gap: wp(2),
  },
  actionBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccountCard;
