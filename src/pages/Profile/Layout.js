import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {
  Logout,
  Instagram,
  Facebook,
  Lifebuoy,
  ChevronRight,
  AccountDetails,
  RemoveAds,
  PushNotifications,
  LeaveAReview,
  EmailSupport,
} from 'dash/src/components/Icons';
import MyFriendsContainer from 'dash/src/components/MyFriendsContainer';

import * as UserActions from 'dash/src/actions/user';

const array = [
  {
    icon: <AccountDetails />,
    title: 'Account Details',
  },
  {
    icon: <PushNotifications />,
    title: 'Push Notifications',
  },
  {
    icon: <RemoveAds />,
    title: 'Remove Ads',
  },
  {
    icon: <LeaveAReview />,
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
    icon: <EmailSupport />,
    title: 'Email Support',
  },
  {
    icon: <Logout />,
    title: 'Logout',
    onPress: () => {
      UserActions.logout();
    },
  },
];

export default function Component(props) {
  return (
    <View style={styles.container}>
      <MyFriendsContainer />
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
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },

  container: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

Component.defaultProps = {};
