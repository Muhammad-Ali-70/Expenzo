import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import SelectableIcon from '../ui/SelectableIcon';
import { CATEGORIES } from '../../constants/theme/accountMeta';
import BottomSheet from '../ui/BottomSheet';

const NUM_COLUMNS = 4;

const CategoryModal = ({
  visible,
  activeId,
  onSelect,
  onClose,
  categories = CATEGORIES,
}) => {
  const handleSelect = id => {
    onSelect(id);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="All Categories">
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <SelectableIcon
            iconName={item.iconName}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            label={item.label}
            active={activeId === item.id}
            onPress={() => handleSelect(item.id)}
            size="grid"
          />
        )}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  grid: { paddingHorizontal: wp(3), paddingBottom: hp(1), gap: hp(0.5) },
  row: { justifyContent: 'space-between' },
});

export default CategoryModal;
