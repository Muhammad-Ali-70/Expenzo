import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react-native';
import { Label, borderRadius, shadowCard } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';
import { hp, wp } from '../../constants/responsive';

const ApprovalCard = ({
  title,
  message,
  amount,
  onApprove,
  onReject,
  loading,
}) => {
  const theme = useThemeColors();

  return (
    <View
      style={[
        styles.card,
        shadowCard,
        { backgroundColor: theme.surfacePrimary, borderColor: theme.outlineVariant },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: theme.primary + '18' }]}>
          <TrendingUp
            size={wp(4.5)}
            color={theme.primary}
            strokeWidth={2}
          />
        </View>
        <View style={styles.headerText}>
          <Label type="bodySmall" weight="semiBold" color="textMain">
            {title}
          </Label>
          {amount != null && (
            <Label type="bodyXs" weight="regular" color="primary">
              PKR {Number(amount).toLocaleString()}
            </Label>
          )}
        </View>
      </View>

      {message ? (
        <Label type="bodyXs" weight="regular" color="textMuted" style={styles.message}>
          {message}
        </Label>
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.approveBtn, { backgroundColor: '#ECFDF5' }]}
          onPress={onApprove}
          activeOpacity={0.7}
          disabled={loading}
        >
          <CheckCircle size={wp(4)} color="#10B981" strokeWidth={2} />
          <Label type="bodyXs" weight="semiBold" style={{ color: '#10B981' }}>
            Approve
          </Label>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.rejectBtn, { backgroundColor: '#FFF1F2' }]}
          onPress={onReject}
          activeOpacity={0.7}
          disabled={loading}
        >
          <XCircle size={wp(4)} color="#F43F5E" strokeWidth={2} />
          <Label type="bodyXs" weight="semiBold" style={{ color: '#F43F5E' }}>
            Reject
          </Label>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: wp(4),
    gap: hp(1.5),
    marginBottom: hp(1.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  iconWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: hp(0.2),
  },
  message: {
    lineHeight: hp(2),
  },
  actions: {
    flexDirection: 'row',
    gap: wp(3),
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(1.5),
    paddingVertical: hp(1.2),
    borderRadius: borderRadius.lg,
  },
});

export default ApprovalCard;
