import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { wp } from '../../constants/responsive';
import FilterTag from './FilterTag';

const FilterTagList = ({ tags = [], activeId, onSelect }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.content}
  >
    {tags.map(tag => (
      <FilterTag
        key={tag.id}
        label={tag.label}
        icon={tag.icon}
        active={activeId === tag.id}
        onPress={() => onSelect(tag.id)}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(5),
    gap: wp(2.5),
  },
});

export default FilterTagList;
