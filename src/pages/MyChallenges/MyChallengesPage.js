import React from 'react';
import {View, Text, ScrollView, RefreshControl, Animated, Keyboard} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import EmptyChallenges from './EmptyChallenges';
import Challenges from './Challenges';

export default class Component extends React.Component {
  ScrollViewRef;

  scrollTo = (value) => {
    if(this.ScrollViewRef){
      this.ScrollViewRef.scrollTo(value);

    }
  };
  

  render() {
    const {
      ScrollViewAnimation,
      refresh,
      getData,
      challenges,
      onScrollEndDragInnerScrolls,
      previous,
    } = this.props;
    return previous && challenges.length === 0 ? (
      <View style={styles.emptyMainContainer}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Previous challenges list is empty
          </Text>
        </View>
      </View>
    ) : (
      <ScrollView
        onMomentumScrollEnd={onScrollEndDragInnerScrolls}
        showsVerticalScrollIndicator={false}
        ref={(e) => (this.ScrollViewRef = e)}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            colors={[EStyleSheet.value('$lightBlue')]}
            refreshing={refresh}
            onRefresh={getData}
          />
        }
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: ScrollViewAnimation}},
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        contentContainerStyle={styles.contentContainerStyle}>
        {!previous && challenges.length === 0 ? (
          <EmptyChallenges />
        ) : (
          <Challenges array={challenges} />
        )}
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  emptyContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 1,
    opacity: 0.99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  emptyMainContainer: {
    flex: 1,
    marginTop: 200,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  contentContainerStyle: {
    paddingTop: 200,
    paddingBottom: 75,
    zIndex: 1,
  },
});
