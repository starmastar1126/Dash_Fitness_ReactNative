import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Component() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Challenge Schedule</Text>
        <View
          style={[
            styles.itemDayContainer,
            {
              marginTop: 20,
            },
          ]}>
          <Text style={styles.itemDayText}>Day 1</Text>
        </View>
        <View
          style={[
            styles.itemDayContainer,
            {
              marginTop: -18,
              zIndex: -1,
              opacity: 0.5,
              transform: [{scale: 0.9}],
            },
          ]}>
          <Text style={styles.itemDayText}>Day 2</Text>
        </View>
        <View
          style={[
            styles.itemDayContainer,
            {
              marginTop: -20,
              zIndex: -2,
              opacity: 0.2,
              transform: [{scale: 0.8}],
            },
          ]}>
          <Text style={styles.itemDayText}>Day 3</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bottom}>
        <Text style={styles.preview}>Preview Schedule</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemDayText: {
    fontSize: 18,
    color: '#292E3A',
    fontFamily: 'Poppins-Bold',
  },
  itemDayContainer: {
    borderColor: '#E0EAF3',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  preview: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  bottom: {
    borderTopColor: '#E0EAF3',
    borderTopWidth: 1,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#292E3A',
    textAlign: 'center',
    lineHeight: 38,
  },
  top: {
    paddingHorizontal: 30,
    paddingVertical: 35,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderRadius: 20,
    borderColor: '#E0EAF3',
    borderWidth: 1,
    marginHorizontal: 15,
  },
});

Component.defaultProps = {};
