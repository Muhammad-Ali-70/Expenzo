import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useThemeColors } from '@hooks/useThemeColors';
import { wp, hp } from '../../constants/responsive';

const CarouselDotIndicator = ({ total = 3, currentIndex = 0 }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <AnimatedDot key={index} isActive={isActive} theme={theme} />
        );
      })}
    </View>
  );
};

const AnimatedDot = ({ isActive, theme }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scaleX = withSpring(isActive ? 1 : 1, {
      damping: 12,
      stiffness: 150,
    });

    const opacity = withSpring(isActive ? 1 : 0.4, {
      damping: 12,
      stiffness: 150,
    });

    return {
      transform: [{ scaleX }],
      opacity,
    };
  });

  const dotStyle = {
    width: isActive ? wp(6) : wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: isActive ? theme.primary : theme.outlineVariant,
    marginHorizontal: wp(1),
  };

  return <Animated.View style={[dotStyle, animatedStyle]} />;
};

const createStyles = t =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(2),
    },
  });

export default CarouselDotIndicator;
