import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import FriendItem from '../../components/FriendItem';
import NavBar from '../../components/NavBar';

const friend = {
  picture: require('dash/src/res/friends/friend1.png'),
  name: 'Cameron Mckinney',
  link: '@itsjuanita',
};

const array = [
  {
    title: 'Chris Bumstead 30 Day Challenge',
    picture: require('dash/src/res/inviteChallenge1.png'),
  },
  {
    title: 'David Dobrik Vlog Squad Fitness Challenge',
    picture: require('dash/src/res/inviteChallenge2.png'),
  },
];

export default function Component() {
  return (
    <View style={styles.container}>
      <NavBar title="Invite To Challenge" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <FriendItem
          value={friend}
          containerStyle={styles.friendContainerStyle}
          dissablePress={true}
          rightComponent={
            <TouchableOpacity style={styles.inviteAllContainer}>
              <Text style={styles.inviteAllText}>Invite All</Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.itemsContainer}>
          {array.map((value, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemTop}>
                <View style={styles.pictureContainer}>
                  <Image
                    style={styles.picture}
                    source={value.picture}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.itemTitle}>{value.title}</Text>
              </View>
              <View style={styles.inviteContainer}>
                <Text style={styles.invite}>Invite</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  invite: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  inviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F5FA',
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 10,
  },
  picture: {
    width: 55,
    height: 55,
  },
  pictureContainer: {
    width: 55,
    height: 55,
    borderRadius: 10,
    overflow: 'hidden',
  },
  item: {
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    paddingTop: 15,
    marginBottom: 15,
  },
  itemsContainer: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 80,
  },
  friendContainerStyle: {
    marginHorizontal: 0,
    paddingHorizontal: 15,
  },
  inviteAllContainer: {
    backgroundColor: '#F7F9FB',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inviteAllText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
});

Component.defaultProps = {};
