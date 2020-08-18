import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Input from 'dash/src/components/Input';

export default class extends React.Component {
  inputRef;
  focus = () => {
    this.inputRef.focus();
  };
  render() {
    const {challenge, onChangeText} = this.props;
    return (
      <>
        <Input
          currentRef={(e) => (this.inputRef = e)}
          value={challenge.description}
          onChangeText={onChangeText}
          multiline
          placeholder="Description"
          style={styles.input}
          maxLength={300}
          blurOnSubmit={false}
        />
        {/* <Text style={styles.maxContainer}>
          {challenge.description.length}/300 Characters
        </Text> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  maxContainer: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 20,
    color: '#96AAC6',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    height: 80,
    width: '100%',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
});
