import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { Label } from '../../constants/globalstyle';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const CarouselSlide = ({ slide, isActive }) => {
  const theme = useThemeColors();
  const opacity = useSharedValue(0);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const animationRef = useRef(null);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  useEffect(() => {
    if (isActive && animationRef.current) {
      animationRef.current.reset();
      animationRef.current.play();
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.content}>
        <LottieView
          ref={animationRef}
          source={slide.animation}
          autoPlay={false}
          loop={false}
          style={styles.animation}
        />

        <Label
          type="displayMd"
          weight="bold"
          color="textMain"
          style={styles.title}
        >
          {slide.title}
        </Label>

        <Label
          type="body"
          weight="regular"
          color="textMuted"
          style={styles.subtitle}
        >
          {slide.subtitle}
        </Label>
      </View>
    </Animated.View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.background,
      width: wp(100),
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: wp(5),
    },
    animation: {
      width: wp(80),
      height: wp(80),
      marginBottom: hp(4),
    },
    title: {
      textAlign: 'center',
      paddingHorizontal: wp(8),
      marginBottom: hp(2),
    },
    subtitle: {
      textAlign: 'center',
      paddingHorizontal: wp(10),
      lineHeight: 22,
    },
  });

export default CarouselSlide;
