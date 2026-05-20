import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, Plus } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { borderRadius, Label } from '../../../constants/globalstyle';
import colors from '../../../constants/colors';
import PaymentIcon from '../../common/Paymenticon';
import DigitalWalletPickerModal from '../../modals/DigitalWalletPickerModal';
import CardShell, {
  CardRow,
  CardInfo,
  CardRight,
  CardDivider,
  CardFooter,
} from './CardShell';
import AccountRow from './AccountRow';
import { useDigitalWallets } from '../../../hooks/AccountSetupCard/Usedigitalwallets';

const DailyPayCard = ({
  iconName,
  iconColor,
  iconBg,
  name,
  description,
  isActive,
  onPress,
  style,
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
    setPrimaryWallet,
    addExtraWallet,
    removeWallet,
    updateBalance,
  } = useDigitalWallets();

  const footer =
    accounts.length > 0 ? (
      <>
        <CardDivider />
        <CardFooter>
          {accounts.map((acct, idx) => (
            <AccountRow
              key={acct.id}
              account={acct}
              accountIdKey="appId"
              isPrimary={idx === 0}
              onBalanceChange={updateBalance}
              onRemove={removeWallet}
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
            <Label type="caption" weight="regular" color="textMuted">
              {primaryAccount
                ? extraAccounts.length > 0
                  ? `+${extraAccounts.length} more app${
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
                {primaryAccount ? primaryAccount.label : 'Optional'}
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

      <TouchableOpacity
        onPress={() => setAddModalVisible(true)}
        activeOpacity={0.75}
        style={styles.addBtn}
      >
        <View style={styles.addIcon}>
          <Plus size={wp(3.2)} color={colors.primary} strokeWidth={2.5} />
        </View>
        <Label type="bodyXs" weight="semiBold" color="primary">
          Add another wallet
        </Label>
      </TouchableOpacity>

      <DigitalWalletPickerModal
        visible={primaryModalVisible}
        activeId={primaryAccount?.appId}
        usedIds={[]}
        onSelect={setPrimaryWallet}
        onClose={() => setPrimaryModalVisible(false)}
      />

      <DigitalWalletPickerModal
        visible={addModalVisible}
        activeId={null}
        usedIds={usedIds}
        onSelect={addExtraWallet}
        onClose={() => setAddModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chip: {
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
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

export default DailyPayCard;
