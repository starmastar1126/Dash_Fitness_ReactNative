import React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';

export default function Component(props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? {paddingVertical: 10} : {},
        ]}
        placeholder={props.placeholder}
        ref={props.currentRef || null}
        {...props}
      />
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
  },
});

Component.defaultProps = {};
