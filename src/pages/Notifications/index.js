import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

import NavBar from 'dash/src/components/NavBar';
import InvitationScroll from 'dash/src/components/InvitationScroll';

import ActionItem from './ActionItem';

const array = [
  {
    name: 'Mitchell Murphy',
    link: '@mitchellmurphy',
    action: 'Commented on your post.',
    avatar: require('dash/src/res/action1.png'),
  },
  {
    name: 'Wendy Wilson',
    link: '@wendywilson',
    action: 'Liked your post.',
    avatar: require('dash/src/res/action2.png'),
  },
];

export default function Component() {
  return (
    <View style={styles.container}>
      <NavBar title={'Notifications'} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={[styles.invitationsHeader, styles.paddingHorizontal]}>
          <Text style={styles.heading}>Invitations</Text>
          <Text style={styles.friendsOnly}>Friends Only</Text>
        </View>
        <InvitationScroll />
        <View style={styles.paddingHorizontal}>
          <Text style={styles.heading}>Community</Text>
          <Text style={styles.actionDay}>Today</Text>
          {array.map((value, index) => (
            <ActionItem key={index} value={value} />
          ))}
          <Text style={styles.actionDay}>Yesterday</Text>
          {array.map((value, index) => (
            <ActionItem key={index} value={value} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 60,
  },
  actionDay: {
    color: '#96AAC6',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginVertical: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  friendsOnly: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#00A1FF',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    color: '#292E3A',
    fontSize: 18,
  },
  invitationsHeader: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    paddingTop: 80,
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
});

Component.defaultProps = {};
