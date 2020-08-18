import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Linking,
  Text,
  Platform,
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

import NavBar from 'dash/src/components/NavBar';
import {Camera} from 'dash/src/components/Icons';
import {Actions} from 'react-native-router-flux';

const {height, width} = Dimensions.get('screen');

export default class Component extends React.Component {
  state = {
    photos: [],
    permissionError: false,
  };
  componentDidMount() {
    if(Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          this.onEndReached();
        } else {
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
            if (result === RESULTS.DENIED) {
              this.setState({permissionError: true});
            } else {
              this.onEndReached();
            }
          });
        }
      })
      .catch((error) => {});
    } else {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          this.onEndReached();
        } else {
          request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
            if (result === RESULTS.DENIED) {
              this.setState({permissionError: true});
            } else {
              this.onEndReached();
            }
          });
        }
      })
      .catch((error) => {});
    }

  }
  onEndReached = () => {
    CameraRoll.getPhotos({
      groupTypes: 'All',
      after: `${this.state.photos.length}`,
      first: 20,
      assetType: 'Photos',
    })
      .then((r) => {
        console.log({r})
        const photos = this.state.photos.concat(r.edges);
        this.setState({photos});
      })
      .catch((err) => {
        console.log({err});
      });
  };
  onPress = (item) => {
    const {onePhoto, callbackCamera} = this.props;
    if (onePhoto) {
      if (callbackCamera) {
        callbackCamera(item);
        Actions.pop();
      }
    }
  };
  onPressPermission = () => {
    Linking.openSettings();
  };
  cameraPress = () => {
    const {callbackCamera} = this.props;
    ImagePicker.launchCamera({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        callbackCamera({
          node: {
            image: {...response, filename: `${new Date().getTime()}.jpg`},
          },
        });
        Actions.pop();
      }
    });
  };
  render() {
    const {navBarTitle} = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          title={navBarTitle}
          iconRight={
            <TouchableOpacity onPress={this.cameraPress}>
              <Camera />
            </TouchableOpacity>
          }
        />
        {this.state.permissionError ? (
          <View style={styles.center}>
            <Text style={styles.permission} onPress={this.onPressPermission}>
              Please enable permission
            </Text>
            <Text style={styles.permission} onPress={this.onPressPermission}>
              for this functional
            </Text>
          </View>
        ) : (
          <FlatList
            numColumns={3}
            onEndReachedThreshold={width / 3}
            onEndReached={this.onEndReached}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={styles.contentContainerStyle}
            data={this.state.photos.filter(
              (p) => p.node.image.height > 0 && p.node.image.width > 0,
            )}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => this.onPress(item)}>
                <Image
                  style={{
                    width: width / 3,
                    height: width / 3,
                  }}
                  source={{uri: item.node.image.uri}}
                />
                <View style={styles.circle}></View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}

Component.defaultProps = {
  onePhoto: false,
  callbackCamera: () => {},
  navBarTitle: 'Camera Roll',
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permission: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: '#1AA0FF',
  },
  circle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  imageContainer: {
    flex: 1,
    width: width / 3,
    height: width / 3,
  },
  contentContainerStyle: {
    paddingTop: 78,
  },
  container: {
    flex: 1,
  },
});
