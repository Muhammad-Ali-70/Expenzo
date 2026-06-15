import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { Label, borderRadius } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';

const SmartInsightCard = ({ message }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
  <View style={styles.card}>
    <View style={styles.iconWrap}>
      <Sparkles size={wp(5)} color={theme.white} strokeWidth={1.8} />
    </View>
    <View style={styles.textWrap}>
      <Label type="bodySmall" weight="semiBold" color="insightText">
        Smart Insight
      </Label>
      <Label
        type="bodyXs"
        weight="regular"
        color="insightText"
        style={styles.body}
      >
        {message}
      </Label>
    </View>
  </View>
  );
};

const createStyles = t => StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    backgroundColor: t.insightBackground,
    borderRadius: borderRadius.lg,
    borderColor: t.insightBorder,
    borderWidth: 1,
    padding: wp(4),
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: wp(3),
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: borderRadius.md,
    backgroundColor: t.insightText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: hp(0.4),
  },
  body: {
    lineHeight: hp(2.2),
  },
});

export default SmartInsightCard;
