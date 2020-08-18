import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import FriendItem from 'dash/src/components/FriendItem';
import NavBar from 'dash/src/components/NavBar';
import Search from 'dash/src/components/Search';
import InvitationScroll from 'dash/src/components/InvitationScroll';

import AddFriend from '../MyChallenges/Icons/AddFriend';
import ChevronRight from '../MyChallenges/Icons/ChevronRight';
import ChallengeYourFriends from '../MyChallenges/ChallengeYourFriends';

import {FriendPopupRef} from 'dash/src/pages/CustomTabBar';

const array = [
  {
    first: true,
  },
  {
    picture: require('dash/src/res/friends/friend1.png'),
    name: 'Cameron Mckinney',
    link: '@itsjuanita',
  },
  {
    picture: require('dash/src/res/friends/friend2.png'),
    name: 'Juanita Webb',
    link: 'Juanita Webb',
    noFriend: true,
  },
  {
    picture: require('dash/src/res/friends/friend3.png'),
    name: 'Randall Williamson',
    link: '@randallwilliamson',
  },
  {
    picture: require('dash/src/res/friends/friend4.png'),
    name: 'Regina Mccoy',
    link: '@reginamccoy',
    noFriend: true,
  },
  {
    picture: require('dash/src/res/friends/friend1.png'),
    name: 'Cameron Mckinney',
    link: '@itsjuanita',
  },
  {
    picture: require('dash/src/res/friends/friend2.png'),
    name: 'Juanita Webb',
    link: 'Juanita Webb',
  },
  {
    picture: require('dash/src/res/friends/friend3.png'),
    name: 'Randall Williamson',
    link: '@randallwilliamson',
  },
  {
    picture: require('dash/src/res/friends/friend4.png'),
    name: 'Regina Mccoy',
    link: '@reginamccoy',
  },
];

export default function Component(props) {
  const onPressFriend = (item) => {
    FriendPopupRef.open(item);
  };
  return (
    <View style={styles.containerMain}>
      <NavBar title="Friends" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {array.length === 0 ? (
          <ChallengeYourFriends />
        ) : (
          <View>
            <Search placeholder="Find friends.." />
            <InvitationScroll type="request"/>
            {array.map((value, index) =>
              value.first ? (
                <TouchableOpacity
                  key={index}
                  style={styles.container}
                  onPress={() => Actions.InviteFriendsToDash()}>
                  <View style={styles.startPart}>
                    <View style={styles.pictureContainer}>
                      <AddFriend />
                    </View>
                    <View style={styles.centerContainer}>
                      <Text style={styles.inviteText}>
                        Invite Friends to Dash
                      </Text>
                    </View>
                  </View>
                  <ChevronRight />
                </TouchableOpacity>
              ) : (
                <FriendItem
                  key={index}
                  value={value}
                  onPress={() => onPressFriend(value)}
                />
              ),
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 60,
    paddingTop: 80,
  },
  containerMain: {
    flex: 1,
  },
  inviteText: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  link: {
    fontSize: 14,
    color: '#96AAC6',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  centerContainer: {
    marginHorizontal: 10,
  },
  startPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0EAF3',
  },
  pictureContainer: {
    width: 56,
    height: 56,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Component.defaultProps = {};
