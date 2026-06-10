import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import RecentActivityItem from './RecentActivityItem';
import TransactionDetailModal from '../modals/transaction/TransactionDetailModal';

const RecentActivitySection = ({
  label = 'Recent Activity',
  total,
  transactions = [],
  onSeeAll,
}) => {
  const [selectedTx, setSelectedTx] = useState(null);

  return (
    <>
      <View style={styles.section}>
        <View style={styles.header}>
          <Label type="headingXs" weight="bold" color="textMain">
            {label}
          </Label>

          {onSeeAll ? (
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
              <Label type="bodySmall" weight="semiBold" color="primary">
                See All
              </Label>
            </TouchableOpacity>
          ) : total !== undefined ? (
            <Label
              type="bodySmall"
              weight="semiBold"
              color={total >= 0 ? 'primary' : 'error'}
            >
              {total >= 0 ? '+' : ''}PKR {Math.abs(total).toLocaleString()}
            </Label>
          ) : null}
        </View>

        <FlashList
          data={transactions}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          estimatedItemSize={hp(8)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <RecentActivityItem
              {...item}
              onPress={() => setSelectedTx(item.raw)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <TransactionDetailModal
        visible={!!selectedTx}
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </>
  );
};

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
    paddingBottom: hp(0.5),
  },
  separator: {
    height: hp(1.2),
  },
});

export default RecentActivitySection;
