import React from 'react';
import {View, StyleSheet, Animated, Text, TouchableOpacity} from 'react-native';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default class extends React.Component {
constructor(props){
  super(props);
  this.state = {
    count: this.props.RestTime && this.props.RestTime != ''? parseInt(this.props.RestTime):0,
  };
}
 
  
  animation = new Animated.Value(2);
  timer;

  componentDidMount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      this.start();
    });
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  start = () => {
    this.timer = setTimeout(() => {
      this.setState(
        (prev) => {
          return {
            count: prev.count - 1,
          };
        },
        () => {
          if (this.state.count !== 1) {
            this.start();
          }
        },
      );
    }, 1000);
  };
  end = () => {
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      if (this.props.onEnd) {
        this.props.onEnd();
      }
    });
  };
  render() {
    const {count} = this.state;
    const opacity = this.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
    const translateY = this.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [100, 0, 100],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[styles.mainContainer]}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity,
              transform: [{translateY}],
            },
          ]}>
          <View
            style={{
              transform: [
                {
                  rotateY: '180deg',
                },
              ],
            }}>
            <AnimatedCircularProgress
              size={225}
              width={20}
              fill={100}
              rotation={0}
              duration={15000}
              tintColor="rgba(255,255,255,1)"
              onAnimationComplete={this.end}
              backgroundColor="rgba(255,255,255,0.4)"
            />
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.count}>{count}</Text>
            <Text style={styles.rest}>REST</Text>
          </View>
        </Animated.View>
        <TouchableOpacity style={styles.skipContainer} onPress={this.end}>
          <Text style={styles.skip}>Skip Rest</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(33, 41, 61, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  skipContainer: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  innerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 225,
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 41, 61, 0.4)',
    borderRadius: 115,
  },
  count: {
    fontSize: 50,
    lineHeight: 70,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  rest: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});
