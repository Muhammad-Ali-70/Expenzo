import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import BottomSheet from '../ui/BottomSheet';
import AccountTile from '../ui/AccountTile';
import { BANKS } from '../../constants/theme/accountMeta';

const BankPickerModal = ({
  visible,
  activeId,
  usedIds = [],
  onSelect,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  const filtered = BANKS.filter(b =>
    b.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = item => {
    onSelect(item);
    onClose();
    setQuery('');
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Select Your Bank">
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search bank…"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={4}
        scrollEnabled={filtered.length > 8}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <AccountTile
            imageUri={item.imageUri}
            initials={item.initials}
            color={item.color}
            label={item.label}
            active={activeId === item.id}
            disabled={usedIds.includes(item.id)}
            onPress={() => handleSelect(item)}
          />
        )}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  searchWrap: {
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.1),
  },
  search: { fontSize: 13, color: colors.textMain, padding: 0 },
  grid: { paddingHorizontal: wp(3), paddingBottom: hp(1), gap: hp(0.5) },
  row: { justifyContent: 'space-between' },
});

export default BankPickerModal;
