import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {Bell, User} from 'dash/src/components/Icons';

import * as userActions from 'dash/src/actions/user';

import {mediaHost} from 'dash/src/config';

function Component(props) {
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const {ScrollViewAnimation, user} = props;
  const translateY = ScrollViewAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -280],
    extrapolate: 'clamp',
  });
  const opacity = ScrollViewAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    user && (
      <Animated.View
        style={[
          {
            transform: [{translateY}],
            opacity,
          },
          styles.container,
        ]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => {
              Actions.CameraRoll({
                navBarTitle: 'Select New Profile Picture',
                onePhoto: true,
                callbackCamera: async (item) => {
                  try {
                    setLoadingAvatar(true);
                    await userActions.editUserPicture(user, item.node.image);
                    setLoadingAvatar(false);
                  } catch (e) {
                    setLoadingAvatar(false);
                  }
                },
              });
            }}>
            {user.profileImage && user.profileImage.length > 0 ? (
              <Image
                style={styles.avatar}
                resizeMode="cover"
                source={{uri: `${mediaHost}${user.profileImage}`}}
              />
            ) : (
              <User height={80} width={80} />
            )}
            {loadingAvatar ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00A1FF" />
              </View>
            ) : null}
          </TouchableOpacity>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.link}>@{user.username.replace(/\s/g, '')}</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => Actions.Notifications()}>
          <View style={styles.notifCountContainer}>
            <Text style={styles.countNotif}>2</Text>
          </View>
          <Bell color={'#292E3A'} width={20} height={20} />
        </TouchableOpacity>
      </Animated.View>
    )
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  countNotif: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  notifCountContainer: {
    position: 'absolute',
    top: -3,
    right: -3,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#FF2272',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  link: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    lineHeight: 38,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  header: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 280,
    justifyContent: 'flex-end',
  },
});

Component.defaultProps = {};

export default connect(({user}) => ({
  user,
}))(Component);
