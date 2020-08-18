import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function Component(props) {
  return <Text style={styles.containerName}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  containerName: {
    fontSize: 16,
    color: '#292E3A',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
});

Component.defaultProps = {};
