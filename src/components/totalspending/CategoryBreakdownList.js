import React from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import CategoryBreakdownItem from './CategoryBreakdownItem';

const CategoryBreakdownList = ({ items = [], onDetails }) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Label type="headingXs" weight="bold" color="textMain">
        Category Breakdown
      </Label>
      {/* <TouchableOpacity onPress={onDetails} activeOpacity={0.7}>
        <Label type="bodySmall" weight="semiBold" color="primary">
          Details
        </Label>
      </TouchableOpacity> */}
    </View>

    <View style={styles.list}>
      {items.map(item => (
        <CategoryBreakdownItem key={item.id} {...item} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    gap: hp(1.5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    gap: hp(1.2),
  },
});

export default CategoryBreakdownList;
