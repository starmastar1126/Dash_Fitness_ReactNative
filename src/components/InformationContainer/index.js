import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

import Title from './Title';
import Item from './Item';

export default function Component(props) {
  const {title, items, onChangeText} = props;
  return (
    <>
      <Title>{title}</Title>
      {items.map((value, index) => (
        <Item key={index} value={value} onChangeText={onChangeText} />
      ))}
    </>
  );
}

export {Title};

const styles = StyleSheet.create({});

Component.defaultProps = {};
