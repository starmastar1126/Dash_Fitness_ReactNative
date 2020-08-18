import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';

import {mediaHost} from '../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Video from 'react-native-video';

const {height, width} = Dimensions.get('screen');

export default function Component(props) {
  const {item, containerStyle, onPress, nextTitle = 'Select Plan'} = props;
  const Touch = onPress ? TouchableOpacity : View;
  const [play, setPlay] = useState(false);
  const [load, setLoad] = useState(false);
  let videoRef = React.createRef(null);

  useEffect(() => {
    // if (load) videoRef.presentFullscreenPlayer();
  }, [load]);


  return (
    <Touch
      style={[styles.challengeTypeContainer, containerStyle]}
      onPress={onPress}>
      <View
        style={[
          styles.challengeTypeStart,
          {
            backgroundColor: item.color,
          },
        ]}>
        {!play?
          <Image
            source={{uri: `${mediaHost}${item.planImage}`}}
            style={styles.challengeTypePicture}
          />
        :
          <Modal isVisible={true} transparent={true}>
            {load?
              <TouchableOpacity style={styles.closeBtn} onPress={() => setPlay(false)}>
                 <Image style={styles.closeIcon} source={require('../res/close-video.png')} resizeMode="contain"/>
              </TouchableOpacity>
            :
              null
            }

            <View style={styles.videoBox}>
              {
              console.log(" item.planVideo=====", item.planVideo),
              !load?
                <View style={styles.videoLoaded}>
                  <ActivityIndicator size="large" color="#ffffff"/>
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              :
                null
              }

              <Video
                ref={videoRef}
                useNativeDriver={false}
                repeat={true}
                paused={false}
                source={{uri: `${mediaHost}${item.planVideo}`}}
                resizeMode={'cover'}
                style={styles.challengeTypeVideo}
                onReadyForDisplay={()=>setLoad(true)}
                onLoad={() => {
                  videoRef.current.seek(0);
                }}
              />
            </View>
            {load?
              <View style={styles.bottomBox}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <TouchableOpacity style={styles.selectPlanBox} onPress={onPress}>
                  <Text style={styles.selectText}>{nextTitle}</Text>
                  <Ionicon name={'md-arrow-forward'} color="#000000" size={20} />
                </TouchableOpacity>
              </View>
            :
              null
            }

          </Modal>
        }

        <TouchableOpacity style={styles.trailerBox} onPress={() => setPlay(true)}>
          <FontAwesome style={styles.arrowTrailer} name={'play'} color="#000000" size={12} />
          <Text style={styles.trailerText}>TRAILER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.challengeTypeMain}>
        <Text style={styles.typeName}>{item.title}</Text>
        <Text style={styles.typeDescription}>{item.description}</Text>
      </View>
      {props.children}
    </Touch>
  );
}

const styles = StyleSheet.create({
  typeDescription: {
    color: '#21293D',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.6,
  },
  typeName: {
    color: '#21293D',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    lineHeight: 24,
  },
  challengeTypeMain: {
    flex: 1,
    marginTop:20,
    paddingHorizontal: 15,
    alignSelf:"flex-start",
    paddingVertical: 20,
  },
  challengeTypePicture: {
    width: "100%",
    height: 200,
  },
  challengeTypeVideo: {
    width:"100%",
    height:"100%"
  },
  challengeTypeStart: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeTypeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 40,
    overflow: 'hidden',
    alignItems:"center",
    elevation:1
  },
  trailerBox: {
    flexDirection:"row",
    backgroundColor:"#ffffff",
    borderRadius:15,
    paddingLeft:17,
    paddingRight:17,
    paddingTop:7,
    paddingBottom:7,
    marginTop:-50,
    alignSelf:"flex-end",
    marginRight:15
  },
  arrowTrailer: {
    marginTop:3
  },
  trailerText: {
    marginLeft:11,
    fontSize:10,
    marginTop:2,
    fontFamily: 'Poppins-Bold',
    letterSpacing:2
  },
  videoBox: {
    width:width,
    height:height,
    alignItems:"center",
    justifyContent:"center",
    alignSelf: 'center'
  },
  videoLoaded: {
    position:"absolute",
    top:height/2 - 50,
    width:width/2,
    zIndex:999,
    alignItems:"center",
    justifyContent:"center"
  },
  loadingText: {
    fontWeight:"bold",
    color:"#ffffff"
  },
  closeBtn: {
    position:"absolute",
    top:10,
    left:10,
    zIndex:999
  },
  closeIcon: {
    width:40,
    height:40
  },
  bottomBox: {
    position:"absolute",
    left:-16,
    bottom:30,
    width:width,
    alignItems:"center"
  },
  itemTitle: {
    color:"#ffffff",
    fontSize:20,
    marginBottom:20,
    fontFamily: 'Poppins-Bold',
    marginRight:8
  },
  selectPlanBox: {
    flexDirection:"row",
    paddingTop:12,
    width:154,
    paddingBottom:12,
    backgroundColor:"#ffffff",
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center"
  },
  selectText: {
    marginRight:15,
    fontFamily: 'Poppins-Medium',
    fontSize:14
  }
});

Component.defaultProps = {};
