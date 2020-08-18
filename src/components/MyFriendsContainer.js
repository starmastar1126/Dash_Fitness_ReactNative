import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import ViewedBy from 'dash/src/components/Challenge/ViewedBy';
import LightButton from 'dash/src/components/LightButton';

import {Add} from 'dash/src/components/Icons';
import {Actions} from 'react-native-router-flux';

const array = [
  {
    picture: require('dash/src/res/viewedBy/1.jpg'),
  },
  {
    picture: require('dash/src/res/viewedBy/2.jpg'),
  },
  {
    picture: require('dash/src/res/viewedBy/3.png'),
  },
  {
    picture: require('dash/src/res/viewedBy/4.png'),
  },
  {},
  {},
  {},
  {},
  {},
  {},
];

export default function Component() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>My friends</Text>
        <TouchableOpacity onPress={() => Actions.Friends()}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <ViewedBy viewedBy={array} />
        <LightButton
          title="Add New"
          iconLeft={<Add stroke="#1AA0FF" height="10" width="10" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  viewAll: {
    color: '#96AAC6',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  title: {
    color: '#292E3A',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  top: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F5FA',
  },
});

Component.defaultProps = {};
