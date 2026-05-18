import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { hp, wp } from '../../../constants/responsive';
import { borderRadius, Label } from '../../../constants/globalstyle';
import colors from '../../../constants/colors';
import PaymentIcon from '../../common/Paymenticon';
import CurrencyInput from '../../common/CurrencyInput';
import SavingsAppPickerModal from '../../modals/SavingsAppPickerModal';
import CardShell, { CardRow, CardInfo, CardRight } from './CardShell';

const DailyPayCard = ({
  iconName,
  iconColor,
  iconBg,
  name,
  description,
  value,
  onChangeText,
  currency,
  isActive,
  onPress,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const hasApp = selectedApp && selectedApp.id !== 'none';

  return (
    <>
      <CardShell
        isActive={isActive}
        onPress={onPress}
        description={description}
        style={style}
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
              {name}
            </Label>
            {hasApp && (
              <Label type="bodyXs" weight="regular" color="textMuted">
                via {selectedApp.label}
              </Label>
            )}
          </CardInfo>

          <CardRight>
            {/* App picker chip */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.75}
              style={styles.pickerChip}
            >
              <Label type="bodyXs" weight="semiBold" color="primary">
                {hasApp ? selectedApp.label : 'Optional App'}
              </Label>
              <ChevronDown
                size={wp(3)}
                color={colors.primary}
                strokeWidth={2}
              />
            </TouchableOpacity>

            <CurrencyInput
              value={value}
              onChangeText={onChangeText}
              currency={currency}
              label="Set Balance"
              showLabel
            />
          </CardRight>
        </CardRow>
      </CardShell>

      <SavingsAppPickerModal
        visible={modalVisible}
        activeId={selectedApp?.id}
        onSelect={app => {
          setSelectedApp(app);
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
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
});

export default DailyPayCard;
