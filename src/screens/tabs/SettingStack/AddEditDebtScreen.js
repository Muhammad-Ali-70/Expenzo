import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import AppTextInput from '../../../components/ui/AppTextInput';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import DateTimeRow from '../../../components/addexpense/DateTimeRow'; // Re-using existing component
import { useThemeColors } from '@hooks/useThemeColors';
import { hp, wp } from '../../../constants/responsive';
import { createDebtApi, getDebtByIdApi, updateDebtApi } from '../../../services/debtService';
import { useToastService } from '../../../utils/ToastService';
import { ThemedView } from '../../../components/ui/ThemedView';

const AddEditDebtScreen = ({ navigation, route }) => {
  const { debtId } = route.params || {};
  const isEditing = !!debtId;

  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const toast = useToastService();

  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [counterpartyName, setCounterpartyName] = useState('');
  const [counterpartyEmail, setCounterpartyEmail] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [interestRate, setInterestRate] = useState('');
  const [interestType, setInterestType] = useState('simple'); // Default to simple
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingDebt, setLoadingDebt] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchDebt = async () => {
        try {
          const data = await getDebtByIdApi(debtId);
          setDescription(data.description || '');
          setTotalAmount(data.totalAmount?.toString() || '');
          setCounterpartyName(data.counterpartyName || '');
          setCounterpartyEmail(data.counterpartyEmail || '');
          setStartDate(new Date(data.startDate));
          setDueDate(new Date(data.dueDate));
          setInterestRate(data.interestRate?.toString() || '');
          setInterestType(data.interestType || 'simple');
          setCategory(data.category || '');
          setNotes(data.notes || '');
        } catch (err) {
          console.error('Failed to fetch debt for editing:', err);
          Alert.alert('Error', 'Failed to load debt for editing.');
          navigation.goBack();
        } finally {
          setLoadingDebt(false);
        }
      };
      fetchDebt();
    }
  }, [isEditing, debtId, navigation]);

  const handleSave = useCallback(async () => {
    const parsedAmount = parseFloat(totalAmount);
    const parsedInterestRate = interestRate ? parseFloat(interestRate) : undefined;

    if (!parsedAmount || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid total amount.');
      return;
    }
    if (!counterpartyName.trim()) {
      Alert.alert('Counterparty Required', 'Please enter the counterparty name.');
      return;
    }
    if (dueDate < startDate) {
      Alert.alert('Invalid Dates', 'Due date cannot be before the start date.');
      return;
    }

    setSaving(true);
    try {
      const debtData = {
        description: description.trim(),
        totalAmount: parsedAmount,
        counterpartyName: counterpartyName.trim(),
        counterpartyEmail: counterpartyEmail.trim(),
        startDate: startDate.toISOString(),
        dueDate: dueDate.toISOString(),
        interestRate: parsedInterestRate,
        interestType,
        category: category.trim(),
        notes: notes.trim(),
      };

      if (isEditing) {
        await updateDebtApi(debtId, debtData);
        toast.success('Debt updated successfully!');
      } else {
        await createDebtApi(debtData);
        toast.success('Debt created successfully!');
      }
      navigation.goBack(); // Navigate back to DebtScreen
    } catch (e) {
      console.error('Save debt failed:', e);
      const message = e?.message ?? `Could not ${isEditing ? 'update' : 'create'} debt. Please try again.`;
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }, [
    totalAmount,
    counterpartyName,
    counterpartyEmail,
    startDate,
    dueDate,
    description,
    interestRate,
    interestType,
    category,
    notes,
    isEditing,
    debtId,
    navigation,
    toast,
  ]);

  if (loadingDebt) {
    return (
      <ThemedView style={styles.safe}>
        <ScreenHeader title={isEditing ? 'Edit Debt' : 'Add Debt'} onBack={() => navigation.goBack()} />
        <View style={styles.loadingWrap}>
          <PrimaryLoader width={100} height={100} />
        </View>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenHeader
        title={isEditing ? 'Edit Debt' : 'Add Debt'}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <AppTextInput
            label="Description"
            placeholder="e.g., Car Loan, Student Fees"
            value={description}
            onChangeText={setDescription}
            returnKeyType="next"
          />
          <AppTextInput
            label="Total Amount"
            placeholder="0.00"
            value={totalAmount}
            onChangeText={setTotalAmount}
            keyboardType="numeric"
            leftIconName="card"
            returnKeyType="next"
          />
          <AppTextInput
            label="Counterparty Name"
            placeholder="e.g., Bank, Friend Name"
            value={counterpartyName}
            onChangeText={setCounterpartyName}
            leftIconName="user"
            returnKeyType="next"
          />
          <AppTextInput
            label="Counterparty Email (Optional)"
            placeholder="e.g., example@email.com"
            value={counterpartyEmail}
            onChangeText={setCounterpartyEmail}
            keyboardType="email-address"
            leftIconName="mail"
            returnKeyType="next"
          />
          <DateTimeRow label="Start Date" date={startDate} onChange={setStartDate} />
          <DateTimeRow label="Due Date" date={dueDate} onChange={setDueDate} />
          <AppTextInput
            label="Interest Rate (Optional)"
            placeholder="e.g., 5.0"
            value={interestRate}
            onChangeText={setInterestRate}
            keyboardType="numeric"
            returnKeyType="next"
            rightIconName="trending-up"
          />
          {/* A picker for interestType (simple/compound) could be added here */}
          <AppTextInput
            label="Category (Optional)"
            placeholder="e.g., Education, Personal"
            value={category}
            onChangeText={setCategory}
            returnKeyType="next"
          />
          <AppTextInput
            label="Notes (Optional)"
            placeholder="Any additional notes about the debt"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            inputStyle={styles.notesInput}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          variant="primary"
          size="lg"
          label={saving ? 'Saving…' : isEditing ? 'Update Debt' : 'Add Debt'}
          icon={<CheckCircle size={wp(5)} color={theme.onPrimary} />}
          onPress={handleSave}
          disabled={saving}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: t.background,
    },
    scrollContent: {
      paddingBottom: hp(2),
    },
    form: {
      paddingTop: hp(2.5),
      paddingHorizontal: wp(5),
      gap: hp(2.5),
    },
    footer: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
      backgroundColor: t.background,
    },
    notesInput: {
      height: hp(10), // Adjust height for multiline input
      textAlignVertical: 'top',
    },
    loadingWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AddEditDebtScreen;
