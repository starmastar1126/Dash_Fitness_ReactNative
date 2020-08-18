import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Component(props) {
  const {challenge, onPress} = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress(14)}
        style={[
          styles.container,
          !challenge.duration || challenge.duration !== 14
            ? {backgroundColor: 'white'}
            : {backgroundColor: '#00A1FF'},
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: !challenge.duration
                ? '#1AA0FF'
                : challenge.duration !== 14
                ? '#96AAC6'
                : 'white',
            },
          ]}>
          14 Days
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(30)}
        style={[
          styles.container,
          !challenge.duration || challenge.duration !== 30
            ? {backgroundColor: 'white'}
            : {backgroundColor: '#00A1FF'},
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: !challenge.duration
                ? '#1AA0FF'
                : challenge.duration !== 30
                ? '#96AAC6'
                : 'white',
            },
          ]}>
          30 Days
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#1AA0FF',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  container: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0EAF3',
    borderRadius: 15,
    marginBottom: 20,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Component.defaultProps = {};
