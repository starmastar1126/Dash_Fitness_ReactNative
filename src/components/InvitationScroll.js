import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const arrayInvitations = [
  {
    avatar: require('dash/src/res/invitations.png'),
    name: 'ralphedwards',
    challenge: 'Chris Bumstead 30 Day Challen...',
  },
  {
    avatar: require('dash/src/res/invitations.png'),
    name: 'ralphedwards',
    challenge: 'Chris Bumstead 30 Day Challen...',
  },
];

export default function Component(props) {
  const {type} = props;
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {arrayInvitations.map((value, index) => (
        <View
          key={index}
          style={[
            styles.invitationItem,
            index === arrayInvitations.length - 1
              ? {
                  marginRight: 15,
                }
              : {},
          ]}>
          <View style={styles.invitationItemHeader}>
            <View style={styles.invitationItemAvatarContainer}>
              <Image
                resizeMode="cover"
                source={value.avatar}
                style={styles.invitationItemAvatar}
              />
            </View>
            <View style={styles.invitationTextContainer}>
              <Text style={styles.invitationName}>
                {value.name}{' '}
                {type !== 'request' && (
                  <Text style={styles.invitedToThe}>Invited you to the</Text>
                )}
              </Text>
              {type === 'request' ? (
                <Text style={[styles.inviteChallenge, {color: '#21293D'}]}>
                  Sent Friend Request
                </Text>
              ) : (
                <Text style={styles.inviteChallenge}>{value.challenge}</Text>
              )}
            </View>
          </View>
          <View style={styles.inviteActionsContainer}>
            <View
              style={[
                styles.inviteAction,
                {
                  borderRightWidth: 1,
                  borderRightColor: '#F0F5FA',
                },
              ]}>
              <Text style={styles.inviteAccept}>Accept</Text>
            </View>
            <View style={styles.inviteAction}>
              <Text style={styles.inviteIgnore}>Ignore</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inviteIgnore: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#96AAC6',
  },
  inviteAccept: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  inviteAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  inviteActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteChallenge: {
    color: '#00A1FF',
    fontFamily: 'Poppins',
  },
  invitedToThe: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
  },
  invitationName: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
  invitationTextContainer: {
    marginLeft: 10,
  },
  invitationItemAvatar: {
    width: 50,
    height: 50,
  },
  invitationItemAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  invitationItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  invitationItem: {
    width: width - 80,
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    marginVertical: 25,
    marginLeft: 15,
  },
});

Component.defaultProps = {
  type: '',
};
