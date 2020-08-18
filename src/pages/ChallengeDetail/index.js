import React from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Easing,
  BackHandler,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

import { BackArrow, AddUser } from 'dash/src/components/Icons';
import { InviteFriendsRef } from 'dash/src/index';

import * as UserActions from 'dash/src/actions/user';

import Challenge from './Challenge';
import Social from './Social';
import PopupPost from './Social/PopupPost';
import IconEntypo from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('screen');

class Component extends React.Component {
  constructor(props) {
    super(props);
    const { challenge, user } = this.props;

    this.state = {
      index: 0,
      user: challenge.createdBy === user._id ? user : {},
    };
  }

  PopupPostRef;
  position = new Animated.Value(0);
  HorizontalScrollRef;

  backAction = () => {
    Actions.MyChallengesTab();
    return false;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    try {
      const { challenge, user } = this.props;
      if (user._id !== challenge.createdBy) {
        const userData = await UserActions.getUserById(challenge.createdBy);
        this.setState({ user: userData });
      }
    } catch (e) { }

    //  Android back button 
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  };
  onChangeTab = (index) => {
    if (this.state.index !== index) {
      this.setState({ index }, () => {
        if (index !== 0) {
          this.position.setValue(0);
          Animated.timing(this.position, {
            toValue: 1,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start();
        } else {
          this.position.setValue(1);
          Animated.timing(this.position, {
            toValue: 0,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start();
        }
        this.HorizontalScrollRef.scrollTo({ x: index * width, animated: true });
      });
    }
  };
  onScrollEndDrag = (e) => {
    const { index } = this.state;
    if (index === 0) {
      if (e.nativeEvent.contentOffset.x < 75) {
        this.onChangeTab(0);
      } else {
        this.onChangeTab(1);
      }
      return;
    }
    if (index === 1) {
      if (e.nativeEvent.contentOffset.x > width - 75) {
        this.onChangeTab(1);
      } else {
        this.onChangeTab(0);
      }
      return;
    }
  };
  onPress = (index, press = true) => {
    if (press) {
      this.onChangeTab(index);
    }
    this.setState({ index }, () => {
      if (this.position._value === 0) {
        this.position.setValue(0);
        Animated.timing(this.position, {
          toValue: 1,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      } else {
        this.position.setValue(1);
        Animated.timing(this.position, {
          toValue: 0,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    });
  };
  render() {
    const { index, user } = this.state;
    const { challenge } = this.props;
    console.log(" challenge is ", challenge);

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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => {
            Actions.MyChallengesTab();
          }}>
            <BackArrow />
          </TouchableOpacity>
          <View style={styles.containerHeader}>
            <Animated.View
              style={[
                styles.selectedContainer,
                {
                  right,
                  left,
                },
              ]}
            />

            {[{ title: 'Challenge' }, { title: 'Social' }].map((value, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.item]}
                onPress={() => this.onPress(i, true)}>
                <Text
                  style={[
                    styles.tabText,
                    i === index
                      ? {
                        color: 'black',
                      }
                      : {},
                  ]}>
                  {value.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.addUser}
            onPress={() => {
              InviteFriendsRef.open();
            }}>
            <View>
              <AddUser />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          bounces={false}
          onScrollEndDrag={this.onScrollEndDrag}
          showsHorizontalScrollIndicator={false}
          ref={(e) => (this.HorizontalScrollRef = e)}>
          <View style={{ width, height }}>
            <Challenge challenge={challenge} user={user} />
          </View>
          <View style={{ width, height }}>
            <Social
              user={user}
              challenge={challenge}
              PopupPostRef={this.PopupPostRef}
            />
          </View>
        </ScrollView>
        <View style={styles.nextDay}>
          <View>
            <Text style={styles.nextDayTitle}>Your NEXT TASK</Text>
            <Text style={styles.nextDaySubtitle}>Day 23: Arm Day</Text>
          </View>
          {this.props.isTaskCompleted ?
            <View
              style={styles.circleButton}>
              <IconEntypo name="check"
                color="white"
                style={{ fontSize: 20, fontFamily: 'Poppins-Bold', }} />
            </View>
            : <TouchableOpacity
              style={styles.startContainer}
              onPress={() => Actions.Main({ challenge: challenge, user: user })}>
              <Text style={styles.start}>Start</Text>
            </TouchableOpacity>}
        </View>
        <PopupPost ref={(e) => (this.PopupPostRef = e)} />
      </View>
    );
  }
}

export default connect(({ user }) => ({
  user,
}))(Component);

const styles = EStyleSheet.create({
  nextDaySubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  circleButton: {
    width: 40, height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$lightBlue',

  },
  nextDayTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '$lightBlue',
  },
  start: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    lineHeight: 18,
  },
  startContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '$lightBlue',
    borderRadius: 50,
  },
  nextDay: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 15,
    elevation: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  addUser: {
    padding: 20,
  },
  back: {
    padding: 20,
  },
  header: {
    position: 'absolute',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'white',
    elevation: 2,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  selectedContainer: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    marginHorizontal: 2,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  tabText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    lineHeight: 24,
    color: '#96AAC6',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 41, 61, 0.05)',
    borderRadius: 50,
    padding: 2,
  },
});
