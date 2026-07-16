import React, { useMemo } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from 'react-native';
import { X, Check, Layout } from 'lucide-react-native';
import { borderRadius, Label } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const TemplateItem = ({ template, isLast, onPress, s, t }) => {
  const totalFromLimits = template.categoryLimits.reduce((sum, cl) => sum + cl.limit, 0);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[s.item, !isLast && s.itemDivider]}
    >
      <View style={[s.iconBox, { backgroundColor: t.surfaceSecondary }]}>
        <Layout size={wp(4.5)} color={t.primary} strokeWidth={1.8} />
      </View>
      <View style={s.itemInfo}>
        <Label type="bodySmall" weight="semiBold" color="textMain">
          {template.name}
        </Label>
        <Label type="bodyXs" weight="regular" color="textMuted" style={s.desc}>
          {template.description}
        </Label>
        <Label type="bodyXs" weight="regular" color="textMuted">
          {template.categoryLimits.length} categories · {totalFromLimits.toLocaleString()} PKR total
        </Label>
      </View>
      <Check size={wp(5)} color={t.primary} strokeWidth={2.5} />
    </TouchableOpacity>
  );
};

const BudgetTemplateModal = ({ visible, templates = [], onSelect, onClose }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                  <View style={[styles.iconBox, { backgroundColor: theme.surfaceSecondary }]}>
                    <Layout size={wp(4.5)} color={theme.primary} strokeWidth={1.8} />
                  </View>
                  <Label type="bodyMedium" weight="bold" color="textMain">
                    Budget Templates
                  </Label>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={styles.closeBtn}
                >
                  <X size={wp(4.5)} color={theme.textMuted} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={templates}
                keyExtractor={(item) => item.id}
                scrollEnabled={templates.length > 5}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                  <TemplateItem
                    template={item}
                    isLast={index === templates.length - 1}
                    onPress={() => {
                      onSelect(item);
                      onClose();
                    }}
                    s={styles}
                    t={theme}
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

const createStyles = (t) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: wp(5),
    },
    card: {
      width: '100%',
      backgroundColor: t.surfacePrimary,
      borderRadius: borderRadius.xl,
      paddingTop: hp(2.5),
      maxHeight: '75%',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(5),
      paddingBottom: hp(1.5),
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2.5),
    },
    closeBtn: {
      width: wp(8),
      height: wp(8),
      borderRadius: wp(4),
      backgroundColor: t.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconBox: {
      width: wp(9),
      height: wp(9),
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      paddingHorizontal: wp(5),
      paddingTop: hp(0.5),
      paddingBottom: hp(1),
    },
    item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: hp(1.8),
      gap: wp(3),
    },
    itemDivider: {
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    itemInfo: {
      flex: 1,
      gap: hp(0.3),
    },
    desc: {
      lineHeight: hp(1.8),
    },
  });

export default BudgetTemplateModal;
