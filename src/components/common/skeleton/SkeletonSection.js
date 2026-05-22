import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../constants/colors';
import { borderRadius } from '../../../constants/globalstyle';
import { hp, wp } from '../../../constants/responsive';

const SkeletonItem = () => (
  <SkeletonPlaceholder.Item
    flexDirection="row"
    alignItems="center"
    backgroundColor={colors.surfacePrimary}
    borderRadius={borderRadius.lg}
    paddingVertical={wp(2)}
    paddingHorizontal={wp(2)}
    gap={wp(3)}
  >
    {/* Icon */}
    <SkeletonPlaceholder.Item
      width={wp(11)}
      height={wp(11)}
      borderRadius={wp(5.5)}
    />

    {/* Text lines */}
    <SkeletonPlaceholder.Item flex={1} gap={hp(0.8)}>
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
    </SkeletonPlaceholder.Item>

    {/* Amount */}
    <SkeletonPlaceholder.Item
      width={wp(14)}
      height={hp(1.6)}
      borderRadius={borderRadius.sm}
    />
  </SkeletonPlaceholder.Item>
);

const SkeletonSection = ({ itemCount = 3 }) => (
  <View style={styles.section}>
    <SkeletonPlaceholder
      backgroundColor={colors.textMuted + '20'}
      highlightColor={colors.textMuted + '50'}
      speed={1200}
    >
      {/* Header */}
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={hp(1.5)}
      >
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
      </SkeletonPlaceholder.Item>

      {/* Items */}
      <SkeletonPlaceholder.Item gap={hp(1.2)}>
        {Array.from({ length: itemCount }).map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
  },
});

export default SkeletonSection;
