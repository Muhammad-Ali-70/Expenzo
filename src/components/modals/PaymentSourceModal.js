import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { wp, hp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import { BANKS, SOURCES } from '../../constants/dummy/data';
import BottomSheet from '../ui/BottomSheet';
import SelectableIcon from '../ui/SelectableIcon';

const BankTile = ({ item, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.bankTile, active && styles.bankTileActive]}
  >
    {item.image ? (
      <Image
        source={item.image}
        style={styles.bankImage}
        resizeMode="contain"
      />
    ) : (
      <View style={styles.bankImagePlaceholder}>
        <Label type="bodyXs" weight="bold" color="textMuted">
          {item.label.slice(0, 2).toUpperCase()}
        </Label>
      </View>
    )}
    <Label
      type="bodyXs"
      weight={active ? 'semiBold' : 'regular'}
      color={active ? 'primary' : 'textMuted'}
    >
      {item.label}
    </Label>
  </TouchableOpacity>
);

const PaymentSourceModal = ({ visible, activeId, onSelect, onClose }) => {
  const handleSelect = id => {
    onSelect(id);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Payment Source">
      {/* Wallet / Bank / Easypaisa row — reuse SelectableIcon in grid mode */}
      <Label
        type="bodyXs"
        weight="semiBold"
        color="textMuted"
        style={styles.sectionLabel}
      >
        ACCOUNTS
      </Label>
      <View style={styles.sourcesRow}>
        {SOURCES.map(src => (
          <SelectableIcon
            key={src.id}
            iconName={src.iconName}
            iconBg={src.iconBg}
            iconColor={src.iconColor}
            label={src.label}
            active={activeId === src.id}
            onPress={() => handleSelect(src.id)}
            size="grid"
          />
        ))}
      </View>

      <Label
        type="bodyXs"
        weight="semiBold"
        color="textMuted"
        style={styles.sectionLabel}
      >
        BANKS
      </Label>
      <FlatList
        data={BANKS}
        keyExtractor={item => item.id}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <BankTile
            item={item}
            active={activeId === item.id}
            onPress={() => handleSelect(item.id)}
          />
        )}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sectionLabel: {
    paddingHorizontal: wp(5),
    marginBottom: hp(1),
    letterSpacing: 0.6,
  },
  sourcesRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    gap: wp(2),
  },
  grid: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(1),
    gap: hp(0.5),
  },
  row: {
    justifyContent: 'space-between',
  },
  bankTile: {
    width: (wp(100) - wp(6) - wp(9)) / 4,
    alignItems: 'center',
    gap: hp(0.8),
    paddingVertical: hp(1.5),
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bankTileActive: {
    borderColor: colors.primary,
  },
  bankImage: {
    width: wp(11),
    height: wp(11),
    borderRadius: borderRadius.md,
  },
  bankImagePlaceholder: {
    width: wp(11),
    height: wp(11),
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentSourceModal;
