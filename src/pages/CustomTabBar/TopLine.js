import React from 'react';
import {View, Animated, Dimensions, Easing} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
const {height, width} = Dimensions.get('screen');

const center = width / 2 - 20 - 64 / 2;
const left = width - 40 - 64;

class Component extends React.Component {
  transitionX = new Animated.Value(1);
  componentDidUpdate(prevProps) {
    const {routeName} = this.props.routes.params;
    if (routeName === 'ExploreTab') {
      Animated.timing(this.transitionX, {
        toValue: 2,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(({finished}) => {});
      return;
    }
    if (routeName === 'MyChallengesTab') {
      Animated.timing(this.transitionX, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(({finished}) => {});
      return;
    }
    if (routeName === 'MyProfile') {
      Animated.timing(this.transitionX, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(({finished}) => {});
      return;
    }
  }
  render() {
    const right = this.transitionX.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, center, left],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.line,
            {
              right,
            },
          ]}></Animated.View>
      </View>
    );
  }
}
export default connect(({routes}) => ({
  routes,
}))(Component);

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    zIndex: 100,
    marginHorizontal: 20,
  },
  line: {
    position: 'absolute',
    top: 0,
    width: 64,
    height: 2,
    backgroundColor: '$lightBlue',
  },
});
