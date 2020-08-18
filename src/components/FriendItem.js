import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import Dots from '../pages/MyChallenges/Icons/Dots';
import ChevronRight from '../pages/MyChallenges/Icons/ChevronRight';

export default function Component(props) {
  const {value} = props;
  const Touch = props.dissablePress ? View : TouchableOpacity;
  return (
    <Touch
      style={[
        styles.container,
        props.containerStyle,
        props.underline
          ? {
              borderBottomWidth: 1,
              borderBottomColor: '#E0EAF3',
            }
          : {},
      ]}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        } else {
          if (value.onPress) {
            value.onPress();
          }
        }
      }}>
      <View style={styles.startPart}>
        {props.enablePicture && (
          <View style={styles.pictureContainer}>
            <Image
              resizeMode="contain"
              source={value.picture}
              style={styles.avatar}
            />
          </View>
        )}
        <View style={styles.centerContainer}>
          <Text style={styles.name}>{value.name}</Text>
          <Text style={styles.link}>{value.link}</Text>
        </View>
      </View>
      {props.rightComponent ? (
        props.rightComponent
      ) : (
        <>
          {props.dots && <Dots />}
          {props.arrow && <ChevronRight />}
        </>
      )}
    </Touch>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  pictureContainer: {
    width: 56,
    height: 56,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
  },
});

Component.defaultProps = {
  dots: true,
  underline: true,
  arrow: false,
  enablePicture: true,
  containerStyle: {},
  rightComponent: false,
  dissablePress: false,
};
