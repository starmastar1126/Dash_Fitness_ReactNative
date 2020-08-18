import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import {HorizontalDots, BackArrow} from 'dash/src/components/Icons';
import {mediaHost} from 'dash/src/config';

import WriteSomething from '../WriteSomething';

import CommentsContainer from '../Post/CommentsContainer';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class Component extends React.Component {
  ScrollViewRef;
  render() {
    const {user, postId, posts} = this.props;
    const value = posts.find((v) => v._id === postId);
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.back} onPress={() => Actions.pop()}>
            <BackArrow />
          </TouchableOpacity>
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
            </View>
            <Text style={styles.date}>
              {timeAgo.format(new Date(value.creationDate))}
            </Text>
          </View>
          <View style={styles.menuIcon}>
            <HorizontalDots />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          ref={(e) => (this.ScrollViewRef = e)}>
          <CommentsContainer
            user={user}
            value={value}
            allComments={true}
            showAllButton={false}
            blockComment={true}
          />
        </ScrollView>
        <View style={styles.writeSomething}>
          <WriteSomething
            commit={true}
            value={value}
            scrollToEnd={() => {
              this.ScrollViewRef.scrollToEnd({animated: true});
            }}
          />
        </View>
      </View>
    );
  }
}

export default connect(({posts}) => ({
  posts,
}))(Component);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 80,
    paddingBottom: 80,
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  menuIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 15,
    paddingVertical: 30,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
    backgroundColor: 'white',
    zIndex: 10,
  },
  writeSomething: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F5FA',
  },
  container: {
    flex: 1,
  },
});

Component.defaultProps = {};
