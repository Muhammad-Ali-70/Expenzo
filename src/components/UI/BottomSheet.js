import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';

const BottomSheet = ({ visible, onClose, title, children }) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.backdrop} />
    </TouchableWithoutFeedback>

    <View style={styles.sheet}>
      <View style={styles.handle} />

      {title && (
        <Label
          type="bodyMedium"
          weight="bold"
          color="textMain"
          style={styles.title}
        >
          {title}
        </Label>
      )}

      {children}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(11,28,48,0.4)',
  },
  sheet: {
    backgroundColor: colors.surfacePrimary,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingTop: hp(1.5),
    paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(2.5),
  },
  handle: {
    width: wp(10),
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.outlineVariant,
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  title: {
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
  },
});

export default BottomSheet;
