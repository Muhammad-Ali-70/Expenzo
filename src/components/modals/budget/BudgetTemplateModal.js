import React from 'react';
import { View, Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { X, Check } from 'lucide-react-native';
import { borderRadius, Label } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const TemplateCard = ({ template, selected, onSelect, s }) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.7}
    style={[s.card, selected && s.cardSelected]}
  >
    <View style={s.cardInfo}>
      <Label type="bodySmall" weight="semiBold" color="textMain">
        {template.name}
      </Label>
      <Label type="bodyXs" weight="regular" color="textMuted" style={s.desc}>
        {template.description}
      </Label>
    </View>
    {selected && <Check size={wp(5)} color={s.checkColor} strokeWidth={2.5} />}
  </TouchableOpacity>
);

const BudgetTemplateModal = ({ visible, templates = [], onSelect, onClose }) => {
  const theme = useThemeColors();
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: wp(5),
    },
    card: {
      width: '100%',
      backgroundColor: theme.surfacePrimary,
      borderRadius: borderRadius.xl,
      paddingTop: hp(2.5),
      maxHeight: '70%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      paddingBottom: hp(1.5),
      borderBottomWidth: 0.5,
      borderBottomColor: theme.outlineVariant,
    },
    closeBtn: {
      width: wp(8),
      height: wp(8),
      borderRadius: wp(4),
      backgroundColor: theme.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(1.5),
      gap: hp(1.2),
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: wp(4),
      borderRadius: borderRadius.lg,
      backgroundColor: theme.surfaceSecondary,
      borderWidth: 1,
      borderColor: theme.outlineVariant,
    },
    cardSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + '10',
    },
    cardInfo: {
      flex: 1,
      gap: hp(0.3),
    },
    desc: {
      lineHeight: hp(1.8),
    },
    checkColor: theme.primary,
  });

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.header}>
                <Label type="bodyMedium" weight="bold" color="textMain">
                  Budget Templates
                </Label>
                <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={styles.closeBtn}>
                  <X size={wp(4.5)} color={theme.textMuted} strokeWidth={2} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={templates}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                  <TemplateCard
                    template={item}
                    onSelect={() => {
                      onSelect(item);
                      onClose();
                    }}
                    s={styles}
                  />
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BudgetTemplateModal;
