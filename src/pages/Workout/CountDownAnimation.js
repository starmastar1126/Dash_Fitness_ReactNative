import React from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';

const GO = 'GO!';

export default class extends React.Component {
  animation = new Animated.Value(0);
  state = {
    count: 3,
  };
  componentDidMount() {
    this.start();
  }
  start = () => {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(this.animation, {
          toValue: 2,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          this.setState(
            (prev) => {
              const count =
                prev.count === GO
                  ? -1
                  : prev.count - 1 === 0
                  ? GO
                  : prev.count - 1;
              return {
                count,
              };
            },
            () => {
              if (this.state.count !== -1) {
                this.start();
              } else {
                if (this.props.onEnd) {
                  this.props.onEnd();
                }
              }
            },
          );
        });
      }, 333);
    });
  };
  render() {
    const {count} = this.state;
    const opacity = this.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
    const scale = this.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 2],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity,
            transform: [{scale}],
          },
        ]}>
        <Text
          style={[
            styles.count,
            {
              fontSize: count === GO ? 25 : 40,
              lineHeight: count === GO ? 35 : 55,
            },
          ]}>
          {count}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 41, 61, 0.4)',
    borderRadius: 50,
  },
  count: {
    fontSize: 35,
    lineHeight: 55,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});
