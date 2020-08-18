import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

export default function Component(props) {
  const {viewedBy, large} = props;
  return (
    <View style={styles.viewedByContainer}>
      {viewedBy.slice(0, 4).map((value, index) => (
        <View
          key={index}
          style={[
            styles.viewdPictureContainer,
            large
              ? {width: 50, height: 50, borderRadius: 25, marginLeft: -20}
              : {},
          ]}>
          <Image
            style={[styles.viewedPicture, large ? {width: 50, height: 50} : {}]}
            resizeMode="cover"
            source={value.picture}
          />
        </View>
      ))}
      <View
        style={[
          styles.viewdPictureContainer,
          large ? {width: 50, height: 50, borderRadius: 25} : {},
        ]}>
        <Text style={styles.moreViewed}>{`+ ${
          viewedBy.slice(4, viewedBy.length).length
        }`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moreViewed: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#292E3A',
  },
  viewedPicture: {
    width: 32,
    height: 32,
  },
  viewdPictureContainer: {
    backgroundColor: '#f0f5fa',
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: -15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

Component.defaultProps = {};
