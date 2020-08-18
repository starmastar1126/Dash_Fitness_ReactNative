import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';

import Challenge from '../../components/Challenge';
import Search from '../../components/Search';
import NavBar from '../../components/NavBar';
import {Actions} from 'react-native-router-flux';

const viewedBy = [
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
]

const array = [
  {
    picture: require('dash/src/res/explore/1.png'),
    title: 'Chris Bumstead 30 Day Challenge',
    startsIn: 'Starts in 3 Days',
    viewedBy: [
      {
        picture: require('dash/src/res/viewedBy/1.jpg'),
      },
      {
        picture: require('dash/src/res/viewedBy/2.jpg'),
      },
      {
        picture: require('dash/src/res/viewedBy/3.png'),
      },
      {
        picture: require('dash/src/res/viewedBy/4.png'),
      },
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  },
  {
    picture: require('dash/src/res/explore/2.png'),
    title: 'David Dobrik 30 Day Challenge',
    startsIn: 'Starts in 3 Days',
    viewedBy: [
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
    ],
  },
];

function Component(props) {
 

  const challenges = props.challenges.filter(
    (v) => v.Featured === "yes",
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}  bounces={false}>
        <Text style={styles.title}>Explore</Text>
        <Search placeholder="Search Challenges" />
        <View style={styles.challengesContainer}>
          {challenges.map((value, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => Actions.ChallengeDetail({challenge: value})}
              // onPress={() => Actions.ExplorePost()}
              >
              <View>
                <Challenge value={value} viewedBy={viewedBy}/>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  challengesContainer: {
    marginTop: 30,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#21293D',
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 100,
  },
});
export default connect(({challenges}) => ({
  challenges,
}))(Component);
