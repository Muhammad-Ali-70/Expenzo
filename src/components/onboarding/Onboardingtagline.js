import React from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';

const OnboardingTagline = ({ title, subtitle, style }) => {
  return (
    <View style={[styles.container, style]}>
      {title ? (
        <Label
          type="h3"
          weight="semiBold"
          color="textMain"
          style={styles.title}
        >
          {title}
        </Label>
      ) : null}

      {subtitle ? (
        <Label
          type="bodySmall"
          weight="regular"
          color="textMuted"
          style={styles.subtitle}
        >
          {subtitle}
        </Label>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingBottom: hp(1.5),
  },
  title: {
    textAlign: 'center',
    marginBottom: hp(1),
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default OnboardingTagline;
