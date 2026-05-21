import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
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
import { useAccounts } from '../../../database/hooks/useAccounts';
import TransactionRepository from '../../../database/repositories/TransactionRepository';
import AccountRepository from '../../../database/repositories/AccountRepository';

const AddExpenseScreen = ({ navigation }) => {
  const { primaryAccount } = useAccounts();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('transport');
  const [sourceId, setSourceId] = useState(null); // account.id (string)
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [sourceModalVisible, setSourceModalVisible] = useState(false);

  // Once accounts load, set the default source to primary account
  useEffect(() => {
    if (primaryAccount && sourceId === null) {
      setSourceId(primaryAccount.id);
    }
  }, [primaryAccount, sourceId]);

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid expense amount.');
      return;
    }

    if (!sourceId) {
      Alert.alert('No account', 'Please select a payment source.');
      return;
    }

    setSaving(true);
    try {
      console.log('=== Creating Expense Transaction ===');
      console.log('accountId:', sourceId);
      console.log('type:', 'expense');
      console.log('amount:', parsedAmount);
      console.log('category:', category);
      console.log('description:', description.trim());
      console.log('note:', notes.trim());
      console.log('date:', date.getTime());
      console.log('date readable:', date.toString());
      console.log('====================================');
      // 1. Create the transaction record
      await TransactionRepository.create({
        accountId: sourceId,
        type: 'expense',
        amount: parsedAmount,
        category,
        description: description.trim(), // ← title shown in list
        note: notes.trim(), // ← internal notes
        date: date.getTime(),
      });

      // 2. Deduct from the account balance
      const account = await AccountRepository.getAll().then(all =>
        all.find(a => a.id === sourceId),
      );
      if (account) {
        const newBalance = (account.balance ?? 0) - parsedAmount;
        await AccountRepository.updateBalance(sourceId, newBalance);
      }

      navigation?.goBack();
    } catch (e) {
      console.error('Save expense failed:', e);
      Alert.alert('Error', 'Could not save expense. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenHeader title="Add Expense" onBack={() => navigation?.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <AmountHeader value={amount} onChangeText={setAmount} />

        <View style={styles.form}>
          <DescriptionInput value={description} onChangeText={setDescription} />

          <CategoryPicker
            activeId={category}
            onSelect={setCategory}
            onSeeAll={() => setCategoryModalVisible(true)}
          />

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
          label={saving ? 'Saving…' : 'Save Expense'}
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

export default AddExpenseScreen;
