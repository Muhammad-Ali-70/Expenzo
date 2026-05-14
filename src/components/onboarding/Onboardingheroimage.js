import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { borderRadius, shadowCard } from '../../constants/globalstyle';
import { hp, wp } from '../../constants/responsive';

const OnboardingHeroImage = ({ source, aspectRatio = 1.3, style }) => {
  const cardWidth = wp(88);
  const cardHeight = cardWidth / aspectRatio;

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <Image source={source} style={styles.image} resizeMode="cover" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  card: {
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSecondary,
    ...shadowCard,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default OnboardingHeroImage;
