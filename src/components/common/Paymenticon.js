import React, { useMemo } from 'react';
import { View } from 'react-native';
import {
  Wallet,
  Landmark,
  PiggyBank,
  CreditCard,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Coffee,
  Home,
  Car,
  Smartphone,
  Utensils,
  Plane,
  Heart,
  Zap,
  Gift,
  BookOpen,
  Briefcase,
} from 'lucide-react-native';
import { borderRadius } from '../../constants/globalstyle';
import { wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const ICON_REGISTRY = {
  wallet: Wallet,
  bank: Landmark,
  savings: PiggyBank,
  card: CreditCard,
  investment: TrendingUp,
  dollar: DollarSign,
  shopping: ShoppingCart,
  coffee: Coffee,
  home: Home,
  car: Car,
  phone: Smartphone,
  food: Utensils,
  travel: Plane,
  health: Heart,
  utilities: Zap,
  gift: Gift,
  education: BookOpen,
  work: Briefcase,
};

const PaymentIcon = ({
  name = 'wallet',
  size = wp(5.5),
  color: _color,
  backgroundColor: _backgroundColor,
  containerSize = wp(11),
  radius = borderRadius.lg,
  style,
}) => {
  const theme = useThemeColors();
  const color = _color ?? theme.surfacePrimary;
  const backgroundColor = _backgroundColor ?? theme.primary;
  const IconComponent = ICON_REGISTRY[name] ?? Wallet;

  return (
    <View
      style={[
        {
          width: containerSize,
          height: containerSize,
          borderRadius: radius,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <IconComponent size={size} color={color} strokeWidth={1.8} />
    </View>
  );
};

export default PaymentIcon;
