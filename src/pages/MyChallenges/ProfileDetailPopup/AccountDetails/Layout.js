import React from 'react';
import {View, StyleSheet} from 'react-native';

import Gender from '../../../../components/Gender';
import InformationContainer, {
  Title,
} from '../../../../components/InformationContainer';

const array = [
  {
    label: 'Name',
    value: 'David Lewis',
  },
  {
    label: 'Username',
    value: 'Shealewy',
  },
  {
    label: 'Email',
    value: 'sheabird10@gmail.com',
  },
  {
    label: 'Phone Number',
    value: '+19492138462',
  },
];

export default function Component() {
  return (
    <View style={styles.container}>
      <InformationContainer title={'General Info'} items={array} />
      <Title>Gender</Title>
      <Gender />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 100,
  },
});

Component.defaultProps = {};
