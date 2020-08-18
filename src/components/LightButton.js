import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function Component(props) {
  const {title, iconLeft, padding} = props;
  return (
    <View style={[styles.container, {paddingHorizontal: +padding}]}>
      {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconLeft: {
    marginRight: 10,
  },
  text: {
    color: '#1AA0FF',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    lineHeight: 16,
  },
  container: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E9F6FF',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

Component.defaultProps = {
  title: '',
  iconLeft: null,
  padding: 15,
};
