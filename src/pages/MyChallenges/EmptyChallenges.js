import React from 'react';
import {Actions} from 'react-native-router-flux';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import {CreateNewChallengeRef} from 'dash/src/pages/CustomTabBar';

const array = [
  {
    onPress: () => {
      CreateNewChallengeRef.openCreateNew();
    },
    title: 'Create Challenge',
    subTitle:
      'Start your own fitness challenge. Use our programs and invite your friends to some healthy competition.',
    button: '+ Create Challenge',
  },
  {
    onPress: () => {
      Actions.ExploreTab();
    },
    title: 'Explore Challenges',
    subTitle:
      'Browse Dash public fitness challenges or featured collaborations. Join a community and get better together!',
    button: 'Explore Challenges',
  },
];

export default function Component(props) {
  const authorized = props.authorized;
  return array.map((value, index) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => {
          if (value.onPress) {
            value.onPress();
          }
        }}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInnerContainer}>
            <Text style={styles.title}>{value.title}</Text>
            <Text style={styles.subTitle}>{value.subTitle}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.button}>{value.button}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  });
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  itemInnerContainer: {
    paddingVertical: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#96AAC6',
    marginHorizontal: 30,
    textAlign: 'center',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F5FA',
  },
  button: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
});

Component.defaultProps = {};
