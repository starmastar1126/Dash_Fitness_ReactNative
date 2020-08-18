import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {
  Time,
  Star,
  Instagram,
  Facebook,
  Lifebuoy,
} from '../../../components/Icons';
import ChevronRight from '../Icons/ChevronRight';

const array = [
  {
    icon: <Time />,
    title: 'Account Details',
  },
  {
    icon: <Time />,
    title: 'Past Challenges',
    onPress: () => Actions.PastChallenges(),
  },
  {
    icon: <Time />,
    title: 'Push Notifications',
  },
  {
    icon: <Star />,
    title: 'Remove Ads',
  },
  {
    icon: <Star />,
    title: 'Leave a Review',
  },
  {
    icon: <Instagram />,
    title: 'Follow Us On Instagram',
  },
  {
    icon: <Facebook />,
    title: 'Follow Us On Facebook',
  },
  {
    icon: <Lifebuoy />,
    title: 'Email Support',
  },
];

export default function Component(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={require('dash/src/res/avatarProfile.png')}
          />
        </View>
        <View style={styles.changeAvatarContainer}>
          <Text style={styles.changeAvatar}>Change Profile Picture</Text>
        </View>
        <Text style={styles.name}>Shea Lewis</Text>
        <Text style={styles.link}>@shealewy</Text>
      </View>
      <View style={styles.itemsContainer}>
        {array.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                if (index === 0) {
                  props.openAccountDetails();
                }
                if (value.onPress) {
                  props.closePopup()
                  value.onPress();
                }
              }}>
              <View style={styles.itemStartPart}>
                <View style={styles.iconContainer}>{value.icon}</View>
                <Text style={styles.itemTitle}>{value.title}</Text>
              </View>
              <ChevronRight />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    color: '#292E3A',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
  },
  iconContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#E9F6FF',
    marginRight: 25,
  },
  itemStartPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#F0F5FA',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  itemsContainer: {
    borderTopColor: '#F0F5FA',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  link: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#96AAC6',
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    lineHeight: 38,
    color: '#21293D',
    fontFamily: 'Poppins-Bold',
  },
  changeAvatar: {
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  changeAvatarContainer: {
    backgroundColor: '#E9F6FF',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
  },
  avatar: {
    width: 110,
    height: 110,
  },
});

Component.defaultProps = {};
