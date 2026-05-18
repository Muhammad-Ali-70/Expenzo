import React from 'react';
import { View, StyleSheet } from 'react-native';
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
import colors from '../../constants/colors';
import { borderRadius } from '../../constants/globalstyle';
import { wp } from '../../constants/responsive';

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
  color = colors.surfacePrimary,
  backgroundColor = colors.primary,
  containerSize = wp(11),
  radius = borderRadius.lg,
  style,
}) => {
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
