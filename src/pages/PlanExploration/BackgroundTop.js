import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class extends React.Component {
  render() {
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>LIZA KUSHY</Text>
          <Text style={styles.subTitle}>Krushing it with Koshy</Text>
        </View>
        <Image
          style={styles.background}
          source={require('dash/src/res/explorationBackground.png')}
        />
        <View style={styles.womanContainer}>
          <Image
            style={styles.woman}
            source={require('dash/src/res/woman.png')}
          />
          <View style={styles.dotsContainer}>
            <Image
              resizeMode="contain"
              style={styles.dots}
              source={require('dash/src/res/dots.png')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    height: height / 2,
    width,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.6,
    color: 'white',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    textAlign: 'center',
    marginHorizontal: '10%',
    lineHeight: 36,
  },
  background: {
    position: 'absolute',
    height: height / 2,
    width,
    zIndex: -1,
  },
  woman: {
    height: 200,
  },
  womanContainer: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  dotsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  dots: {
    height: 20,
  },
});
