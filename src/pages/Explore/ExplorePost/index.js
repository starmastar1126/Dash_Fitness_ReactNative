import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {Globe} from 'dash/src/components/Icons/index';
import ViewedBy from 'dash/src/components/Challenge/ViewedBy';
import ChallengeTypeContainer from 'dash/src/components/ChallengeTypeContainer';
import AuthPopup from 'dash/src/components/AuthPopup';

import Header from './Header';
import TimeTillChallenge from './TimeTillChallenge';
import ChallengeSchedule from './ChallengeSchedule';

const {height} = Dimensions.get('window');

const array = [
  {
    picture: require('dash/src/res/viewedBy/4.png'),
  },
  {
    picture: require('dash/src/res/viewedBy/3.png'),
  },
  {
    picture: require('dash/src/res/viewedBy/1.jpg'),
  },
  {
    picture: require('dash/src/res/viewedBy/2.jpg'),
  },
  {},
  {},
  {},
  {},
];

const item = {
  picture: require('dash/src/res/StrengthTraining.png'),
  backgroundColor: '#F8E0BC',
  name: 'Strength Training',
  description:
    'Guided strength training circuit workouts. No equipment needed.',
};

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);
  render() {
    return (
      <View style={styles.container}>
        <Header ScrollViewAnimation={this.ScrollViewAnimation} />
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this.ScrollViewAnimation}},
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.innerContainer,
              {
                marginTop: height / 2 - 20,
              },
            ]}>
            <View style={[styles.paddingHorizontal, {paddingTop: 10}]}>
              <Text style={styles.title}>Liza Koshy 30 Day Challenge</Text>
              <View style={styles.globeContainer}>
                <Globe />
                <Text style={styles.publicText}>Public</Text>
              </View>
              <Text style={styles.description}>
                Shea Lewis, Producer: Life After X. Shea Lewis is an actor and
                producer, known for Life After X and Wet Hot American Summer:
                Ten Years Later (2017).
              </Text>
              <Text style={styles.secondTitle}>Challenge Type</Text>
              <ChallengeTypeContainer item={item} />
            </View>
            <TimeTillChallenge />
            <View style={styles.viewedByContainer}>
              <ViewedBy viewedBy={array} large={true} />
            </View>
            <View style={styles.joinContainer}>
              <Text style={styles.joinTitle}>Join the 30-day</Text>
              <Text style={styles.joinTitle}>challenge!</Text>
            </View>
            <Text
              style={[
                styles.description,
                {textAlign: 'center', marginHorizontal: 20},
              ]}>
              25 People have already decided to keep the challenge going with a
              round 2. Would you like to extend this challenge for another 30
              days?
            </Text>
            <ChallengeSchedule />
            <TouchableOpacity
              style={styles.joinChallengeContainer}
              onPress={() => {
                this.AuthPopupRef.open();
              }}>
              <Text style={styles.joinChallengeText}>Join Challenge</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AuthPopup ref={(e) => (this.AuthPopupRef = e)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  joinChallengeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  joinChallengeContainer: {
    marginTop: 50,
    backgroundColor: '#00A1FF',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  joinTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#292E3A',
    textAlign: 'center',
    lineHeight: 38,
  },
  viewedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  secondTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#292E3A',
    marginBottom: 15,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: '#586178',
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
  },
  publicText: {
    fontSize: 12,
    color: '#1AA0FF',
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    letterSpacing: 0.9,
    lineHeight: 13,
    marginTop: 4,
  },
  globeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F6FF',
    borderRadius: 24,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  title: {
    color: '#21293D',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingTop: 20,
  },
});
