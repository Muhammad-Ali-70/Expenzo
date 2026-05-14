import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import RecentActivityItem from './RecentActivityItem';

const RecentActivitySection = ({ transactions = [], onSeeAll }) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Label type="headingXs" weight="bold" color="textMain">
        Recent Activity
      </Label>
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
        <Label type="bodySmall" weight="semiBold" color="primary">
          See All
        </Label>
      </TouchableOpacity>
    </View>

    <View style={styles.list}>
      {transactions.map(tx => (
        <RecentActivityItem key={tx.id} {...tx} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
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

export default RecentActivitySection;
