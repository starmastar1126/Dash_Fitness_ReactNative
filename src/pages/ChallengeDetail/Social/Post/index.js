import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import * as UserActions from 'dash/src/actions/user';
import {HorizontalDots} from 'dash/src/components/Icons';
import {mediaHost} from 'dash/src/config';

import CommentsContainer from './CommentsContainer';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

function Component(props) {
  const {postId, onPressMenu} = props;
  const value = props.posts.find((v) => v._id === postId);
  const [allComments, setAllComments] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const init = async () => {
      const user = await UserActions.getUserById(value.createdBy);
      setUser(user);
    };
    init();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.top}>
          <View style={styles.avatarContainer}>
            <Image
              source={{uri: `${mediaHost}${user.profileImage}`}}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <View style={styles.topCenter}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{user.username}</Text>
              {value.host && (
                <View style={styles.hostContainer}>
                  <Text style={styles.host}>Host</Text>
                </View>
              )}
            </View>
            <Text style={styles.date}>{timeAgo.format(new Date(value.creationDate))}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuIcon} onPress={onPressMenu}>
          <HorizontalDots />
        </TouchableOpacity>
      </View>
      <CommentsContainer
        user={user}
        showAllButton={true}
        value={value}
        allComments={allComments}
        onPressShowAll={() => setAllComments(true)}
      />
    </View>
  );
}
export default connect(({posts}) => ({
  posts,
}))(Component);

const styles = EStyleSheet.create({
  postText: {
    color: '#292E3A',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  menuIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
    padding: 20,
  },
  topCenter: {
    flex: 1,
    marginLeft: 20,
  },
  date: {
    marginTop: -5,
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
    width: 35,
    height: 35,
    borderRadius: 18,
    overflow: 'hidden',
  },
  top: {
    flexDirection: 'row',
  },
  main: {
    padding: 20,
  },
  container: {
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F0F5FA',
    marginBottom: 20,
    overflow: 'hidden',
  },
});

Component.defaultProps = {};
