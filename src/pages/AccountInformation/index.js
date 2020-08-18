import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import NavBar from 'dash/src/components/NavBar';
import InformationContainer, {
  Title,
} from 'dash/src/components/InformationContainer';
import Gender from 'dash/src/components/Gender';
import {Upload} from 'dash/src/components/Icons';

const array = [
  {
    label: 'Name',
    value: 'David Lewis',
  },
  {
    label: 'Username',
    value: 'Shealewy',
  },
];

export default function Component() {
  return (
    <View style={styles.container}>
      <NavBar title="Account Information" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Title>Profile Picture</Title>
        <View style={styles.uploadContainer}>
          <View style={styles.avatarContainer}>
            <Image
              resizeMode="contain"
              source={require('dash/src/res/avatarProfile.png')}
              style={styles.avatar}
            />
          </View>
          <Upload />
          <Text style={styles.uploadText}>Upload Profile Picture</Text>
        </View>
        <Title>Gender</Title>
        <Gender />
        <InformationContainer title="Details" items={array} />
        <TouchableOpacity style={styles.confirmContainer}>
          <Text style={styles.confirmText}>Confirm Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  confirmText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  confirmContainer: {
    borderRadius: 10,
    backgroundColor: '#00A1FF',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#292E3A',
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 25,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#F0F5FA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingTop: 100,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
});

Component.defaultProps = {};
