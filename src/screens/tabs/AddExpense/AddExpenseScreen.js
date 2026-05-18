import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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
import colors from '../../../constants/colors';
import { hp, wp } from '../../../constants/responsive';
import PaymentSourceModal from '../../../components/modals/PaymentSourceModal';

const AddExpenseScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('transport');
  const [source, setSource] = useState('wallet');
  const [notes, setNotes] = useState('');
  const [dateLabel] = useState('Today, 2:45 PM');

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [sourceModalVisible, setSourceModalVisible] = useState(false);

  const handleSave = () => navigation?.goBack();

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
            activeId={source}
            onSelect={setSource}
            onSeeAll={() => setSourceModalVisible(true)}
          />

          <DateTimeRow label={dateLabel} onPress={() => {}} />

          <NotesInput value={notes} onChangeText={setNotes} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          variant="primary"
          size="lg"
          label="Save Expense"
          icon={CheckCircle}
          onPress={handleSave}
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
        activeId={source}
        onSelect={setSource}
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
