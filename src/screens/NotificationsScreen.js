import React, { useEffect, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Bell, CheckCheck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeColors } from '@hooks/useThemeColors';
import ScreenHeader from '../components/common/Screenheader';
import PrimaryLoader from '../components/ui/PrimaryLoader';
import useNotificationStore from '../store/useNotificationStore';
import { hp, wp } from '../constants/responsive';
import { borderRadius, Label } from '../constants/globalstyle';

const TYPE_COLORS = {
  budget_warning: '#F59E0B',
  budget_exceeded: '#EF4444',
  category_warning: '#F59E0B',
  category_exceeded: '#EF4444',
};

const NotificationItem = ({ item, onPress, s }) => (
  <TouchableOpacity
    style={[s.item, !item.read && s.itemUnread]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[
        s.iconWrap,
        { backgroundColor: (TYPE_COLORS[item.type] || '#F59E0B') + '20' },
      ]}
    >
      <Bell
        size={wp(5)}
        color={TYPE_COLORS[item.type] || '#F59E0B'}
        strokeWidth={1.8}
      />
    </View>
    <View style={s.itemContent}>
      <Label
        type="bodySmall"
        weight={item.read ? 'regular' : 'semiBold'}
        color="textMain"
      >
        {item.title}
      </Label>
      <Label type="bodyXs" weight="regular" color="textMuted" style={s.message}>
        {item.message}
      </Label>
      <Label type="caption" weight="regular" color="textMuted">
        {new Date(item.createdAt).toLocaleDateString()}
      </Label>
    </View>
    {!item.read && (
      <View
        style={[
          s.dot,
          { backgroundColor: TYPE_COLORS[item.type] || '#F59E0B' },
        ]}
      />
    )}
  </TouchableOpacity>
);

const NotificationScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const nav = useNavigation();
  const {
    notifications,
    loading,
    pagination,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications({ page: 1 });
  }, []);

  const handleNotificationPress = useCallback(
    async (notification) => {
      if (!notification.read) {
        await markAsRead(notification._id);
      }

      if (notification.type === 'budget_warning' || notification.type === 'budget_exceeded') {
        nav.navigate('TabNavigator', { screen: 'Plan' });
      } else if (notification.type === 'category_warning' || notification.type === 'category_exceeded') {
        nav.navigate('TabNavigator', {
          screen: 'Plan',
          params: {
            screen: 'CategoryDetail',
            params: { category: notification.data?.category },
          },
        });
      }
    },
    [markAsRead, nav],
  );

  const handleLoadMore = useCallback(() => {
    if (pagination?.hasNextPage && !loading) {
      fetchNotifications({ page: pagination.page + 1 });
    }
  }, [pagination, loading, fetchNotifications]);

  const renderItem = useCallback(
    ({ item }) => (
      <NotificationItem
        item={item}
        onPress={() => handleNotificationPress(item)}
        s={styles}
      />
    ),
    [handleNotificationPress, styles],
  );

  const renderFooter = useCallback(() => {
    if (!loading) return null;
    return <PrimaryLoader width={40} height={40} />;
  }, [loading, styles]);

  const hasUnread = notifications.some(n => !n.read);

  return (
    <View style={styles.safe}>
      <ScreenHeader
        title="Notifications"
        onBack={() => navigation.goBack()}
        backIcon="arrow"
        rightElement={
          hasUnread ? (
            <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7}>
              <CheckCheck
                size={wp(5.5)}
                color={theme.primary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          ) : undefined
        }
      />

      {notifications.length === 0 && !loading ? (
        <View style={styles.center}>
          <Bell size={wp(12)} color={theme.textMuted} strokeWidth={1.5} />
          <Label
            type="bodySmall"
            weight="regular"
            color="textMuted"
            style={styles.emptyText}
          >
            No notifications yet
          </Label>
        </View>
      ) : (
        <FlashList
          data={notifications}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          estimatedItemSize={hp(9)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const createStyles = t =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: t.background },
    listContent: { paddingBottom: hp(12) },
    item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: wp(3),
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
      borderBottomWidth: 0.5,
      borderBottomColor: t.outlineVariant,
    },
    itemUnread: { backgroundColor: t.surfaceSecondary },
    iconWrap: {
      width: wp(10),
      height: wp(10),
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContent: { flex: 1, gap: hp(0.3) },
    message: { lineHeight: hp(2) },
    dot: {
      width: wp(2),
      height: wp(2),
      borderRadius: wp(1),
      marginTop: hp(0.8),
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: hp(2),
    },
    emptyText: { textAlign: 'center', paddingHorizontal: wp(10) },
    loadingMore: { paddingVertical: hp(2) },
  });

export default NotificationScreen;
