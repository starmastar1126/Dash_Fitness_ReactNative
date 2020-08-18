import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

import {mediaHost} from 'dash/src/config';

function Component(props) {
  const {value, user} = props;
  return (
    <View style={styles.top}>
      <View style={styles.avatarContainer}>
        <Image
          source={{uri: `${mediaHost}${value.commitUserAvata}`}}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <View style={styles.topCenter}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{value.commitUsername}</Text>
          {user._id === value.commitUserId && (
            <View style={styles.hostContainer}>
              <Text style={styles.host}>Host</Text>
            </View>
          )}
        </View>
        {value.commitDetails.length !== 0 && (
          <Text style={styles.comment}>{value.commitDetails}</Text>
        )}

        {value.commitPicture && (
          <Image
            source={{uri: `${mediaHost}${value.commitPicture}`}}
            style={styles.picture}
            resizeMode="cover"
          />
        )}
        <Text style={styles.date}>
          {timeAgo.format(new Date(value.creatorDate))}
        </Text>
      </View>
    </View>
  );
}
export default connect(({user}) => ({
  user,
}))(Component);

const styles = StyleSheet.create({
  picture: {
    marginTop: 5,
    width: '100%',
    borderRadius: 10,
    height: 200,
  },
  comment: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#292E3A',
  },
  topCenter: {
    flex: 1,
    marginLeft: 20,
  },
  date: {
    marginTop: 5,
    color: '#96AAC6',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    color: '#21293D',
    lineHeight: 24,
    fontSize: 14,
    marginRight: 10,
  },
  host: {
    fontFamily: 'Poppins-Medium',
    color: '#96AAC6',
    lineHeight: 15,
    fontSize: 12,
  },
  hostContainer: {
    backgroundColor: '#F7F9FB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  usernameContainer: {
    marginTop: -2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {width: 35, height: 35},
  avatarContainer: {
    marginTop: 2,
    width: 35,
    height: 35,
    borderRadius: 18,
    overflow: 'hidden',
  },
  top: {
    flexDirection: 'row',
    paddingTop: 15,
  },
});

Component.defaultProps = {};
