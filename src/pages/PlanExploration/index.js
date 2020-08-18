import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import BottomTabs from './BottomTabs';
import BackgroundTop from './BackgroundTop';
import ChevronRightIcon from './ChevronRightIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import DotsIcon from './DotsIcon';
import VerticalDots from './VerticalDots';

import Card from './Card';

const {height, width} = Dimensions.get('window');

const array2 = [
  {
    picture: require('dash/src/res/plan1.png'),
    min: '30',
    text: 'Simple Yoga Flow',
  },
  {
    picture: require('dash/src/res/plan1.png'),
    min: '30',
    text: '7-minute Total-body Desk Detox',
  },
  {
    picture: require('dash/src/res/plan1.png'),
    min: '30',
    text: 'Simple Yoga Flow',
  },
  {
    picture: require('dash/src/res/plan2.png'),
    min: '30',
    text: '7-minute Total-body Desk Detox',
  },
];

const array = [
  {
    picture: require('dash/src/res/plan1.png'),
    min: '30',
    text: 'Simple Yoga Flow',
  },
  {
    picture: require('dash/src/res/plan2.png'),
    min: '30',
    text: '7-minute Total-body Desk Detox',
  },
  {
    picture: require('dash/src/res/plan1.png'),
    min: '25',
    text: 'Simple Yoga Flow 2',
  },
  {
    picture: require('dash/src/res/plan2.png'),
    min: '35',
    text: '7-minute Total-body Desk Detox',
  },
];

const slides = [
  {
    title: 'Week 1',
    subTitle: 'Completed this week : 1 of 4',
    component: () => (
      <>
        <Card />
        <Text style={styles.title}>Day</Text>
        {array.map((value, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.pictureContainer}>
              <Image style={styles.itemPicture} source={value.picture} />
              <View style={styles.abovePicture}>
                <Text style={styles.minValue}>{value.min}</Text>
                <Text style={styles.minText}>Min</Text>
              </View>
            </View>
            <View style={styles.itemCenter}>
              <Text style={styles.itemText}>{value.text}</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.itemStatus}>Intensity</Text>
                <DotsIcon color={'#6F80A7'} style={styles.dotsIcon} />
              </View>
            </View>
            <TouchableOpacity style={styles.verticalDots}>
              <VerticalDots />
            </TouchableOpacity>
          </View>
        ))}
      </>
    ),
  },
  {
    title: 'Week 2',
    subTitle: 'Preview',
    component: () => (
      <>
        {array2.map((value, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.pictureContainer}>
              <Image style={styles.itemPicture} source={value.picture} />
              <View style={styles.abovePicture}>
                <Text style={styles.minValue}>{value.min}</Text>
                <Text style={styles.minText}>Min</Text>
              </View>
            </View>
            <View style={styles.itemCenter}>
              <Text style={styles.itemText}>{value.text}</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.itemStatus}>Intensity</Text>
                <DotsIcon color={'#6F80A7'} style={styles.dotsIcon} />
              </View>
            </View>
          </View>
        ))}
      </>
    ),
  },
];

export default class extends React.Component {
  state = {
    currentIndex: 0,
  };
  ScrollViewAnimation = new Animated.Value(0);
  prev = () => {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }
  };
  next = () => {
    if (this.state.currentIndex !== slides.length - 1) {
      this.setState({currentIndex: this.state.currentIndex + 1});
    }
  };
  render() {
    const translateY = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 300],
      outputRange: [height / 2 - 50, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1}}>
        <BackgroundTop />
        <Animated.View
          style={[styles.headerContainer, {transform: [{translateY}]}]}>
          <Animated.View style={[styles.header]}>
            <TouchableOpacity style={styles.circle} onPress={this.prev}>
              <ChevronLeftIcon />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.titleHeader}>
                {slides[this.state.currentIndex].title}
              </Text>
              <Text style={styles.subTitleHeader}>
                {slides[this.state.currentIndex].subTitle}
              </Text>
            </View>
            <TouchableOpacity style={styles.circle} onPress={this.next}>
              <ChevronRightIcon />
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.linesContainer}>
            {[0, 1, 2, 3].map((value, index) => (
              <View
                key={value}
                style={[
                  styles.line,
                  {
                    backgroundColor:
                      index === this.state.currentIndex ? '#DC786C' : '#F0F5FA',
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this.ScrollViewAnimation}},
              },
            ],
            {
              useNativeDriver: false,
            },
          )}>
          <View style={styles.contentContainer}>
            {slides[this.state.currentIndex].component()}
          </View>
        </Animated.ScrollView>
        <BottomTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verticalDots: {
    paddingHorizontal: 25,
  },
  pictureContainer: {
    width: 56,
    height: '100%',
    marginLeft: 15,
  },
  abovePicture: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  minValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    lineHeight: 24,
    marginBottom: -5,
  },
  minText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: 'white',
    lineHeight: 20,
  },
  itemStatus: {
    color: '#6F80A7',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#292E3A',
  },
  dotsIcon: {
    marginLeft: 5,
  },
  dots: {
    height: 50,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCenter: {
    flex: 1,
    marginHorizontal: 15,
  },
  itemPicture: {
    width: 56,
  },
  itemContainer: {
    overflow: 'hidden',
    marginHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#292E3A',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  line: {
    width: width / 4 - 15,
    height: 4,
    borderRadius: 5,
  },

  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    paddingTop: 100,
  },
  contentContainerStyle: {
    paddingBottom: 100,
    paddingTop: height / 2 - 40,
    zIndex: 10,
  },
  headerContainer: {
    height: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'white',
    zIndex: 10,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    padding: 10,
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    color: '#292E3A',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  subTitleHeader: {
    color: '#6F80A7',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  linesContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
