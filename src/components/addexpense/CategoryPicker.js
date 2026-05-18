import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import SelectableIcon from '../ui/SelectableIcon';
import { CATEGORIES } from '../../constants/dummy/data';

const CategoryPicker = ({ activeId, onSelect, onSeeAll }) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Label type="bodyMedium" weight="semiBold" color="textMain">
        Category
      </Label>
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
        <Label type="bodySmall" weight="semiBold" color="primary">
          See All
        </Label>
      </TouchableOpacity>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {CATEGORIES.map(cat => (
        <SelectableIcon
          key={cat.id}
          iconName={cat.iconName}
          iconBg={cat.iconBg}
          iconColor={cat.iconColor}
          label={cat.label}
          active={activeId === cat.id}
          onPress={() => onSelect(cat.id)}
          size="md"
        />
      ))}
    </ScrollView>
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
  list: {
    gap: wp(1),
    paddingRight: wp(2),
  },
});

export default CategoryPicker;
