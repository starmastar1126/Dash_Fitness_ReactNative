import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

import {Edit} from 'dash/src/components/Icons';

export default function Component(props) {
  const {value, onChangeText} = props;
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{value.label}</Text>
      <View style={styles.textInputRow}>
        <TextInput
          style={styles.value}
          value={value.value}
          onChangeText={(text) => onChangeText(value, text)}
        />
        <Edit />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#292E3A',
    paddingVertical: 0,
    paddingHorizontal: 0,
    flex: 1
  },
  label: {
    color: '#96AAC6',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 15,
  },
});

Component.defaultProps = {};
