import React from 'react';
import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import {AccountDetailsRef} from 'dash/src/pages/CustomTabBar';

import Layout from './Layout';
import Top from './Top';
export let ScrollViewRef;
export default class Component extends React.Component {
  ScrollViewAnimation = new Animated.Value(0);

  openAccountDetails = () => {
    AccountDetailsRef.open();
  };

  render() {
    const translateY = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [0, -280],
      extrapolate: 'clamp',
    });
    const opacity = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            {
              transform: [{translateY}],
              opacity,
            },
            styles.containerBackground,
          ]}>
          <LinearGradient
            colors={['#007BFF', '#00A1FF']}
            useAngle={true}
            angle={72}
            style={styles.containerGradiend}
          />
        </Animated.View>
        <ScrollView
          ref={(e) => (ScrollViewRef = e)}
          scrollEventThrottle={16}
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
          contentContainerStyle={styles.contentContainerStyle}>
          <Layout openAccountDetails={this.openAccountDetails} />
        </ScrollView>
        <Top ScrollViewAnimation={this.ScrollViewAnimation} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerGradiend: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  containerBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 350,
  },
  contentContainerStyle: {
    paddingTop: 280,
    paddingBottom: 75,
  },
  container: {
    flex: 1,
  },
});

Component.defaultProps = {};
