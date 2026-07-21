import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ScreenHeader from '../../../components/common/Screenheader';
import AmountHeader from '../../../components/addexpense/AmountHeader';
import CategoryPicker from '../../../components/addexpense/CategoryPicker';
import DescriptionInput from '../../../components/addexpense/DescriptionInput';
import PaymentSourcePicker from '../../../components/addexpense/PaymentSourcePicker';
import DateTimeRow from '../../../components/addexpense/DateTimeRow';
import NotesInput from '../../../components/addexpense/NotesInput';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CategoryModal from '../../../components/modals/CategoryModal';
import CreateCategoryModal from '../../../components/modals/CreateCategoryModal';
import PaymentSourceModal from '../../../components/modals/PaymentSourceModal';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp, wp } from '../../../constants/responsive';
import { Label } from '../../../constants/globalstyle';
import { CATEGORIES, INCOME_CATEGORIES } from '../../../constants/theme/accountMeta';
import { createTransactionApi } from '../../../services/transactionService';
import useAccountStore from '../../../store/useAccountStore';
import useCategoryStore from '../../../store/useCategoryStore';
import { useToastService } from '../../../utils/ToastService';

const toPickerItem = c => ({
  id: c._id,
  label: c.name,
  iconName: c.iconName,
  iconBg: c.iconBg,
  iconColor: c.iconColor,
  isCustom: true,
  raw: c,
});

const TYPES = ['expense', 'income'];

