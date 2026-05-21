import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Switch, StyleSheet } from 'react-native';
import HomeHeader from '../../../components/home/HomeHeader';
import SettingsProfileCard from '../../../components/settings/SettingsProfileCard';
import SettingsSection from '../../../components/settings/SettingsSection';
import SettingsRow from '../../../components/settings/SettingsRow';
import { Label, borderRadius } from '../../../constants/globalstyle';
import colors from '../../../constants/colors';
import { hp, wp } from '../../../constants/responsive';
import SignOutButton from '../../../components/settings/SignOutButton';
import { supabase } from '../../../services/supabase';
import { useToastService } from '../../../utils/ToastService';

const SettingsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const toast = useToastService();
  const toastRef = useRef(toast);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const displayName =
    user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'User';
  const email = user?.email ?? '';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.safe}>
      <HomeHeader onBellPress={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SettingsProfileCard
          name={displayName}
          email={email}
          isPremium={false}
          avatarSource={null}
        />

        <SettingsSection title="PREFERENCES">
          <SettingsRow
            iconName="moon"
            title="Dark Mode"
            subtitle="Adjust system appearance"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{
                  false: colors.outlineVariant,
                  true: colors.primaryContainer,
                }}
                thumbColor={colors.surfacePrimary}
              />
            }
            onPress={() => setDarkMode(p => !p)}
            showDivider
          />
          <SettingsRow
            iconName="currency"
            title="Default Currency"
            subtitle="Set your primary currency"
            rightLabel="USD ($)"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsSection>

        <SettingsSection title="SYSTEM & DATA">
          <SettingsRow
            iconName="bell"
            title="Notifications"
            onPress={() => {}}
            showDivider
          />
          <SettingsRow
            iconName="upload"
            title="Export Transactions"
            onPress={() => {}}
            showDivider
          />
          <SettingsRow
            iconName="cloud"
            title="Cloud Backup"
            subtitle="Last synced 2h ago"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsSection>

        <SignOutButton onPress={handleSignOut} />

        <Label
          type="bodyXs"
          weight="regular"
          color="textMuted"
          style={styles.version}
        >
          Expenzo v1.0.01 (2026)
        </Label>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: hp(12),
  },
  version: {
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default SettingsScreen;
