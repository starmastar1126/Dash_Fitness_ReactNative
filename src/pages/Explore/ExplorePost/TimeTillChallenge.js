import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {TimeDots} from '../../../components/Icons';

export default function Component() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time till Challenge!</Text>
      <View style={styles.clockContainer}>
        <Text style={styles.text}>14</Text>
        <TimeDots />
        <Text style={styles.text}>22</Text>
        <TimeDots />
        <Text style={styles.text}>12</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>Days</Text>
        <Text style={styles.time}>Hours</Text>
        <Text style={styles.time}>Mins</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#6F80A7',
    fontFamily: 'Poppins-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  clockContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 40,
    backgroundColor: '#F7F9FB',
    alignItems: 'center',
  },
});

Component.defaultProps = {};
