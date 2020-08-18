import React from 'react';
import {View, StyleSheet, Image, Dimensions, Text} from 'react-native';

const {height, width} = Dimensions.get('screen');

export default function Component() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.picture}
        resizeMode="contain"
        source={require('dash/src/res/ChallengeYourFriends.png')}
      />
      <Text style={styles.title}>Challenge</Text>
      <Text style={styles.title}>Your Friends</Text>
      <Text style={styles.subTitle}>
        Create group challenges, share photos,
      </Text>
      <Text style={styles.subTitle}>and keep eachother motivated.</Text>
      <Text style={styles.invite}>Invite</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  picture: {
    width: width / 2,
    height: width / 2,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    lineHeight: 36,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#96AAC6',
    textAlign: 'center',
  },
  invite: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
      color: '#00A1FF',
      marginTop: 20
  }
});

Component.defaultProps = {};
