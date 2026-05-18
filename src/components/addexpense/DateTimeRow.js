import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarDays, ChevronRight } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';

const DateTimeRow = ({ label = 'Today, 2:45 PM', onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={styles.card}>
    <View style={styles.left}>
      <Label type="bodyXs" weight="medium" color="textMuted">
        Date &amp; Time
      </Label>
      <View style={styles.row}>
        <CalendarDays
          size={wp(4.2)}
          color={colors.secondary}
          strokeWidth={1.8}
        />
        <Label type="bodySmall" weight="semiBold" color="textMain">
          {label}
        </Label>
      </View>
    </View>
    <ChevronRight size={wp(4.5)} color={colors.textMuted} strokeWidth={1.8} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadowCard,
  },
  left: {
    gap: hp(0.6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
});

export default DateTimeRow;
