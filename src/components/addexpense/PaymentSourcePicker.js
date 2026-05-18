import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import SelectableIcon from '../ui/SelectableIcon';
import { SOURCES } from '../../constants/dummy/data';

const PaymentSourcePicker = ({ activeId, onSelect, onSeeAll }) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Label type="bodyMedium" weight="semiBold" color="textMain">
        Payment Source
      </Label>
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
        <Label type="bodySmall" weight="semiBold" color="primary">
          See All
        </Label>
      </TouchableOpacity>
    </View>

    <View style={styles.row}>
      {SOURCES.map(src => (
        <SelectableIcon
          key={src.id}
          iconName={src.iconName}
          iconBg={src.iconBg}
          iconColor={src.iconColor}
          label={src.label}
          active={activeId === src.id}
          onPress={() => onSelect(src.id)}
          size="lg"
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: wp(5),
    gap: hp(1.2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: wp(3),
  },
});

export default PaymentSourcePicker;
