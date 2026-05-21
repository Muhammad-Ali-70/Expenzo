import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays, ChevronRight } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';

const formatDate = date => {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeStr = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isToday) return `Today, ${timeStr}`;

  return (
    date.toLocaleDateString([], { month: 'short', day: 'numeric' }) +
    ', ' +
    timeStr
  );
};

const DateTimeRow = ({ date, onChange }) => {
  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState('date'); // 'date' | 'time'

  const handlePress = () => {
    setMode('date');
    setShow(true);
  };

  const handleChange = (event, selected) => {
    if (event.type === 'dismissed') {
      setShow(false);
      return;
    }

    if (selected) {
      if (mode === 'date') {
        // Merge selected date with existing time
        const next = new Date(selected);
        next.setHours(date.getHours(), date.getMinutes());
        onChange(next);
        // On Android, show the time picker next
        if (Platform.OS === 'android') {
          setMode('time');
        } else {
          setShow(false);
        }
      } else {
        // time step done
        onChange(selected);
        setShow(false);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.75}
        style={styles.card}
      >
        <View style={styles.left}>
          <Label type="bodyXs" weight="medium" color="textMuted">
            Date &amp; Time
          </Label>
          <View style={styles.row}>
            <CalendarDays
              size={wp(4.2)}
              color={colors.secondary}
              strokeWidth={1.8}
            />
            <Label type="bodySmall" weight="semiBold" color="textMain">
              {formatDate(date)}
            </Label>
          </View>
        </View>
        <ChevronRight
          size={wp(4.5)}
          color={colors.textMuted}
          strokeWidth={1.8}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadowCard,
  },
  left: {
    gap: hp(0.6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
});

export default DateTimeRow;
