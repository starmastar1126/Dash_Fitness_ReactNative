import React from 'react';
import {View, StyleSheet, Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux'

import DotsIcon from './DotsIcon';

const {width} = Dimensions.get('window');

export default class extends React.Component {
  render() {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Next Workout</Text>
        <Text style={styles.cardSubTitle}>Body & Mind</Text>
        <Text style={styles.cardSubTitle}>Unwind</Text>
        <View style={styles.buttonsRow}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>30 Min</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Intesity</Text>
            <DotsIcon style={styles.dotsIcon} />
          </View>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => Actions.Main()}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
        <Image
          style={styles.cardBackground}
          source={require('dash/src/res/card.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  startText: {
    color: '#21293D',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  startButton: {
      position: 'absolute',
      bottom: 20,
      right: 15,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  dotsIcon: {
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(11, 11, 11, 0.12)',
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    height: 180,
    width: width - 40,
    paddingLeft: 30,
    paddingRight: 20,
    overflow: 'hidden',
  },
  cardSubTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
    color: 'white',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'white',
    lineHeight: 24,
  },
  cardBackground: {
    height: 180,
    width: width - 40,
    position: 'absolute',
    zIndex: -1,
  },
});
