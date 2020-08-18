import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Animated,
  TouchableOpacity,
  
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {Globe, Add, ChevronRight} from 'dash/src/components/Icons/index';
import ViewedBy from 'dash/src/components/Challenge/ViewedBy';
import LightButton from 'dash/src/components/LightButton';

import Header from './Header';
import TimeTillChallenge from './TimeTillChallenge';


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

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);

  
  render() {
    const {challenge, user} = this.props;
   
    return (
      <View style={styles.container}>
        <Header
          ScrollViewAnimation={this.ScrollViewAnimation}
          {...this.props}
        />
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
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
              <Text style={styles.title}>{challenge.title}</Text>
              <View style={styles.hostedByContainer}>
                <View style={styles.globeContainer}>
                  <Globe />
                  <Text style={styles.publicText}>
                    {challenge.accessType === 'public' ? 'Public' : 'private'}
                  </Text>
                </View>
                <Text style={styles.hostedBy}>
                  Hosted by{' '}
                  <Text style={styles.hostedByName}>
                    {user && user.username}
                  </Text>
                </Text>
              </View>
            </View>
            <TimeTillChallenge challenge={challenge} />
            <View style={styles.daysContainer}>
              <Text style={styles.daysText}>0 of 30 Days</Text>
              <LightButton title="Preview Days" padding="25" />
            </View>
            <View style={styles.viewedByContainer}>
              <ViewedBy viewedBy={array} large={true} />
            </View>
            <View style={styles.joinContainer}>
              <Text style={styles.joinTitle}>Invite Friends</Text>
            </View>
            <Text
              style={[
                styles.description,
                {textAlign: 'center', marginHorizontal: 20, marginBottom: 20},
              ]}>
              Invite your friends, to this challenge so they can join in on the
              fun.
            </Text>
            <LightButton
              iconLeft={
                <Add
                  height="10"
                  width="10"
                  stroke={EStyleSheet.value('$lightBlue')}
                />
              }
              title="Invite Friends"
            />
          </View>
          <View style={styles.list}>
            {[{title: 'Challenge Details'}, {title: 'Leave Challenge'}].map(
              (value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItemContainer}>
                    <Text style={styles.itemText}>{value.title}</Text>
                    <ChevronRight />
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 40,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  listItemContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  list: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F5FA',
  },
  daysText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '$lightBlue',
    marginBottom: 5,
  },
  daysContainer: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  hostedByName: {
    color: '$lightBlue',
  },
  hostedBy: {
    color: '#586178',
    marginLeft: 15,
    fontFamily: 'Poppins-Bold',
  },
  hostedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
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
