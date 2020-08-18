import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchIcon from './Icons/SearchIcon';
import UserIcon from './Icons/UserIcon';

export default function Component(props) {
  const authorized = props.authorized;
 
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.item,
          {
            borderTopColor: 'white',
          },
        ]}>
        <SearchIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addContainer}>
        <Icon name={'plus'} color="white" size={25} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        {authorized ? (
          <View style={styles.avatarContainer}>
            <Image
              resizeMode="contain"
              source={require('dash/src/res/avatarProfile.png')}
              style={styles.avatar}
            />
          </View>
        ) : (
          <UserIcon height={35} width={35} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  addContainer: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    backgroundColor: '#1AA0FF',
    borderRadius: 50,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  item: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#1AA0FF',
  },
});

Component.defaultProps = {};
