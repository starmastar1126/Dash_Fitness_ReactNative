import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import NavBar from '../../components/NavBar';
import Challenge from '../../components/Challenge';

const array = [
  {
    picture: require('dash/src/res/challenge1.png'),
    newPosts: '2',
    title: 'Chris Bumstead 30 Day Challenge',
    completed: '30',
    all: '30',
    date: 'Ended Jan 02',
  },
  {
    picture: require('dash/src/res/challenge1.png'),
    newPosts: '2',
    title: 'Chris Bumstead 30 Day Challenge',
    completed: '24',
    all: '30',
    date: 'Ended Jan 02',
  },
];

export default function Component() {
  return (
    <View style={styles.container}>
      <NavBar title="Past Challenges" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {array.map((value, index) => (
          <Challenge key={index} value={value} past={true} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 100,
  },
});

Component.defaultProps = {};
