import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { hp, wp } from '../../constants/responsive';

const OnboardingHeader = ({ title = 'Expenzo', showSkip = true, onSkip }) => {
  return (
    <View style={styles.container}>
      <Label type="h4" weight="bold" color="primary">
        {title}
      </Label>

      {showSkip && (
        <TouchableOpacity
          onPress={onSkip}
          activeOpacity={0.6}
          hitSlop={styles.hitSlop}
        >
          <Label type="bodySmall" weight="medium" color="textMuted">
            SKIP
          </Label>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 16,
    right: 4,
  },
});

export default OnboardingHeader;
