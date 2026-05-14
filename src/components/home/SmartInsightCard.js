import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';

const SmartInsightCard = ({ message }) => (
  <View style={styles.card}>
    <View style={styles.iconWrap}>
      <Sparkles size={wp(5)} color={colors.secondary} strokeWidth={1.8} />
    </View>
    <View style={styles.textWrap}>
      <Label type="bodySmall" weight="semiBold" color="secondary">
        Smart Insight
      </Label>
      <Label
        type="bodyXs"
        weight="regular"
        color="textMuted"
        style={styles.body}
      >
        {message}
      </Label>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    borderColor: colors.secondary,
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
    backgroundColor: colors.surfaceContainer,
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
