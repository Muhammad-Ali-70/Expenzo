import React, { useEffect, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, Plus } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { borderRadius, Label } from '../../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import PaymentIcon from '../../common/Paymenticon';
import CardShell, {
  CardRow,
  CardInfo,
  CardRight,
  CardDivider,
  CardFooter,
} from './CardShell';
import AccountRow from './AccountRow';
import { useBankAccounts } from '../../../hooks/AccountSetupCard/useBankAccounts';
import BankPickerModal from '../../modals/BankPickerModal';

const BankCard = ({
  iconName,
  iconColor,
  iconBg,
  name,
  description,
  isActive,
  onPress,
  style,
  onAccountsChange,
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

  useEffect(() => {
    onAccountsChange?.(accounts);
  }, [accounts, onAccountsChange]);

  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const footer =
    accounts.length > 0 ? (
      <>
        <CardDivider />
        <CardFooter>
          {accounts.map((acct, idx) => (
            <AccountRow
              key={acct.id}
              account={acct}
              accountIdKey="bankId"
              isPrimary={idx === 0}
              onBalanceChange={updateBalance}
              onRemove={removeBank}
            />
          ))}
        </CardFooter>
      </>
    ) : null;

  return (
    <>
      <CardShell
        isActive={isActive}
        onPress={onPress}
        style={style}
        footer={footer}
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
              {primaryAccount ? primaryAccount.label : name}
            </Label>
            <Label type="bodyXs" weight="regular" color="textMuted">
              {primaryAccount
                ? extraAccounts.length > 0
                  ? `+${extraAccounts.length} more bank${
                      extraAccounts.length > 1 ? 's' : ''
                    }`
                  : description
                : description}
            </Label>
          </CardInfo>
          <CardRight>
            <TouchableOpacity
              onPress={() => setPrimaryModalVisible(true)}
              activeOpacity={0.75}
              style={styles.chip}
            >
              <Label type="bodyXs" weight="semiBold" color="primary">
                {primaryAccount ? primaryAccount.label : 'Select Bank'}
              </Label>
              <ChevronDown
                size={wp(3)}
                color={theme.primary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </CardRight>
        </CardRow>
      </CardShell>

      <TouchableOpacity
        onPress={() => setAddModalVisible(true)}
        activeOpacity={0.75}
        style={styles.addBtn}
      >
        <View style={styles.addIcon}>
          <Plus size={wp(3.2)} color={theme.primary} strokeWidth={2.5} />
        </View>
        <Label type="bodyXs" weight="semiBold" color="primary">
          Add another bank
        </Label>
      </TouchableOpacity>

      <BankPickerModal
        visible={primaryModalVisible}
        activeId={primaryAccount?.bankId}
        usedIds={[]}
        onSelect={setPrimaryBank}
        onClose={() => setPrimaryModalVisible(false)}
      />
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

const createStyles = t => StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
    borderWidth: 1,
    borderColor: t.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    backgroundColor: t.surfaceContainerLow,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
    marginTop: hp(-0.8),
    alignSelf: 'center',
  },
  addIcon: {
    width: wp(5),
    height: wp(5),
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: t.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BankCard;
