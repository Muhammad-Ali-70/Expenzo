import React, { useState, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { hp, wp } from '../../constants/responsive';
import { useThemeColors } from '@hooks/useThemeColors';

const fillDaysForMonth = (dailySpending = [], daysInMonth, emptyColor) => {
  const map = {};
  dailySpending.forEach(d => { map[d.day] = d.total; });
  return Array.from({ length: daysInMonth }, (_, i) => ({
    value: map[i + 1] ?? 0,
    label: (i + 1) % 5 === 0 || i === daysInMonth - 1 ? String(i + 1) : '',
    frontColor: map[i + 1] ? undefined : emptyColor,
  }));
};

const SpendingBarChart = ({
  dailySpending,
  data,
  daysInMonth,
  width: propWidth,
  height = hp(12),
  barColor: _barColor,
  gradientColor,
  emptyBarColor: _emptyBarColor,
  barBorderRadius = 3,
  noOfSections = 3,
  isAnimated = true,
  animationDuration = 600,
  ...rest
}) => {
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
  const theme = useThemeColors();
  const barColor = _barColor ?? theme.primary;
  const emptyBarColor = _emptyBarColor ?? theme.surfaceContainer;

  const containerWidth = propWidth || measuredWidth || screenWidth - wp(10) * 2;

  const resolvedDays =
    daysInMonth ??
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  const barData =
    data ??
    fillDaysForMonth(dailySpending, resolvedDays, emptyBarColor).map(d => ({
      ...d,
      frontColor: d.frontColor ?? barColor,
    }));

  const maxVal = Math.max(...barData.map(b => b.value), 1);
  const effectiveGradient = gradientColor ?? barColor;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View
      onLayout={e => {
        if (!measuredWidth) setMeasuredWidth(e.nativeEvent.layout.width);
      }}
      style={styles.container}
    >
      <BarChart
        data={barData}
        width={containerWidth}
        height={height}
        barWidth={containerWidth / 35}
        maxValue={maxVal * 1.3}
        noOfSections={noOfSections}
        isAnimated={isAnimated}
        animationDuration={animationDuration}
        yAxisThickness={0}
        xAxisThickness={0}
        rulesColor="transparent"
        showGradient
        gradientColor={effectiveGradient}
        frontColor={barColor}
        barBorderRadius={barBorderRadius}
        labelTextStyle={{ fontSize: 8, color: theme.textMuted }}
        spacing={containerWidth / 40}
        {...rest}
      />
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SpendingBarChart;
