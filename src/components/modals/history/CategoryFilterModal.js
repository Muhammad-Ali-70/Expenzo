import React, { useMemo } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import { borderRadius, Label } from '../../../constants/globalstyle';
import PaymentIcon from '../../common/Paymenticon';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const NUM_COLUMNS = 4;

const CategoryItem = ({ category, isSelected, onPress, s, theme }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        s.categoryTile,
        isSelected && { backgroundColor: theme.primaryContainer },
      ]}
    >
      <View style={s.iconWrap}>
        <PaymentIcon
          name={category.iconName}
          backgroundColor={category.iconBg}
          color={category.iconColor}
          containerSize={wp(13)}
          size={wp(6.5)}
        />
        {isSelected && (
          <View style={[s.checkBadge, { backgroundColor: theme.primary }]}>
            <Check size={wp(3)} color={theme.onPrimary} strokeWidth={3} />
          </View>
        )}
      </View>
      <Label
        type="bodyXs"
        weight="semiBold"
        color={isSelected ? 'primary' : 'textMain'}
        numberOfLines={1}
        style={s.categoryLabel}
      >
        {category.label}
      </Label>
    </TouchableOpacity>
  );
};

const CategoryFilterModal = ({
  visible,
  categories = [],
  selectedCategories = [],
  onSelect,
  onClose,
}) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleToggle = categoryId => {
    const isSelected = selectedCategories.includes(categoryId);
    if (isSelected) {
      onSelect(selectedCategories.filter(id => id !== categoryId));
    } else {
      onSelect([...selectedCategories, categoryId]);
    }
  };

  const handleClearFilter = () => {
    onSelect([]);
    onClose();
  };

  const handleApply = () => {
    onClose();
  };

  const selectedCount = selectedCategories.length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Label type="bodyMedium" weight="bold" color="textMain">
                  Filter by Category
                </Label>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={styles.closeBtn}
                >
                  <X size={wp(4.5)} color={theme.textMuted} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleClearFilter}
                activeOpacity={0.7}
                style={[
                  styles.allCategoriesItem,
                  selectedCount === 0 && styles.allCategoriesItemSelected,
                ]}
              >
                <Label
                  type="bodySmall"
                  weight="semiBold"
                  color={selectedCount === 0 ? 'primary' : 'textMain'}
                >
                  All Categories
                </Label>
                {selectedCount === 0 && (
                  <Check size={wp(5)} color={theme.primary} strokeWidth={2.5} />
                )}
              </TouchableOpacity>

              <FlatList
                data={categories}
                keyExtractor={item => item.id}
                numColumns={NUM_COLUMNS}
                scrollEnabled={categories.length > 12}
                contentContainerStyle={styles.grid}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                  <CategoryItem
                    category={item}
                    isSelected={selectedCategories.includes(item.id)}
                    onPress={() => handleToggle(item.id)}
                    s={styles}
                    theme={theme}
                  />
                )}
              />

              {selectedCount > 0 && (
                <View style={styles.footer}>
                  <Label type="bodySmall" weight="regular" color="textMuted">
                    {selectedCount} {selectedCount === 1 ? 'category' : 'categories'} selected
                  </Label>
                  <TouchableOpacity
                    onPress={handleApply}
                    activeOpacity={0.7}
                    style={[styles.applyBtn, { backgroundColor: theme.primary }]}
                  >
                    <Label type="bodySmall" weight="semiBold" color="onPrimary">
                      Apply
                    </Label>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyles = t =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: wp(5),
    },
    card: {
      width: '100%',
      backgroundColor: t.surfacePrimary,
      borderRadius: borderRadius.xl,
      paddingTop: hp(2.5),
      maxHeight: '75%',
      elevation: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      paddingBottom: hp(1.5),
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    closeBtn: {
      width: wp(8),
      height: wp(8),
      borderRadius: wp(4),
      backgroundColor: t.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    allCategoriesItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      paddingVertical: hp(1.8),
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    allCategoriesItemSelected: {
      backgroundColor: t.surfaceSecondary,
    },
    grid: {
      paddingHorizontal: wp(3),
      paddingTop: hp(1.5),
      paddingBottom: hp(1),
      gap: hp(1),
    },
    row: {
      justifyContent: 'space-between',
    },
    categoryTile: {
      width: (wp(100) - wp(6) - wp(9)) / 4,
      alignItems: 'center',
      gap: hp(0.8),
      paddingVertical: hp(1.2),
      paddingHorizontal: wp(1),
      borderRadius: borderRadius.lg,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    iconWrap: {
      position: 'relative',
    },
    checkBadge: {
      position: 'absolute',
      top: -hp(0.5),
      right: -wp(1),
      width: wp(5),
      height: wp(5),
      borderRadius: wp(2.5),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: t.surfacePrimary,
    },
    categoryLabel: {
      textAlign: 'center',
      width: '100%',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      paddingVertical: hp(1.8),
      borderTopWidth: 0.5,
      borderTopColor: t.outlineVariant,
    },
    applyBtn: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(1),
      borderRadius: borderRadius.md,
    },
  });

export default CategoryFilterModal;
