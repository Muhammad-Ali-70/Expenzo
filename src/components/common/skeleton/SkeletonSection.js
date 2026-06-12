import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import colors from '../../../constants/colors';
import { borderRadius } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';

const ShimmerBlock = ({ style }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        style,
        {
          backgroundColor: colors.textMuted + '20',
          opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.7],
          }),
        },
      ]}
    />
  );
};

const SkeletonItem = () => (
  <View style={styles.itemRow}>
    <ShimmerBlock style={styles.icon} />
    <View style={styles.textCol}>
      <ShimmerBlock style={styles.titleLine} />
      <ShimmerBlock style={styles.subtitleLine} />
    </View>
    <ShimmerBlock style={styles.amountLine} />
  </View>
);

const SkeletonSection = ({ itemCount = 3 }) => (
  <View style={styles.section}>
    <View style={styles.headerRow}>
      <ShimmerBlock style={styles.headerLeft} />
      <ShimmerBlock style={styles.headerRight} />
    </View>
    {Array.from({ length: itemCount }).map((_, i) => (
      <SkeletonItem key={i} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  headerLeft: {
    width: wp(28),
    height: hp(2),
    borderRadius: borderRadius.sm,
  },
  headerRight: {
    width: wp(18),
    height: hp(1.8),
    borderRadius: borderRadius.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.lg,
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    marginBottom: hp(1.2),
  },
  icon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
  },
  textCol: {
    flex: 1,
    marginLeft: wp(3),
    gap: hp(0.8),
  },
  titleLine: {
    width: '62%',
    height: hp(1.6),
    borderRadius: borderRadius.sm,
  },
  subtitleLine: {
    width: '38%',
    height: hp(1.2),
    borderRadius: borderRadius.sm,
  },
  amountLine: {
    width: wp(14),
    height: hp(1.6),
    borderRadius: borderRadius.sm,
  },
});

export default SkeletonSection;
