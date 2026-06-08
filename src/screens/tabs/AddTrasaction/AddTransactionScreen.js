import React, { useState, useEffect } from 'react';
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
import PaymentSourceModal from '../../../components/modals/PaymentSourceModal';
import colors from '../../../constants/colors';
import { hp, wp } from '../../../constants/responsive';
import { Label } from '../../../constants/globalstyle';
import { INCOME_CATEGORIES } from '../../../constants/theme/accountMeta';
import { createTransactionApi } from '../../../services/transactionService';
import useAccountStore from '../../../store/useAccountStore';
import { useToastService } from '../../../utils/ToastService';

// -- WatermelonDB (commented out for now — will be used for sync later)
// import { useAccounts } from '../../../database/hooks/useAccounts';
// import TransactionRepository from '../../../database/repositories/TransactionRepository';
// import AccountRepository from '../../../database/repositories/AccountRepository';

const TYPES = ['expense', 'income'];

const AddTransactionScreen = ({ navigation, route }) => {
  const initialType = route?.params?.type ?? 'expense';

  // -- WatermelonDB (commented out)
  // const { primaryAccount } = useAccounts();

  // Pull accounts from your API store instead
  const accounts = useAccountStore(s => s.accounts);

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

  const toast = useToastService();

  useEffect(() => {
    if (primaryAccount && sourceId === null) {
      // API accounts use _id, WatermelonDB used id
      setSourceId(primaryAccount._id);
    }
  }, [primaryAccount, sourceId]);

  const isExpense = type === 'expense';

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

      // -- WatermelonDB balance update (commented out — backend handles this later)
      // const account = await AccountRepository.getAll().then(all =>
      //   all.find(a => a.id === sourceId),
      // );
      // if (account) {
      //   const newBalance = isExpense
      //     ? (account.balance ?? 0) - parsedAmount
      //     : (account.balance ?? 0) + parsedAmount;
      //   await AccountRepository.updateBalance(sourceId, newBalance);
      // }

      navigation?.goBack();
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
            style={[styles.toggleBtn, type === t && styles.toggleBtnActive(t)]}
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
            />
          ) : (
            <CategoryPicker
              activeId={incomeCategory}
              onSelect={setIncomeCategory}
              onSeeAll={() => setIncomeCategoryModalVisible(true)}
              categories={INCOME_CATEGORIES}
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
      />

      <CategoryModal
        visible={incomeCategoryModalVisible}
        activeId={incomeCategory}
        onSelect={setIncomeCategory}
        onClose={() => setIncomeCategoryModalVisible(false)}
        categories={INCOME_CATEGORIES}
      />

      <PaymentSourceModal
        visible={sourceModalVisible}
        activeId={sourceId}
        onSelect={setSourceId}
        onClose={() => setSourceModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  toggleWrap: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginTop: hp(2),
    backgroundColor: colors.surfacePrimary,
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
  toggleBtnActive: type => ({
    backgroundColor: type === 'expense' ? colors.error : colors.primary,
  }),
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
    backgroundColor: colors.background,
  },
});

export default AddTransactionScreen;
