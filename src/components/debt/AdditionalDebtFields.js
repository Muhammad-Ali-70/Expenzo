import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import { Label, borderRadius } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import AppTextInput from '../ui/AppTextInput';
import DebtNotesInput from './DebtNotesInput';
import InterestTypeToggle from './InterestTypeToggle';
import InterestFrequencyPicker from './InterestFrequencyPicker';
import ReminderFrequencyToggle from './ReminderFrequencyToggle';
import ReminderChannelToggle from './ReminderChannelToggle';

const AdditionalDebtFields = ({
  interestType,
  onInterestTypeChange,
  interestRate,
  onInterestRateChange,
  interestFrequency,
  onInterestFrequencyChange,
  category,
  onCategoryChange,
  reminderDaysBefore,
  onReminderDaysBeforeChange,
  reminderFrequency,
  onReminderFrequencyChange,
  reminderChannels,
  onReminderChannelsChange,
  notes,
  onNotesChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isInterestDisabled = interestType === 'none';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
        style={styles.header}
      >
        <Label type="bodySmall" weight="semiBold" color="textMain">
          Additional Fields
        </Label>
        {expanded ? (
          <ChevronUp size={wp(5)} color={theme.textMuted} strokeWidth={2} />
        ) : (
          <ChevronDown size={wp(5)} color={theme.textMuted} strokeWidth={2} />
        )}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <InterestTypeToggle
            value={interestType}
            onChange={onInterestTypeChange}
          />
          <AppTextInput
            label="Interest Rate (%)"
            placeholder="Enter rate %"
            value={interestRate}
            onChangeText={onInterestRateChange}
            keyboardType="numeric"
            returnKeyType="next"
            editable={!isInterestDisabled}
            containerStyle={isInterestDisabled && styles.disabledInput}
          />
          <InterestFrequencyPicker
            value={interestFrequency}
            onChange={onInterestFrequencyChange}
            disabled={isInterestDisabled}
          />
          <AppTextInput
            label="Category"
            placeholder="Personal"
            value={category}
            onChangeText={onCategoryChange}
            returnKeyType="next"
          />
          <AppTextInput
            label="Reminder Days Before"
            placeholder="3"
            value={reminderDaysBefore}
            onChangeText={onReminderDaysBeforeChange}
            keyboardType="numeric"
            returnKeyType="next"
          />
          <ReminderFrequencyToggle
            value={reminderFrequency}
            onChange={onReminderFrequencyChange}
          />
          <ReminderChannelToggle
            value={reminderChannels}
            onChange={onReminderChannelsChange}
          />
          <DebtNotesInput value={notes} onChangeText={onNotesChange} />
        </View>
      )}
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    container: {
      marginBottom: hp(1),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: t.surfacePrimary,
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: t.outlineVariant,
    },
    content: {
      marginTop: hp(2),
      gap: hp(2),
    },
    disabledInput: {
      opacity: 0.5,
    },
  });

export default AdditionalDebtFields;