const AddTransactionScreen = ({ navigation, route }) => {
  const initialType = route?.params?.type ?? 'expense';

  const accounts = useAccountStore(s => s.accounts);

  const customCategories = useCategoryStore(s => s.categories);
  const fetchCategories = useCategoryStore(s => s.fetchCategories);

  const primaryAccount =
    accounts?.find(a => a.isPrimary) ?? accounts?.[0] ?? null;

  const [incomeCategory, setIncomeCategory] = useState('salary');
  const [incomeCategoryModalVisible, setIncomeCategoryModalVisible] =
    useState(false);

  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('transport');
  const [sourceId, setSourceId] = useState(null);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [createCategoryVisible, setCreateCategoryVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const toast = useToastService();
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (primaryAccount && sourceId === null) {
      // API accounts use _id, WatermelonDB used id
      setSourceId(primaryAccount._id);
    }
  }, [primaryAccount, sourceId]);

  const isExpense = type === 'expense';

  // Merge built-in categories with the user's (non-archived) custom ones.
  const expenseCategories = useMemo(
    () => [
      ...CATEGORIES,
      ...customCategories
        .filter(c => !c.isArchived && c.type === 'expense')
        .map(toPickerItem),
    ],
    [customCategories],
  );

  const incomeCategories = useMemo(
    () => [
      ...INCOME_CATEGORIES,
      ...customCategories
        .filter(c => !c.isArchived && c.type === 'income')
        .map(toPickerItem),
    ],
    [customCategories],
  );

  const openCreateCategory = () => {
    setEditingCategory(null);
    setCreateCategoryVisible(true);
  };

  const openEditCategory = raw => {
    setEditingCategory(raw);
    setCreateCategoryVisible(true);
  };

  // Auto-select the newly created category (archived edits return null).
  const handleCategorySaved = cat => {
    if (!cat) return;
    if (cat.type === 'expense') setCategory(cat._id);
    else setIncomeCategory(cat._id);
  };

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount.');
      return;
    }
    if (!sourceId) {
      Alert.alert('No account', 'Please select an account.');
      return;
    }

    setSaving(true);
    try {
      await createTransactionApi({
        accountId: sourceId,
        type,
        amount: parsedAmount,
        category: isExpense ? category : incomeCategory,
        description: description.trim(),
        note: notes.trim(),
        date: date.toISOString(),
      });

      useAccountStore.getState().fetchAccounts();
      navigation?.navigate('TabNavigator', {
        screen: 'History',
        params: { refresh: Date.now() },
      });
    } catch (e) {
      console.error('Save transaction failed:', e);

      const message =
        e?.message ?? 'Could not save transaction. Please try again.';

      if (message === 'Insufficient balance.') {
        toast.warning('Insufficient balance in this account.');
      } else {
        toast.error(message);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenHeader
        title={isExpense ? 'Add Expense' : 'Add Income'}
        onBack={() => navigation?.goBack()}
      />

      {/* Type Toggle */}
      <View style={styles.toggleWrap}>
        {TYPES.map(t => (
          <TouchableOpacity
            key={t}
            style={[
              styles.toggleBtn,
              type === t && {
                backgroundColor:
                  t === 'expense' ? theme.error : theme.primary,
              },
            ]}
            onPress={() => setType(t)}
            activeOpacity={0.8}
          >
            <Label
              type="bodySmall"
              weight="semiBold"
              color={type === t ? 'white' : 'textMuted'}
            >
              {t === 'expense' ? 'Expense' : 'Income'}
            </Label>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <AmountHeader value={amount} onChangeText={setAmount} />

        <View style={styles.form}>
          <DescriptionInput value={description} onChangeText={setDescription} />

          {isExpense ? (
            <CategoryPicker
              activeId={category}
              onSelect={setCategory}
              onSeeAll={() => setCategoryModalVisible(true)}
              onCreateNew={openCreateCategory}
              categories={expenseCategories}
            />
          ) : (
            <CategoryPicker
              activeId={incomeCategory}
              onSelect={setIncomeCategory}
              onSeeAll={() => setIncomeCategoryModalVisible(true)}
              onCreateNew={openCreateCategory}
              categories={incomeCategories}
            />
          )}

          <PaymentSourcePicker
            activeId={sourceId}
            onSelect={setSourceId}
            onSeeAll={() => setSourceModalVisible(true)}
          />

          <DateTimeRow date={date} onChange={setDate} />

          <NotesInput value={notes} onChangeText={setNotes} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          variant="primary"
          size="lg"
          label={
            saving ? 'Saving…' : isExpense ? 'Save Expense' : 'Save Income'
          }
          icon={CheckCircle}
          onPress={handleSave}
          disabled={saving}
        />
      </View>

      <CategoryModal
        visible={categoryModalVisible}
        activeId={category}
        onSelect={setCategory}
        onClose={() => setCategoryModalVisible(false)}
        categories={expenseCategories}
        onCreateNew={() => {
          setCategoryModalVisible(false);
          openCreateCategory();
        }}
        onEditCategory={raw => {
          setCategoryModalVisible(false);
          openEditCategory(raw);
        }}
      />

      <CategoryModal
        visible={incomeCategoryModalVisible}
        activeId={incomeCategory}
        onSelect={setIncomeCategory}
        onClose={() => setIncomeCategoryModalVisible(false)}
        categories={incomeCategories}
        onCreateNew={() => {
          setIncomeCategoryModalVisible(false);
          openCreateCategory();
        }}
        onEditCategory={raw => {
          setIncomeCategoryModalVisible(false);
          openEditCategory(raw);
        }}
      />

      <PaymentSourceModal
        visible={sourceModalVisible}
        activeId={sourceId}
        onSelect={setSourceId}
        onClose={() => setSourceModalVisible(false)}
      />

      <CreateCategoryModal
        visible={createCategoryVisible}
        type={type}
        editingCategory={editingCategory}
        onClose={() => setCreateCategoryVisible(false)}
        onSaved={handleCategorySaved}
      />
    </KeyboardAvoidingView>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: t.background,
    },
    toggleWrap: {
      flexDirection: 'row',
      marginHorizontal: wp(5),
      marginTop: hp(2),
      backgroundColor: t.surfacePrimary,
      borderRadius: 12,
      padding: 4,
      gap: 4,
    },
    toggleBtn: {
      flex: 1,
      paddingVertical: hp(1.2),
      borderRadius: 10,
      alignItems: 'center',
    },
    scrollContent: {
      paddingBottom: hp(2),
    },
    form: {
      paddingTop: hp(2.5),
      gap: hp(2.5),
    },
    footer: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
      backgroundColor: t.background,
    },
  });

export default AddTransactionScreen;
