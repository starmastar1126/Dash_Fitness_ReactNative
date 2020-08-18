import React from 'react';
import { View, Animated, Dimensions, Easing, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import Top from './Top';

import MyChallengesPage from './MyChallengesPage';

//import { getAllChallengesOfDB, getMyChallenges } from '../../actions/challenges';

import * as challenegesActions from '../../actions/challenges';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const PureView = (props) => {
  return <View style={styles.challengeExistContainer}>{props.children}</View>;
};

const LinearView = (props) => {
  return (
    <LinearGradient
      colors={['#007BFF', '#00A1FF']}
      useAngle={true}
      angle={72}
      style={styles.container}>
      {props.children}
    </LinearGradient>
  );
};

class Component extends React.Component {
  ScrollViewRef;
  HorizontalScrollRef;
  TabViewRef;
  MyChallengesPageRef;
  MyChallengesPageRef2;
  TopRef;
  position = new Animated.Value(0);
  ScrollViewAnimation = new Animated.Value(0);

  state = {
    index: 0,
    refresh: true,
    arrayAllChallenges: [],
  };
  currentIndex = 0;
  currentInnersPosition = 'open';

  componentDidMount = async () => {

    this.getData();
    this.props.navigation.addListener('willFocus', () => {

      this.callApiToGetChallenges();
    });
    this.callApiToGetChallenges();

  };

  callApiToGetChallenges = async () => {
    this.setState({ refresh: true });
    const response = await challenegesActions.getAllChallengesOfDB();
    this.setState({ 
      arrayAllChallenges: response,
      refresh: false
     });

  }

  getData = async () => {
    const { user } = this.props;
    if (user) {
      this.setState({ refresh: true });
      await challenegesActions.getMyChallenges();
      this.setState({ refresh: false });
    } else {
      this.setState({ refresh: false });
    }
  };
  onScrollEndDrag = (e) => {
    if (this.currentIndex === 0) {
      if (e.nativeEvent.contentOffset.x < 75) {
        this.onChangeTab(0);
      } else {
        this.onChangeTab(1);
      }
      return;
    }
    if (this.currentIndex === 1) {
      if (e.nativeEvent.contentOffset.x > width - 75) {
        this.onChangeTab(1);
      } else {
        this.onChangeTab(0);
      }
      return;
    }
  };

  onScrollEndDragInnerScrolls = (e) => {
    if (this.currentInnersPosition === 'open') {
      if (
        e.nativeEvent.contentOffset.y >= 0 &&
        e.nativeEvent.contentOffset.y < 50
      ) {
        this.MyChallengesPageRef.scrollTo({ x: 0, y: 0, animated: true });
        this.MyChallengesPageRef2.scrollTo({ x: 0, y: 0, animated: true });

        return;
      }
      if (
        e.nativeEvent.contentOffset.y >= 50 &&
        e.nativeEvent.contentOffset.y <= 180
      ) {
        this.MyChallengesPageRef.scrollTo({ x: 0, y: 180, animated: true });
        this.MyChallengesPageRef2.scrollTo({ x: 0, y: 180, animated: true });
        this.currentInnersPosition = 'close';
        return;
      }
    }
    if (this.currentInnersPosition === 'close') {
      if (
        e.nativeEvent.contentOffset.y > 0 &&
        e.nativeEvent.contentOffset.y <= 180
      ) {
        this.MyChallengesPageRef.scrollTo({ x: 0, y: 0, animated: true });
        this.MyChallengesPageRef2.scrollTo({ x: 0, y: 0, animated: true });
        this.currentInnersPosition = 'open';
        return;
      }
    }
    if (e.nativeEvent.contentOffset.y >= 180) {
      this.currentInnersPosition = 'close';
    }
  };
  onChangeTab = (index) => {
    this.currentIndex = index;
    if (this.HorizontalScrollRef) {
      this.HorizontalScrollRef.scrollTo({ x: index * width, animated: true });
    }
    Animated.timing(this.position, {
      toValue: index,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    this.TopRef.onChangeCurrentIndex(index);
  };
  render() {
    const { index, refresh } = this.state;
    const { user } = this.props;
    
    let challenges = [];
    if (user && user._id) {
       challenges = this.state.arrayAllChallenges.filter(
        (v) => v.createdBy === user._id && v.status === 'start',
      );
    }
   

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
    const Container = challenges.length === 0 ? LinearView : PureView;
    const right = this.position.interpolate({
      inputRange: [0, 1],
      outputRange: ['50%', '0%'],
      extrapolate: 'clamp',
    });
    const left = this.position.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '50%'],
      extrapolate: 'clamp',
    });
    return (
      <Container>
        <Animated.View
          style={[
            styles.linear,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}>
          <LinearGradient
            colors={['#007BFF', '#00A1FF']}
            useAngle={true}
            angle={72}
            style={styles.container}
          />
        </Animated.View>
        <ScrollView
          horizontal={true}
          bounces={false}
          onScrollEndDrag={this.onScrollEndDrag}
          ref={(e) => (this.HorizontalScrollRef = e)}>
          <View style={{ width, height }}>
            <MyChallengesPage
              {...this.props}
              challenges={challenges}
              refresh={refresh}
              getData={this.getData}
              ref={(e) => (this.MyChallengesPageRef = e)}
              ScrollViewAnimation={this.ScrollViewAnimation}
              onScrollEndDragInnerScrolls={this.onScrollEndDragInnerScrolls}
            />
          </View>
          <View style={{ width, height }}>
            <MyChallengesPage
              {...this.props}
              previous={true}
              challenges={[]}
              refresh={refresh}
              getData={this.getData}
              ref={(e) => (this.MyChallengesPageRef2 = e)}
              ScrollViewAnimation={this.ScrollViewAnimation}
              onScrollEndDragInnerScrolls={this.onScrollEndDragInnerScrolls}
            />
          </View>
        </ScrollView>
        <Top
          ref={(e) => (this.TopRef = e)}
          currentTab={index}
          right={right}
          left={left}
          onChangeTab={this.onChangeTab}
          ScrollViewAnimation={this.ScrollViewAnimation}
        />
      </Container>
    );
  }
}




export default connect(({ user, challenges }) => ({
  user,
  challenges,
}))(Component);

const styles = EStyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linear: {
    height: 350,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
  },
  challengeExistContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
