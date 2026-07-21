import React, { useMemo } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { wp, hp } from '../../constants/responsive';
import { borderRadius, Label } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import SelectableIcon from '../ui/SelectableIcon';
import { CATEGORIES } from '../../constants/theme/accountMeta';
import BottomSheet from '../ui/BottomSheet';

const NUM_COLUMNS = 4;
const NEW_TILE = { id: '__new__', __isNew: true };

const CategoryModal = ({
  visible,
  activeId,
  onSelect,
  onClose,
  categories = CATEGORIES,
  onCreateNew,
  onEditCategory,
}) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleSelect = id => {
    onSelect(id);
    onClose();
  };

  // Append the "+ New" tile only when creation is wired up.
  const data = useMemo(
    () => (onCreateNew ? [...categories, NEW_TILE] : categories),
    [categories, onCreateNew],
  );

  const renderItem = ({ item }) => {
    if (item.__isNew) {
      return (
        <TouchableOpacity
          onPress={onCreateNew}
          activeOpacity={0.7}
          style={styles.newTile}
        >
          <View style={styles.newIcon}>
            <Plus size={wp(6.5)} color={theme.primary} strokeWidth={2} />
          </View>
          <Label type="bodyXs" weight="semiBold" color="primary">
            New
          </Label>
        </TouchableOpacity>
      );
    }

    return (
      <SelectableIcon
        iconName={item.iconName}
        iconBg={item.iconBg}
        iconColor={item.iconColor}
        label={item.label}
        active={activeId === item.id}
        onPress={() => handleSelect(item.id)}
        onLongPress={
          item.isCustom && onEditCategory
            ? () => onEditCategory(item.raw)
            : undefined
        }
        size="grid"
      />
    );
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="All Categories">
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
      />
    </BottomSheet>
  );
};

const createStyles = t =>
  StyleSheet.create({
    grid: { paddingHorizontal: wp(3), paddingBottom: hp(1), gap: hp(0.5) },
    row: { justifyContent: 'space-between' },
    newTile: {
      width: (wp(100) - wp(6) - wp(9)) / 4,
      alignItems: 'center',
      gap: hp(0.8),
      paddingVertical: hp(1.2),
      paddingHorizontal: wp(1),
      borderRadius: borderRadius.lg,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    newIcon: {
      width: wp(13),
      height: wp(13),
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: t.primary,
    },
  });

export default CategoryModal;
