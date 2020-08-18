import React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';

import SearchTextInput from './Icons/SearchTextInput';

export default function Component(props) {
  return (
    <View style={styles.container}>
      <SearchTextInput />
      <TextInput style={[styles.textInput, Platform.OS === 'ios' ? {paddingVertical: 10} :{}]} 
      placeholder={props.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0EAF3',
    backgroundColor: 'white',
  },
  textInput: {
    width: '100%',
    marginLeft: 10,
  },
});

Component.defaultProps = {};
