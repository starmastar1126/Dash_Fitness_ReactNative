import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import {User, SearchIcon} from 'dash/src/components/Icons';

import AccountDetails from 'dash/src/pages/Profile/AccountDetails';

import FriendPopup from '../MyChallenges/FriendPopup';
import CreateNewChallenge from '../CreateNewChallenge';

import {AuthPopupRef} from '../../index';

import {mediaHost} from '../../config';

import {ScrollViewRef} from '../Profile';

import TopLine from './TopLine';

import CenterButton from './CenterButton';

export let CreateNewChallengeRef;
export let AccountDetailsRef;
export let FriendPopupRef;

function Component(props) {
  const {user} = props;
  const {state} = props.navigation;
  const activeTabIndex = state.index;
  

  const getUserAvatar = () => {
    if (user && user.profileImage && user.profileImage.length > 0) {
      return (
        <View style={styles.avatarContainer}>
          <Image
            resizeMode="cover"
            source={{uri: `${mediaHost}${user.profileImage}`}}
            style={styles.avatar}
          />
        </View>
      );
    }
    return (
      <User
        stroke={activeTabIndex === 0 ? EStyleSheet.value('$lightBlue') : false}
        height={30}
        width={30}
      />
    );
  };
  return (
    <>
      <View style={styles.container}>
        <TopLine />
        <TouchableOpacity
          onPress={() => Actions.ExploreTab()}
          style={[
            styles.item,
            {
              borderTopColor:
                activeTabIndex === 2
                  ? EStyleSheet.value('$lightBlue')
                  : 'white',
            },
          ]}>
          <SearchIcon
            stroke={
              activeTabIndex === 2 ? EStyleSheet.value('$lightBlue') : false
            }
          />
        </TouchableOpacity>
        <CenterButton />
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            console.log(user, user !== null)
            if (user !== null) {
              ScrollViewRef &&
                ScrollViewRef.scrollTo({x: 0, y: 0, animated: true});
              Actions.MyProfile();
            } else {
              console.log(" elese osmsfsmf")
              AuthPopupRef.open();
            }
          }}>
          {getUserAvatar()}
        </TouchableOpacity>
      </View>
      <FriendPopup ref={(e) => (FriendPopupRef = e)} />
      <CreateNewChallenge ref={(e) => (CreateNewChallengeRef = e)} />
      <AccountDetails user={user} ref={(e) => (AccountDetailsRef = e)} />
    </>
  );
}

const styles = EStyleSheet.create({
  avatar: {
    width: 35,
    height: 35,
  },
  avatarContainer: {
    width: 35,
    height: 35,
    borderRadius: 30,
    overflow: 'hidden',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 2,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 64,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  item: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Component.defaultProps = {};

export default connect(({user}) => ({
  user,
}))(Component);
