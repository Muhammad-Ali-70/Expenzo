import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { hp, wp } from '../../../constants/responsive';
import { borderRadius } from '../../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';

const SkeletonSection = ({ itemCount = 3 }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SkeletonPlaceholder borderRadius={borderRadius.sm} speed={1000}>
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <SkeletonPlaceholder.Item
            width={wp(28)}
            height={hp(2)}
            borderRadius={borderRadius.sm}
          />
          <SkeletonPlaceholder.Item
            width={wp(18)}
            height={hp(1.8)}
            borderRadius={borderRadius.sm}
          />
        </View>

        {Array.from({ length: itemCount }).map((_, i) => (
          <View key={i} style={styles.itemRow}>
            <SkeletonPlaceholder.Item
              width={wp(11)}
              height={wp(11)}
              borderRadius={wp(5.5)}
            />
            <View style={styles.textCol}>
              <SkeletonPlaceholder.Item
                width="62%"
                height={hp(1.6)}
                borderRadius={borderRadius.sm}
              />
              <SkeletonPlaceholder.Item
                width="38%"
                height={hp(1.2)}
                borderRadius={borderRadius.sm}
              />
            </View>
            <SkeletonPlaceholder.Item
              width={wp(14)}
              height={hp(1.6)}
              borderRadius={borderRadius.sm}
            />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

const createStyles = t =>
  StyleSheet.create({
    section: {
      marginHorizontal: wp(5),
      marginTop: hp(2.5),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(1.5),
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: t.surfacePrimary,
      borderRadius: borderRadius.lg,
      paddingVertical: wp(2),
      paddingHorizontal: wp(2),
      marginBottom: hp(1.2),
    },
    textCol: {
      flex: 1,
      marginLeft: wp(3),
      gap: hp(0.8),
    },
  });

export default SkeletonSection;
