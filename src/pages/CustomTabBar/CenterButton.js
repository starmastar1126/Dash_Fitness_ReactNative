import React from 'react';
import {View, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Actions} from 'react-native-router-flux';

import {Logo} from 'dash/src/components/Icons';

class Component extends React.Component {
  animation = new Animated.Value(1);
  componentDidUpdate(prevProps) {
    const {routeName} = this.props.routes.params;
    if (routeName === 'ExploreTab' || routeName === 'MyProfile') {
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(({finished}) => {});
      return;
    }
    if (routeName === 'MyChallengesTab') {
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(({finished}) => {});
    }
  }
  render() {
    const scale = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    });
    const translateY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableWithoutFeedback onPress={() => Actions.MyChallengesTab()}>
        <Animated.View
          style={[
            styles.addContainer,
            {
              transform: [{scale}],
              transform: [{scale}, {translateY}],
            },
          ]}>
          <LinearGradient
            colors={['#007BFF', '#00A1FF']}
            useAngle={true}
            angle={72}
            style={styles.containerGradiend}>
            <Logo />
          </LinearGradient>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = EStyleSheet.create({
  containerGradiend: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContainer: {
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$lightBlue',
    borderRadius: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    overflow: 'hidden',
  },
});

export default connect(({routes}) => ({
  routes,
}))(Component);
