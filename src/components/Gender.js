import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {Check} from './Icons';

const genderArray = [
  {
    value: 'Male',
  },
  {
    value: 'Female',
  },
  {
    value: 'Other',
  },
];

export default function Component(props) {
  const {onChange, value} = props;
  const onPressGender = (value) => {
    onChange(value);
  };
  return (
    <View style={styles.genderRow}>
      {genderArray.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPressGender(item.value)}
          style={[
            styles.genderItem,
            value === item.value
              ? {
                  backgroundColor: '#1AA0FF',
                  borderColor: '#1AA0FF',
                }
              : {},
          ]}>
          <Text
            style={[
              styles.genderItemText,
              value === item.value
                ? {
                    color: 'white',
                    marginRight: 10,
                  }
                : {},
            ]}>
            {item.value}
          </Text>
          {value === item.value && <Check />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  genderItemText: {
    color: '#96AAC6',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Bold',
  },
  genderItem: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F5FA',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
});

Component.defaultProps = {
  onChange: () => {},
};
