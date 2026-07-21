import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import BottomSheet from '../ui/BottomSheet';
import AppTextInput from '../ui/AppTextInput';
import PrimaryButton from '../ui/PrimaryButton';
import PaymentIcon from '../common/Paymenticon';
import { Label, borderRadius } from '../../constants/globalstyle';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';
import useCategoryStore from '../../store/useCategoryStore';
import { useToastService } from '../../utils/ToastService';

// Icons supported by PaymentIcon's registry.
const ICONS = [
  'wallet', 'card', 'dollar', 'savings', 'investment', 'shopping',
  'coffee', 'food', 'home', 'car', 'travel', 'health',
  'utilities', 'gift', 'education', 'work', 'bank', 'phone',
];

// Light-tint / saturated pairs matching the built-in category palette.
const COLORS = [
  { iconBg: '#FFF3E6', iconColor: '#F97316' },
  { iconBg: '#EFF6FF', iconColor: '#3B82F6' },
  { iconBg: '#F5F3FF', iconColor: '#8B5CF6' },
  { iconBg: '#FFF2FA', iconColor: '#DB2777' },
  { iconBg: '#FFF1F2', iconColor: '#F43F5E' },
  { iconBg: '#ECFDF5', iconColor: '#10B981' },
  { iconBg: '#FDF6EC', iconColor: '#92400E' },
  { iconBg: '#FFFBEB', iconColor: '#D97706' },
  { iconBg: '#F0F9FF', iconColor: '#0284C7' },
  { iconBg: '#FDF2F8', iconColor: '#9D174D' },
];

const CreateCategoryModal = ({
  visible,
  type = 'expense',
  editingCategory = null,
  onClose,
  onSaved,
}) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const toast = useToastService();

  const addCategory = useCategoryStore(s => s.addCategory);
  const updateCategory = useCategoryStore(s => s.updateCategory);
  const archiveCategory = useCategoryStore(s => s.archiveCategory);

  const isEditing = !!editingCategory;

  const [name, setName] = useState('');
  const [iconName, setIconName] = useState(ICONS[0]);
  const [colorIndex, setColorIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  // Sync form state whenever the sheet opens (create → defaults, edit → prefill).
  useEffect(() => {
    if (!visible) return;
    if (editingCategory) {
      setName(editingCategory.name);
      setIconName(editingCategory.iconName || ICONS[0]);
      const idx = COLORS.findIndex(
        c => c.iconColor === editingCategory.iconColor,
      );
      setColorIndex(idx >= 0 ? idx : 0);
    } else {
      setName('');
      setIconName(ICONS[0]);
      setColorIndex(0);
    }
  }, [visible, editingCategory]);

  const color = COLORS[colorIndex];

  const handleSave = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.warning('Please enter a category name');
      return;
    }

    setSaving(true);
    const payload = {
      name: trimmed,
      iconName,
      iconBg: color.iconBg,
      iconColor: color.iconColor,
    };
    const result = isEditing
      ? await updateCategory(editingCategory._id, payload)
      : await addCategory({ ...payload, type });
    setSaving(false);

    if (result.success) {
      toast.success(isEditing ? 'Category updated' : 'Category created');
      onSaved?.(result.category);
      onClose?.();
    } else {
      toast.error(result.message);
    }
  }, [
    name,
    iconName,
    color,
    isEditing,
    editingCategory,
    type,
    addCategory,
    updateCategory,
    onSaved,
    onClose,
    toast,
  ]);

  const handleArchive = useCallback(async () => {
    setSaving(true);
    const result = await archiveCategory(editingCategory._id);
    setSaving(false);
    if (result.success) {
      toast.success('Category archived');
      onSaved?.(null);
      onClose?.();
    } else {
      toast.error(result.message);
    }
  }, [archiveCategory, editingCategory, onSaved, onClose, toast]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={isEditing ? 'Edit Category' : 'New Category'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Preview */}
        <View style={styles.preview}>
          <PaymentIcon
            name={iconName}
            backgroundColor={color.iconBg}
            color={color.iconColor}
            containerSize={wp(16)}
            size={wp(8)}
          />
          <Label type="bodySmall" weight="semiBold" color="textMain">
            {name.trim() || 'Category name'}
          </Label>
        </View>

        <AppTextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g., Groceries"
          maxLength={30}
          autoFocus={!isEditing}
        />

        {/* Icon picker */}
        <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.sectionLabel}>
          ICON
        </Label>
        <View style={styles.iconGrid}>
          {ICONS.map(ic => {
            const active = ic === iconName;
            return (
              <TouchableOpacity
                key={ic}
                onPress={() => setIconName(ic)}
                activeOpacity={0.7}
                style={[styles.iconCell, active && styles.iconCellActive]}
              >
                <PaymentIcon
                  name={ic}
                  backgroundColor={active ? color.iconBg : theme.surfaceSecondary}
                  color={active ? color.iconColor : theme.textMuted}
                  containerSize={wp(10)}
                  size={wp(5)}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Color picker */}
        <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.sectionLabel}>
          COLOR
        </Label>
        <View style={styles.colorRow}>
          {COLORS.map((c, i) => {
            const active = i === colorIndex;
            return (
              <TouchableOpacity
                key={c.iconColor}
                onPress={() => setColorIndex(i)}
                activeOpacity={0.7}
                style={[
                  styles.swatch,
                  { backgroundColor: c.iconColor },
                  active && styles.swatchActive,
                ]}
              />
            );
          })}
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            variant="primary"
            size="lg"
            label={saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Category'}
            onPress={handleSave}
            disabled={saving}
          />
          {isEditing && (
            <TouchableOpacity
              onPress={handleArchive}
              activeOpacity={0.7}
              disabled={saving}
              style={styles.archiveBtn}
            >
              <Trash2 size={wp(4)} color={theme.error} strokeWidth={2} />
              <Label type="bodySmall" weight="semiBold" color="error">
                Archive Category
              </Label>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

const createStyles = t =>
  StyleSheet.create({
    content: {
      paddingHorizontal: wp(5),
      paddingBottom: hp(2),
    },
    preview: {
      alignItems: 'center',
      gap: hp(1),
      marginBottom: hp(2),
    },
    sectionLabel: {
      letterSpacing: 0.8,
      marginTop: hp(1.5),
      marginBottom: hp(1),
    },
    iconGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: wp(2),
    },
    iconCell: {
      borderRadius: borderRadius.lg,
      borderWidth: 2,
      borderColor: 'transparent',
      padding: 2,
    },
    iconCellActive: {
      borderColor: t.primary,
    },
    colorRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: wp(2.5),
    },
    swatch: {
      width: wp(9),
      height: wp(9),
      borderRadius: borderRadius.full,
      borderColor: 'transparent',
    },
    swatchActive: {
      borderColor: t.textMain,
      borderWidth: 3,
    },
    footer: {
      marginTop: hp(3),
      gap: hp(1.5),
    },
    archiveBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp(2),
      paddingVertical: hp(1),
    },
  });

export default CreateCategoryModal;
