import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { borderRadius } from '../../constants/globalstyle';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../constants/fonts';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  containerStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    <Search size={wp(4.5)} color={colors.textMuted} strokeWidth={1.8} />
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.4),
    gap: wp(2.5),
  },
  input: {
    flex: 1,
    fontSize: RFValue(13),
    fontFamily: fonts.regular,
    color: colors.textMain,
    padding: 0,
    includeFontPadding: false,
  },
});

export default SearchBar;
