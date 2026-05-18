import React, { useState } from 'react';
import { View, ScrollView, Switch, StyleSheet } from 'react-native';
import {
  Moon,
  CircleDollarSign,
  Bell,
  Upload,
  CloudCog,
} from 'lucide-react-native';
import HomeHeader from '../../../components/home/HomeHeader';
import SettingsProfileCard from '../../../components/settings/SettingsProfileCard';
import SettingsSection from '../../../components/settings/SettingsSection';
import SettingsRow from '../../../components/settings/SettingsRow';
import { Label, borderRadius } from '../../../constants/globalstyle';
import colors from '../../../constants/colors';
import { hp, wp } from '../../../constants/responsive';
import SignOutButton from '../../../components/settings/SignOutButton';

const IconBox = ({ bg, children }) => (
  <View style={[styles.iconBox, { backgroundColor: bg }]}>{children}</View>
);

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.safe}>
      <HomeHeader onBellPress={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SettingsProfileCard
          name="Ali Wicked Digital"
          email="ali-wicked@gmail.com"
          isPremium
          onEditPress={() => {}}
        />

        <SettingsSection title="PREFERENCES">
          <SettingsRow
            icon={
              <IconBox bg="#EFF6FF">
                <Moon
                  size={wp(4.5)}
                  color={colors.bankAccount}
                  strokeWidth={1.8}
                />
              </IconBox>
            }
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
            icon={
              <IconBox bg="#E6FFF5">
                <CircleDollarSign
                  size={wp(4.5)}
                  color={colors.primary}
                  strokeWidth={1.8}
                />
              </IconBox>
            }
            title="Default Currency"
            subtitle="Set your primary currency"
            rightLabel="USD ($)"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsSection>

        <SettingsSection title="SYSTEM & DATA">
          <SettingsRow
            icon={
              <IconBox bg="#EFF6FF">
                <Bell
                  size={wp(4.5)}
                  color={colors.bankAccount}
                  strokeWidth={1.8}
                />
              </IconBox>
            }
            title="Notifications"
            onPress={() => {}}
            showDivider
          />
          <SettingsRow
            icon={
              <IconBox bg="#FFF3E6">
                <Upload size={wp(4.5)} color="#F97316" strokeWidth={1.8} />
              </IconBox>
            }
            title="Export Transactions"
            onPress={() => {}}
            showDivider
          />
          <SettingsRow
            icon={
              <IconBox bg="#F5F3FF">
                <CloudCog
                  size={wp(4.5)}
                  color={colors.savings}
                  strokeWidth={1.8}
                />
              </IconBox>
            }
            title="Cloud Backup"
            subtitle="Last synced 2h ago"
            onPress={() => {}}
            showDivider={false}
          />
        </SettingsSection>

        <SignOutButton onPress={() => {}} />

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
  iconBox: {
    width: wp(9),
    height: wp(9),
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  version: {
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default SettingsScreen;
