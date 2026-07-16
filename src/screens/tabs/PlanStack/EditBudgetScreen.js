import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import ScreenHeader from '../../../components/common/Screenheader';
import AppTextInput from '../../../components/ui/AppTextInput';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import { useThemeColors } from '@hooks/useThemeColors';
import { borderRadius, Label } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';
import { CATEGORIES, getCategoryMeta } from '../../../constants/theme/accountMeta';
import { useToastService } from '../../../utils/ToastService';
import { getBudgetTemplatesApi } from '../../../services/budgetService';
import useBudgetStore from '../../../store/useBudgetStore';
import BudgetTemplateModal from '../../../components/modals/budget/BudgetTemplateModal';
import PaymentIcon from '../../../components/common/Paymenticon';

const ExpenseCategories = CATEGORIES.filter(c => c.id !== 'income');

const CategoryLimitItem = ({ category, value, onChange, onRemove, s, theme }) => (
  <View style={s.limitRow}>
    <View style={s.limitIcon}>
      <PaymentIcon
        name={category.iconName}
        backgroundColor={category.iconBg}
        color={category.iconColor}
        containerSize={wp(9)}
        size={wp(4)}
      />
    </View>
    <View style={s.limitInfo}>
      <Label type="bodySmall" weight="semiBold" color="textMain">{category.label}</Label>
    </View>
    <AppTextInput
      value={value}
      onChangeText={onChange}
      placeholder="0"
      keyboardType="numeric"
      containerStyle={s.limitInput}
    />
    <TouchableOpacity onPress={onRemove} activeOpacity={0.7} style={s.removeBtn}>
      <X size={wp(4)} color={theme.textMuted} strokeWidth={2} />
    </TouchableOpacity>
  </View>
);

const EditBudgetScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const toast = useToastService();
  const saveBudget = useBudgetStore(s => s.saveBudget);

  const now = new Date();
  const [totalLimit, setTotalLimit] = useState('');
  const [categoryLimits, setCategoryLimits] = useState([]);
  const [availableCategories, setAvailableCategories] = useState(ExpenseCategories);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getBudgetTemplatesApi(50000);
        setTemplates(data);
      } catch (_) {}
    };
    fetchTemplates();
  }, []);

  const addCategoryLimit = useCallback((category) => {
    setCategoryLimits((prev) => [...prev, { category: category.id, limit: '' }]);
    setAvailableCategories((prev) => prev.filter((c) => c.id !== category.id));
  }, []);

  const updateCategoryLimit = useCallback((categoryId, value) => {
    setCategoryLimits((prev) =>
      prev.map((cl) => (cl.category === categoryId ? { ...cl, limit: value } : cl))
    );
  }, []);

  const removeCategoryLimit = useCallback((categoryId) => {
    setCategoryLimits((prev) => prev.filter((cl) => cl.category !== categoryId));
    const category = ExpenseCategories.find((c) => c.id === categoryId);
    if (category) {
      setAvailableCategories((prev) => {
        if (prev.some((c) => c.id === categoryId)) return prev;
        return [...prev, category].sort((a, b) => a.id.localeCompare(b.id));
      });
    }
  }, []);

  const handleTemplateSelect = useCallback((template) => {
    const validLimits = template.categoryLimits.filter((cl) =>
      ExpenseCategories.some((c) => c.id === cl.category)
    );
    setCategoryLimits(
      validLimits.map((cl) => ({ category: cl.category, limit: String(cl.limit) }))
    );
    const usedCategories = validLimits.map((cl) => cl.category);
    setAvailableCategories(ExpenseCategories.filter((c) => !usedCategories.includes(c.id)));
  }, []);

  const handleSave = useCallback(async () => {
    if (!totalLimit || parseFloat(totalLimit) <= 0) {
      toast.warning('Please enter a valid total budget');
      return;
    }

    setSaving(true);
    const result = await saveBudget({
      month: now.getMonth(),
      year: now.getFullYear(),
      totalLimit: parseFloat(totalLimit),
      categoryLimits: categoryLimits
        .filter((cl) => cl.limit && parseFloat(cl.limit) > 0)
        .map((cl) => ({ category: cl.category, limit: parseFloat(cl.limit) })),
    });

    setSaving(false);

    if (result.success) {
      toast.success('Budget saved successfully');
      navigation.goBack();
    } else {
      toast.error(result.message || 'Failed to save budget');
    }
  }, [totalLimit, categoryLimits, now, saveBudget, navigation, toast]);

  return (
    <View style={styles.safe}>
      <ScreenHeader title="Edit Budget" onBack={() => navigation.goBack()} backIcon="close" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.sectionLabel}>
          TOTAL MONTHLY BUDGET
        </Label>
        <AppTextInput
          value={totalLimit}
          onChangeText={setTotalLimit}
          placeholder="e.g., 50000"
          keyboardType="numeric"
          leftIconName="card"
        />

        <View style={styles.templateRow}>
          <Label type="bodySmall" weight="semiBold" color="textMuted">Need a starting point?</Label>
          <TouchableOpacity onPress={() => setTemplateModalVisible(true)} activeOpacity={0.7}>
            <Label type="bodySmall" weight="semiBold" color="primary" underline>Use a template</Label>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Label type="bodyXs" weight="semiBold" color="textMuted" style={styles.sectionLabel}>
            CATEGORY LIMITS
          </Label>
          <Label type="bodyXs" weight="regular" color="textMuted">
            {categoryLimits.length}/{ExpenseCategories.length} set
          </Label>
        </View>

        {categoryLimits.map((cl) => {
          const meta = getCategoryMeta(cl.category);
          return (
            <CategoryLimitItem
              key={cl.category}
              category={{ ...meta, label: CATEGORIES.find(c => c.id === cl.category)?.label || meta.id }}
              value={cl.limit}
              onChange={(v) => updateCategoryLimit(cl.category, v)}
              onRemove={() => removeCategoryLimit(cl.category)}
              s={styles}
              theme={theme}
            />
          );
        })}

        {availableCategories.length > 0 && (
          <View style={styles.addSection}>
            <Label type="bodySmall" weight="semiBold" color="textMuted" style={styles.addLabel}>
              Add a category limit
            </Label>
            <View style={styles.availableList}>
              {availableCategories.map((cat) => {
                const meta = getCategoryMeta(cat.id);
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={styles.addCategoryBtn}
                    onPress={() => addCategoryLimit(cat)}
                    activeOpacity={0.7}
                  >
                    <PaymentIcon
                      name={meta.iconName}
                      backgroundColor={meta.iconBg}
                      color={meta.iconColor}
                      containerSize={wp(7)}
                      size={wp(3.2)}
                    />
                    <Label type="bodyXs" weight="semiBold" color="textMain">{cat.label}</Label>
                    <Plus size={wp(3.5)} color={theme.primary} strokeWidth={2.5} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <PrimaryButton
            variant="primary"
            size="lg"
            label={saving ? 'Saving...' : 'Save Budget'}
            onPress={handleSave}
            disabled={saving}
          />
        </View>
      </ScrollView>

      <BudgetTemplateModal
        visible={templateModalVisible}
        templates={templates}
        onSelect={handleTemplateSelect}
        onClose={() => setTemplateModalVisible(false)}
      />
    </View>
  );
};

const createStyles = (t) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: t.background },
    scrollContent: { paddingBottom: hp(12), paddingHorizontal: wp(5) },
    sectionLabel: { letterSpacing: 0.8, marginBottom: hp(0.8), marginTop: hp(2.5) },
    templateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: hp(1.5),
    },
    divider: { height: 1, backgroundColor: t.outlineVariant, marginVertical: hp(2.5) },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(1.5),
    },
    limitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2.5),
      paddingVertical: hp(1.2),
    },
    limitIcon: { width: wp(9), alignItems: 'center' },
    limitInfo: { flex: 1 },
    limitInput: { width: wp(22), marginBottom: 0 },
    removeBtn: { padding: wp(1.5) },
    addSection: { marginTop: hp(2) },
    addLabel: { marginBottom: hp(1.5) },
    availableList: { flexDirection: 'row', flexWrap: 'wrap', gap: wp(2) },
    addCategoryBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(1.5),
      paddingHorizontal: wp(3),
      paddingVertical: hp(1.2),
      borderRadius: borderRadius.full,
      backgroundColor: t.surfaceSecondary,
      borderWidth: 1,
      borderColor: t.outlineVariant,
    },
    footer: { marginTop: hp(3) },
  });

export default EditBudgetScreen;
