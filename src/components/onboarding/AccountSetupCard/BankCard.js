import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, Plus, X } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { borderRadius, Label } from '../../../constants/globalstyle';
import colors from '../../../constants/colors';
import PaymentIcon from '../../common/Paymenticon';
import CurrencyInput from '../../common/CurrencyInput';
import BankPickerModal from '../../modals/BankPickerModal';
import CardShell, { CardRow, CardInfo, CardRight } from './CardShell';
import { useBankAccounts } from '../../../hooks/AccountSetupCard/useBankAccounts';

/* ── Per-bank balance row rendered inside the card ─────────────────────── */
const BankBalanceRow = ({ account, onBalanceChange, onRemove, isPrimary }) => (
  <View style={styles.bankRow}>
    {/* Colored dot */}
    <View style={[styles.dot, { backgroundColor: account.color }]} />

    <View style={styles.bankRowInfo}>
      <Label type="bodyXs" weight="semiBold" color="textMain">
        {account.label}
        {isPrimary && (
          <Label type="bodyXs" weight="regular" color="textMuted">
            {' '}
            · main
          </Label>
        )}
      </Label>
    </View>

    <CurrencyInput
      value={account.balance}
      onChangeText={text => onBalanceChange(account.bankId, text)}
      label="Balance"
      showLabel
    />

    <TouchableOpacity
      onPress={() => onRemove(account.bankId)}
      activeOpacity={0.7}
      style={styles.removeBtn}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <X size={wp(3.2)} color={colors.textMuted} strokeWidth={2} />
    </TouchableOpacity>
  </View>
);

/* ── Main BankCard ──────────────────────────────────────────────────────── */
const BankCard = ({
  iconName,
  iconColor,
  iconBg,
  name,
  description,
  isActive,
  onPress,
  style,
  currency,
}) => {
  const {
    accounts,
    primaryAccount,
    extraAccounts,
    usedIds,
    primaryModalVisible,
    setPrimaryModalVisible,
    addModalVisible,
    setAddModalVisible,
    setPrimaryBank,
    addExtraBank,
    removeBank,
    updateBalance,
  } = useBankAccounts();

  /* Extra-banks section rendered as footer inside the card shell */
  const extraSection =
    accounts.length > 0 ? (
      <View style={styles.banksSection}>
        <View style={styles.sectionDivider} />
        {accounts.map((acct, idx) => (
          <BankBalanceRow
            key={acct.bankId}
            account={acct}
            isPrimary={idx === 0}
            onBalanceChange={updateBalance}
            onRemove={removeBank}
          />
        ))}
      </View>
    ) : null;

  return (
    <>
      <CardShell
        isActive={isActive}
        onPress={onPress}
        description={description}
        style={style}
        footer={extraSection}
      >
        <CardRow>
          <PaymentIcon
            name={iconName}
            color={iconColor}
            backgroundColor={iconBg}
            containerSize={wp(11)}
            radius={borderRadius.md}
          />

          <CardInfo>
            <Label type="bodySmall" weight="semiBold" color="textMain">
              {primaryAccount ? `${primaryAccount.label}` : name}
            </Label>
            {extraAccounts.length > 0 && (
              <Label type="bodyXs" weight="regular" color="textMuted">
                +{extraAccounts.length} more bank
                {extraAccounts.length > 1 ? 's' : ''}
              </Label>
            )}
          </CardInfo>

          <CardRight>
            {/* Primary bank picker chip */}
            <TouchableOpacity
              onPress={() => setPrimaryModalVisible(true)}
              activeOpacity={0.75}
              style={styles.pickerChip}
            >
              <Label type="bodyXs" weight="semiBold" color="primary">
                {primaryAccount ? primaryAccount.label : 'Select Bank'}
              </Label>
              <ChevronDown
                size={wp(3)}
                color={colors.primary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </CardRight>
        </CardRow>
      </CardShell>

      {/* Add another bank — sits below the card */}
      <TouchableOpacity
        onPress={() => setAddModalVisible(true)}
        activeOpacity={0.75}
        style={styles.addBtn}
      >
        <View style={styles.addIcon}>
          <Plus size={wp(3.2)} color={colors.primary} strokeWidth={2.5} />
        </View>
        <Label type="bodyXs" weight="semiBold" color="primary">
          Add another bank
        </Label>
      </TouchableOpacity>

      {/* Primary bank picker */}
      <BankPickerModal
        visible={primaryModalVisible}
        activeId={primaryAccount?.bankId}
        usedIds={[]}
        onSelect={setPrimaryBank}
        onClose={() => setPrimaryModalVisible(false)}
      />

      {/* Extra bank picker — excludes already-added banks */}
      <BankPickerModal
        visible={addModalVisible}
        activeId={null}
        usedIds={usedIds}
        onSelect={addExtraBank}
        onClose={() => setAddModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  pickerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    backgroundColor: colors.surfaceContainerLow,
  },
  banksSection: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: wp(4),
    paddingBottom: hp(1.2),
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginBottom: hp(1.2),
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    gap: wp(2.5),
  },
  dot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
  },
  bankRowInfo: {
    flex: 1,
  },
  removeBtn: {
    marginLeft: wp(1),
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    marginTop: hp(0.5),
    alignSelf: 'center',
  },
  addIcon: {
    width: wp(5),
    height: wp(5),
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BankCard;
