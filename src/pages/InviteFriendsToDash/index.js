import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

import NavBar from 'dash/src/components/NavBar';
import {
  ChevronRight,
  Message,
  WhatsApp,
  Instagram,
  Facebook,
  Link,
} from 'dash/src/components/Icons';

const array = [
  {
    icon: <Message />,
    title: 'Messages',
  },
  {
    icon: <WhatsApp />,
    title: 'WhatsApp',
  },
  {
    icon: <Instagram  fill="#21293D" />,
    title: 'Instagram',
  },
  {
    icon: <Facebook fill="#21293D" />,
    title: 'Facebook',
  },
  {
    icon: <Link />,
    title: 'Copy Link',
  },
];

export default function Component() {
  return (
    <View style={styles.container}>
      <NavBar title="Invite Friends To Dash" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {array.map((value, index) => (
          <TouchableOpacity key={index} style={styles.itemContainer}>
            <View style={styles.startPart}>
              <View style={styles.pictureContainer}>{value.icon}</View>
              <View style={styles.centerContainer}>
                <Text style={styles.inviteText}>{value.title}</Text>
              </View>
            </View>
            <ChevronRight />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  itemContainer: {
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
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingTop: 80,
  },
  container: {
    flex: 1,
  },
});

Component.defaultProps = {};
