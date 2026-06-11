import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import BottomSheet from '../ui/BottomSheet';
import AccountTile from '../ui/AccountTile';
import { DIGITAL_WALLETS } from '../../constants/theme/accountMeta';

const DigitalWalletPickerModal = ({
  visible,
  activeId,
  usedIds = [],
  onSelect,
  onClose,
}) => {
  const handleSelect = item => {
    onSelect(item);
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Select Payment App"
    >
      <Label
        type="bodyXs"
        weight="regular"
        color="textMuted"
        style={styles.hint}
      >
        Choose an app you use for daily payments or transfers.
      </Label>

      <FlatList
        data={DIGITAL_WALLETS}
        keyExtractor={item => item.id}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <AccountTile
            imageUri={item.imageUri}
            initials={item.initials}
            color={item.color}
            label={item.label}
            active={activeId === item.id}
            disabled={usedIds.includes(item.id)}
            onPress={() => handleSelect(item)}
          />
        )}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  hint: { paddingHorizontal: wp(5), marginBottom: hp(1.5), lineHeight: 17 },
  grid: { paddingHorizontal: wp(3), paddingBottom: hp(1), gap: hp(0.5) },
  row: { justifyContent: 'space-between' },
});

export default DigitalWalletPickerModal;
