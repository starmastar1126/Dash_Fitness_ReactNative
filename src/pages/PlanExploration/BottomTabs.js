import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import WorkoutsIcon from './WorkoutsIcon';
import UserIcon from './UserIcon';
import Lightning from './Lightning';

export default class extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tab}>
          <WorkoutsIcon />
          <Text style={styles.tabText}>Workouts</Text>
        </View>
        <View style={styles.lightningContainer}>
          <Lightning />
        </View>
        <View style={styles.tab}>
          <UserIcon />
          <Text style={styles.tabText}>Profile</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'white',
    zIndex: 10
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#96AAC6',
    marginTop: 10,
  },
  lightningContainer: {
      padding: 15,
      borderRadius: 50,
      backgroundColor: '#00A1FF',
      height: 64,
      width: 64
  }
});
