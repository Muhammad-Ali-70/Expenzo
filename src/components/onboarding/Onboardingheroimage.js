import React, { useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useThemeColors } from '@hooks/useThemeColors';
import { borderRadius, shadowCard } from '../../constants/globalstyle';
import { hp, wp } from '../../constants/responsive';

const OnboardingHeroImage = ({ source, aspectRatio = 1.3, style }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const cardWidth = wp(70);
  const cardHeight = cardWidth / aspectRatio;

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <Image source={source} style={styles.image} resizeMode="cover" />
      </View>
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  card: {
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    backgroundColor: t.surfaceSecondary,
    ...shadowCard,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default OnboardingHeroImage;
