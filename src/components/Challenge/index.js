import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import moment from 'moment';

import { mediaHost } from 'dash/src/config';

import ViewedBy from './ViewedBy';

const { width } = Dimensions.get('window');

const array = [
  {
    default: true,
    value: '1',
    //uri: require('dash/src/res/graphic/1.jpg'),
    uri:"https://dashchallengesapi.com/static/media/2020-6-10-5-14-33-1.jpg",
  },
  {
    default: true,
    value: '2',
    uri:"https://dashchallengesapi.com/static/media/2020-6-10-5-14-38-2.jpg",
   // uri: require('dash/src/res/graphic/2.jpg'),
  },
  {
    default: true,
    value: '3',
    uri:"https://dashchallengesapi.com/static/media/2020-6-10-5-14-39-3.jpg",
    //uri: require('dash/src/res/graphic/3.jpg'),
  },
  {
    default: true,
    value: '4',
    uri:"https://dashchallengesapi.com/static/media/2020-6-10-5-14-40-4.jpg",
   // uri: require('dash/src/res/graphic/4.jpg'),
  },
];
export default function Component(props) {

  const { value, past, viewedBy } = props;

  let bgImgUrl = '';
  if (value.challengeBGImage.includes('-')) {
    bgImgUrl = { uri: `${mediaHost}${value.challengeBGImage}` };
  } else {
    bgImgUrl = value.challengeBGImage
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.pictureContainer,
          past
            ? {
              height: width / 2,
            }
            : {},
        ]}>
        <Image
           source={{uri: `${mediaHost}${value.challengeBGImage}`}} // Chandni will enbale for uploaded images 
          // source={bgImgUrl}
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator />}
          style={[
            styles.picture,
            ,
            past
              ? {
                height: width / 2 + 50,
              }
              : {},
          ]}
        />
        {value.newPosts && (
          <View style={styles.newPostsContainer}>
            <View style={styles.postCircle}>
              <Text style={styles.postNumber}>2</Text>
            </View>
            <Text style={styles.post}>New Posts</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{value.title}</Text>
        {moment(new Date()).diff(moment(new Date(value.startDate)), 'days') >
          0 ? (
            <>
              {value.allStep && (
                <View style={styles.progress}>
                  <View
                    style={[
                      styles.progressCompleted,
                      { width: `${(value.myStep * 100) / value.allStep}%` },
                    ]}></View>
                </View>
              )}
              {value.allStep && (
                <Text
                  style={
                    styles.completed
                  }>{`${value.myStep}/${value.allStep} Completed`}</Text>
              )}
            </>
          ) : (
            <View style={styles.bottom}>
              {past && <Text style={styles.date}>{value.date}</Text>}
              {value.startDate && (
                <Text style={styles.completed}>
                  Starts in{' '}
                  {Math.abs(
                    moment(new Date()).diff(
                      moment(new Date(value.startDate)),
                      'days',
                    ),
                  )}{' '}
                Days
                </Text>
              )}
              {viewedBy && <ViewedBy viewedBy={viewedBy} />}
            </View>
          )}
      </View>
    </View>
  );
}

Component.defaultProps = {
  value: {
    picture: '',
  },
};

const styles = StyleSheet.create({
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#96AAC6',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  post: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#fff',
    marginLeft: 8,
    marginTop: 2,
  },
  postNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#21293D',
  },
  postCircle: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  newPostsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completed: {
    color: '#00A1FF',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  progressCompleted: {
    backgroundColor: '#00A1FF',
    height: 5,
    borderRadius: 5,
  },
  progress: {
    height: 5,
    width: '100%',
    backgroundColor: '#E0EAF3',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  title: {
    color: '#21293D',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  bottomContainer: {
    padding: 25,
  },
  container: {
    overflow: 'hidden',
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 1,
    opacity: 0.99,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  pictureContainer: {
    width: width - 30,
    height: width - 30,
    overflow: 'hidden',
  },
  picture: {
    width: width - 30,
    height: width - 30,
  },
});
