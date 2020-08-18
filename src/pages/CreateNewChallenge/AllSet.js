import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import AppleGoogleSignInButtons from 'dash/src/components/AppleGoogleSignInButtons';
import {Actions} from 'react-native-router-flux';

const {height, width} = Dimensions.get('screen');

export default function Component(props) {
  const {
    challenge,
    closeCreateNew,
    createChallenge,
    user,
    loading,
    createdChallenge,
  } = props;
  useEffect(() => {
    // console.log('user:', user);
    // console.log('createdChallenge:', createdChallenge);
    // console.log('createdChallenge:', createdChallenge);
    // console.log('challenge:', challenge);
  }, []);
  const callback = () => {
    createChallenge();
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {challenge.graphic && (
          <Image
            // source={
            //   challenge.graphic.default
            //     ? challenge.graphic.uri
            //     : {uri: challenge.graphic.uri}
            // }
            source={{uri: challenge.graphic.uri}}
            resizeMode="cover"
            style={styles.picture}
            PlaceholderContent={<ActivityIndicator />}
          />
        )}
      </View>
      <Text style={styles.title}>{user && user.displayname? user.displayname:''} 30 Day Workout</Text>
      <Text style={styles.title}>Challenge</Text>
      {!user && (
        <>
          <Text style={styles.subTitle}>
            Program is all Set, Now just need to create an account to Save it.
          </Text>
          <AppleGoogleSignInButtons callbackButton={callback} />
        </>
      )}
      {user &&
        (loading ? (
          <View style={{marginTop: 30}}>
            <ActivityIndicator size="large" color="#1AA0FF" />
          </View>
        ) : (
          <>
            <Text style={styles.subTitle}>
              Your challenge is all set! Just need{'\n'}to create an account to
              save it.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                closeCreateNew({
                  call: () => {
                    if (createdChallenge) {
                      Actions.ChallengeDetail({challenge: createdChallenge});
                    }
                  },
                });
              }}>
              <Text style={styles.closeText}>View Challenge</Text>
            </TouchableOpacity>
          </>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  closeText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    lineHeight: 30,
  },
  closeButton: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 35,
    overflow: 'hidden',
    marginTop: 15,
    backgroundColor: '#1AA0FF',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#6F80A7',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 25,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  picture: {
    width: width / 2 - (15 + 7.5),
    height: width / 2 - (15 + 7.5),
  },
  item: {
    margin: 7.5,
    width: width / 2 - (15 + 7.5),
    height: width / 2 - (15 + 7.5),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
});

Component.defaultProps = {};
