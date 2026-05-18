import React from 'react';
import { wp } from '../../../constants/responsive';
import { borderRadius, Label } from '../../../constants/globalstyle';
import PaymentIcon from '../../common/Paymenticon';
import CurrencyInput from '../../common/CurrencyInput';
import CardShell, { CardRow, CardInfo, CardRight } from './CardShell';

const WalletCard = ({
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
}) => (
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
      </CardInfo>
      <CardRight>
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
);

export default WalletCard;
