import React, { useState } from 'react';
import {
  
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  PickerIOS, PickerItemIOS
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Carousel from 'react-native-snap-carousel';
import { Container, Content } from "native-base";
import _, { toInteger } from 'lodash';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal1 from 'react-native-modal';

import Modal from 'dash/src/components/Modal';
import RNPickerSelect from 'react-native-picker-select';
import Picker from 'react-native-picker';
import * as challenegesActions from '../../../actions/challenges';
import ChallengeTypeContainer from 'dash/src/components/ChallengeTypeContainer';

import CreateNew from '../CreateNew';
import Title from '../Title';
import Program from '../Program';
import Description from '../Description';
import StartDate from '../StartDate';
import Graphic from '../Graphic';
import AllSet from '../AllSet';
import Access from '../Access';

import Header from './Header';

import { mediaHost } from 'dash/src/config';
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import { FlatList, ScrollView } from 'react-native-gesture-handler';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('screen');
const radioButtonSize = 24;

const defaultChallenge = {
  type: null,
  public: null,
  title: '',
  description: '',
  // duration: 10,//null, // chandni
  startDate: null,
  graphic: null,
  // typeProgram: null,  chandni
  version: '1',

};
//const [cancel, setCancel] = useState(false);
//const [done, setDone] = useState(false);

//console.disableYellowBox = true;
class Component extends React.Component {
  CreateNewRef;
  CarouselRef;
  TitleRef;
  HeaderRef;
  state = {
    isVersionModalShow: false,
    challenge: _.cloneDeep(defaultChallenge),
    currentIndex: 0,
    renderList: [0, 1],
    loading: true,
    createdChallenge: null,
    versionNum: "1",
  };

  getChallengesApiCall = async () => {
    const { challenge } = this.state;
    console.log(" chllenge ", challenge);
    const arrayAllChallenges = await challenegesActions.getChallenges();

    // get the version of the plan which user has completed in his challenge. 
    let arrayUserPlanVersion = [];

    for (let index = 0; index < arrayAllChallenges.length; index++) {
      const element = arrayAllChallenges[index];
      if (element.createdBy === this.props.user._id) {

        if (element.Plan === challenge.type.title) {
          arrayUserPlanVersion.push(element.Version);
        }
      }
    }
    let arrayPlannedVersion = challenge.type.planTypeData;

    let arrayOnlyVersion = [];
    for (let index = 0; index < arrayPlannedVersion.length; index++) {
      const element = arrayPlannedVersion[index];
      arrayOnlyVersion.push(element.version);
    }

    // Find not completed versions 
    const findUniques = (a, b) => [...a, ...b].reduce((r, c, i, a) => {
      a.filter(x => x === c).length === 1 ? r.push(c) : null
      return r
    }, [])

    let arrayNotMatchedVersions = findUniques(arrayUserPlanVersion, arrayOnlyVersion);
    if (arrayNotMatchedVersions.length === 0) {
      // User is selecting first time 
      let minimum = arrayOnlyVersion.sort((a, b) => a - b)[0];
      this.setState({ versionNum: minimum })
    } else {
      // User didn't completed these versions so showing minimum version first. 
      let minimum = arrayNotMatchedVersions.sort((a, b) => a - b)[0];
      this.setState({ versionNum: minimum })
    }
  }
  

   saveVersion = async() => {
    try {
      await AsyncStorage.setItem('version', this.state.versionNum);
    } catch (error) {
      console.log(error.message);
    }
  };

  createChallenge = async () => {
    try {
      this.setState({ loading: true });
      const res = await challenegesActions.postMyChallenge(
        this.state.challenge,
      );
      this.setState({ loading: false, createdChallenge: res });

    } catch (eventResponse) {
      console.log(" Create challenge 1 msg", eventResponse);
      console.log("create challenge response ", eventResponse.response);
      this.setState({ loading: false });
    }
  };

  openCreateNew = (create = true) => {
    if (create) {
      this.setState(
        { currentIndex: 0, challenge: _.cloneDeep(defaultChallenge), createdChallenge: null },
        () => {
          this.CreateNewRef.open({});
        },
      );
    } else {
      this.CreateNewRef.open({});
    }
  };
  closeCreateNew = ({ call = () => { } }) => {
    this.CreateNewRef.close({ call });
  };

  onSnapItem = (currentIndex) => {

    const renderList = this.state.renderList;
    const i = renderList.indexOf(currentIndex + 1);
    if (i === -1) {
      renderList.push(currentIndex + 1);
    }

    if (currentIndex === 1) {
      if (this.props.user) {
        this.getChallengesApiCall();

      } else {
        const { challenge } = this.state;
        if (challenge.type && challenge.type.planTypeData && challenge.type.planTypeData.length > 0) {
          let arrayPlannedVersion = challenge.type.planTypeData;
          let arrayOnlyVersion = [];
          for (let index = 0; index < arrayPlannedVersion.length; index++) {
            const element = arrayPlannedVersion[index];
            arrayOnlyVersion.push(element.version);
          }

          let minimum = arrayOnlyVersion.sort((a, b) => a - b)[0];
          this.setState({ versionNum: minimum })
        }

      }
    }

    this.setState({ renderList, currentIndex }, () => {
      if (currentIndex === 2) {
        this.TitleRef.focus();
      }
      if (currentIndex === 6 && this.props.user) {
        this.createChallenge();
      }
    });
  };

  onChangeChallenge = (value, call = () => { }) => {

    this.setState(
      {
        challenge: {
          ...this.state.challenge,
          ...value,
        },
      },
      call,
    );
  };
  onPressNext = ({ call } = {}) => {
    if (this.state.currentIndex === 3) {
      Keyboard.dismiss();
    }
    this.CarouselRef.snapToNext(true);
    if (call) {
      call();
    }
  };
  onPressBack = () => {
    if (this.state.currentIndex === 2) {
      Keyboard.dismiss();
    }
    this.CarouselRef.snapToPrev();
  };


  renderChildren = () => {
    const { challenge } = this.state;
    let data = [
      () => {
        const opacity = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.ScrollView
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={false}
            style={{ opacity }}
            contentContainerStyle={[styles.contentContainerStyle]}>
            <View style={styles.titleContainer1}>
              <Text style={styles.titles}>Start your 30 day</Text>
              <Text style={styles.titles}>
                challenge by choosing
              </Text>
              <Text style={styles.titles}>
                the plan:
              </Text>
            </View>
            <CreateNew
              onPress={(type) => {
                console.log(" type is ", type);
                this.onPressNext({
                  call: () => {
                    this.HeaderRef.next();
                    if (type.planTypeData && type.planTypeData.length > 0) {
                      this.onChangeChallenge({ type });
                    }
                  },
                });
              }}
            />
          </Animated.ScrollView>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [height, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [1, 1],
          extrapolate: 'clamp',
        });
        if (!challenge.type) {
          return null;
        }

        let items = [];

        challenge.type.planTypeData.map((item, index) => {
          let string = "Version " + item.version + ".0"
          items.push(item.version)
        })

        
        let iosPickerSelectedValue = this.state.versionNum;
        return (
          <Animated.View
            style={{
              transform: [{ translateY }, { translateX }, { scale }],
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.contentContainerStyle, { height: Dimensions.get('window').height }]}>
              <ChallengeTypeContainer
                item={challenge.type}
                // onPress={() => this.onPressNext({})}
                nextTitle={'Confirm Plan'}
                containerStyle={{ marginBottom: 20 }}
              >
                <View style={{ paddingHorizontal: 8, marginTop: 40 }}>
                  <View style={styles.versionBox}>
                    <View style={styles.versionsTextBox}>
                      <Text style={styles.versionText} onPress={() => {
                        this.setState({
                          isVersionModalShow: true,
                        })
                      }} >Version {this.state.versionNum}.0</Text>
                      <View style={styles.versionRecommendedBox}>
                        <Text style={styles.versionRecommended}>Recommended</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => {
                      if (Platform.OS === 'android') {
                        this.setState({
                          isVersionModalShow: true,
                        })
                      } else {
                        Picker.show()
                      }
                    }}>
                      <MaterialIcon name={'edit'} color="#6F80A7" size={20} />
                    </TouchableOpacity>
                  </View>

                </View>
                {this.state.isVersionModalShow ?
                  <Modal1
                    animationIn={Platform.OS === 'ios' ? 'fadeInUp' : 'fadeIn'}
                    animationOut={Platform.OS === 'ios' ? 'fadeInDown' : "fadeOut"}
                    isVisible={this.state.isVersionModalShow}
                    onBackdropPress={() =>
                      this.setState({ isVersionModalShow: false })
                    }>
                    {Platform.OS === 'ios' ? <View style={{ backgroundColor: 'transparent' }}>

                      <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                        <Text style={styles.textPickerTitle}>Select Version</Text>
                        <View style={styles.singleRowIos} />
                        {/* <View> */}
                        <PickerIOS
                        selectedValue={this.state.versionNum}
                          onValueChange={(version) => { this.setState({versionNum: version}) }}>
                          {items.map((selectedValue) => (
                           
                            <PickerItemIOS
                              key={selectedValue}
                              value={selectedValue}
                              label={'Version ' + selectedValue + '.0'}
                            />
                          )
                          )}
                        </PickerIOS>
                        <View style={styles.singleRowIos} />
                        <TouchableOpacity onPress={() => {
                          this.setState({
                            isVersionModalShow: false,
                            versionNum: iosPickerSelectedValue
                          })
                        }}>
                          <Text style={styles.textConfirmPicker}>Confirm</Text>
                        </TouchableOpacity>
                        {/* </View> */}
                      </View>

                      <View style={{ marginTop: 20, borderRadius: 5, backgroundColor: 'white' }}>
                        <TouchableOpacity onPress={() => this.setState({ isVersionModalShow: false })}>
                          <Text style={styles.textCancelPicker}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                    </View> :
                      <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                        <FlatList
                          data={challenge.type.planTypeData ? challenge.type.planTypeData : []}
                          renderItem={this.renderItem}
                          keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 10 }}>
                          {/* <TouchableOpacity onPress={() => {
                          this.setState({ isVersionModalShow: false })
                        }}>
                          <Text style={styles.textAlert}>Cancel</Text>
                        </TouchableOpacity > */}

                          <TouchableOpacity onPress={() => {
                            this.setState({ isVersionModalShow: false })
                          }}>
                            <Text style={styles.textAlert}>Ok</Text>
                          </TouchableOpacity>
                        </View>
                      </View>}
                  </Modal1>
                  : null
                }
              </ChallengeTypeContainer>


              {/* <Program
              onPress={(typeProgram) => {
                this.onPressNext({
                  call: () => {
                    this.HeaderRef.next();
                    this.onChangeChallenge({typeProgram});
                  },
                });
              }}
            />               */}
            </ScrollView>

            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity style={styles.bottomConfirmBox} onPress={() => {
                let version = this.state.versionNum;
                this.onChangeChallenge({ version });
                this.onPressNext({});
                this.saveVersion();
              }}>
                <Text style={styles.confirmPlanText}>Confirm Plan</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width, width * 2],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width, width * 2],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width, width * 2],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              {
                transform: [{ translateY }, { translateX }, { scale }],
                flex: 1,
              },
            ]}>
            <ScrollView
              // showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.contentContainerStyle, { flexGrow: 1 }]}>
              <View>

                <View style={styles.titleContainer}>
                  <Text style={styles.itemHeaderText}>Perfect!</Text>
                  <Text style={styles.titles}>Just a few more {'\n'} small details</Text>
                </View>
                <Title
                  ref={(e) => (this.TitleRef = e)}
                  challenge={challenge}
                  onChangeText={(title) => this.onChangeChallenge({ title })}
                />
                <Description
                  challenge={challenge}
                  onChangeText={(description) =>
                    this.onChangeChallenge({ description })
                  }
                />
              </View>
            </ScrollView>
            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity style={styles.bottomConfirmBox} onPress={() => this.onPressNext({})}>
                <Text style={styles.confirmPlanText}>Next</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 2, width * 3],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 2, width * 3],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 2, width * 3],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              styles.contentContainerStyle,
              {
                transform: [{ translateY }, { translateX }, { scale }],
                flex: 1,
              },
            ]}>
            <View style={styles.titleContainer}>
              <Text style={styles.itemHeaderText}>Awesome!</Text>
              <Text style={styles.titles}>Who can have access to {'\n'} this Challenge?</Text>
            </View>
            <Access
              challenge={challenge}
              onChangeSwitch={(value) =>
                this.onChangeChallenge({ public: value })
              }
            />
            <TouchableWithoutFeedback
              onPress={() => challenge.public !== null && this.onPressNext({})}>
              <View
                style={[
                  styles.nextButton,
                  challenge.public === null ? { backgroundColor: '#96AAC6' } : {},
                ]}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 3, width * 4],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 3, width * 4],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 3, width * 4],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={{
              transform: [{ translateY }, { translateX }, { scale }],
              // paddingTop: 100,
              flex: 1,
            }}>
            <ScrollView>
              <View style={{
                paddingTop: 100,
                // flex: 1,
              }}>

                <View style={styles.titleContainer}>
                  <Text style={styles.itemHeaderText}>It's a date!</Text>
                  <Text style={styles.titles}>
                    When would you like to{'\n'}start the challenge?
              </Text>
                </View>
                <StartDate
                  challenge={challenge}
                  onPress={(startDate) => {
                    this.onChangeChallenge({ startDate });
                  }}
                />
              </View>
            </ScrollView>
            <TouchableWithoutFeedback
              onPress={() =>
                challenge.startDate !== null && this.onPressNext({})
              }>
              <View
                style={[
                  styles.nextButton,
                  challenge.startDate === null
                    ? { backgroundColor: '#96AAC6' }
                    : {},
                ]}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 4, width * 5],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 4, width * 5],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 4, width * 5],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={{
              transform: [{ translateY }, { translateX }, { scale }],
              flex: 1,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.contentContainerStyle,
                { paddingHorizontal: 7.5, paddingBottom: 60 },
              ]}>
              <View style={styles.titleContainer}>
                <Text style={styles.itemHeaderText}>Lookin' good!</Text>
                <Text style={styles.titles}>Choose a header for {'\n'} your challenge:</Text>
              </View>
              <Graphic
                challenge={challenge}
                onPress={(graphic) => {
                  this.onChangeChallenge({ graphic });
                }}
              />
            </ScrollView>
            <TouchableWithoutFeedback
              onPress={() =>
                challenge.graphic !== null && this.onPressNext({})
              }>
              <View
                style={[
                  styles.nextButton,
                  challenge.graphic === null
                    ? { backgroundColor: '#96AAC6' }
                    : {},
                ]}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 5, width * 6],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 5, width * 6],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 5, width * 6],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={{
              transform: [{ translateY }, { translateX }, { scale }],
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AllSet
              user={this.props.user}
              challenge={challenge}
              loading={this.state.loading}
              createChallenge={this.createChallenge}
              closeCreateNew={this.closeCreateNew}
              createdChallenge={this.state.createdChallenge}
            />
          </Animated.View>
        );
      },
    ];
    data = data.map((v, i) => {
      const index = this.state.renderList.indexOf(i);
      if (index === -1) {
        return () => {
          return <View />;
        };
      }
      return v;
    });
    return (
      <Carousel
        keyboardShouldPersistTaps={'never'}
        ref={(e) => (this.CarouselRef = e)}
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => {
          return item();
        }}
        sliderWidth={width}
        sliderHeight={height - 100}
        itemWidth={width}
        itemHeight={height - 100}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.7}
        onSnapToItem={this.onSnapItem}
        inactiveSlideShift={0}
      />
    );
  };
  renderItem = (item, index) => {

    const { challenge } = this.state;
    let stringVersion = "Version " + item.item.version + ".0"; // For setting version value

    return (
      <View style={{}}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}
          onPress={() => {

            for (let loopCount = 0; loopCount < challenge.type.planTypeData.length; loopCount++) {
              const element = challenge.type.planTypeData[loopCount];


              if (String(element.version) === String(item.item.version)) {
                element.isSelected = true;

                this.setState({ versionNum: item.item.version });

              } else {
                element.isSelected = false;
              }
              challenge.type.planTypeData[loopCount] = element;
            }
          }
          }
        >
          <Text style={styles.textVersion}>{stringVersion}</Text>

          <View style={{
            width: radioButtonSize,
            height: radioButtonSize,
            borderRadius: radioButtonSize / 2,
            borderColor: 'gray',
            borderWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            {(item.item.isSelected && item.item.isSelected) || (this.state.versionNum === String(item.item.version)) ? <View style={styles.viewSelected} />
              :
              <View style={styles.viewNotSelected} />}


          </View>
        </TouchableOpacity>

        <View style={styles.singleRow} />
      </View>
    )
  }
  render() {
    const { challenge } = this.state;
    return (

      <Modal
        ref={(e) => (this.CreateNewRef = e)}
        // popupHeight={height}
        header={
          <Header
            ref={(e) => (this.HeaderRef = e)}
            challenge={challenge}
            onPressBack={this.onPressBack}
            onPressNext={this.onPressNext}
            closeCreateNew={this.closeCreateNew}
          />
        }>
        {this.renderChildren()}
      </Modal>



    );
  }
}

const mapStateToProps = state => {
  console.log(" state in proos ----->>", state);
  return {}
};


// export default connect(
//   mapStateToProps,
//   null,
//   { forwardRef: true },
// )(Component);


export default connect(
  ({ user }) => ({
    user,
  }),
  null,
  null,
  { forwardRef: true },
)(Component);


const styles = EStyleSheet.create({
  textPickerTitle: {
    color: 'gray',
    fontSize: 16,
    alignSelf: 'center',
    padding: 15,
  },

  textCancelPicker: {
    color: 'rgb(3, 132, 255)',
    alignSelf: 'center',
    padding: 15,
    fontWeight: '700',
    fontSize: 18,
  },

  textConfirmPicker: {
    color: 'rgb(3, 132, 255)',
    alignSelf: 'center',
    padding: 15,
    fontWeight: '500',
    fontSize: 18,
  },
  nextButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
  },
  singleRowIos:{
    backgroundColor: 'lightgray',
    width: '100%',
    alignSelf: 'center',
    height: 1
  },
  singleRow: {
    backgroundColor: 'lightgray',
    width: '110%',
    alignSelf: 'center',
    height: 1
  },
  textAlert: {
    padding: 5,
    fontWeight: "700",
    fontSize: 18
  },
  textVersion: {
    fontSize: 18,
    fontWeight: "400"
  },
  viewSelected: {
    width: radioButtonSize / 2,
    height: radioButtonSize / 2,
    borderRadius: radioButtonSize / 4,
    // borderColor: 'gray',
    backgroundColor: 'rgb(24, 154, 201)',
    // borderWidth: 0.5,

  },
  viewNotSelected: {
    width: radioButtonSize / 2,
    height: radioButtonSize / 2,
    borderRadius: radioButtonSize / 4,
    // borderColor: 'gray',
    backgroundColor: 'white',
    // borderWidth: 0.5,
  },

  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
  nextButton: {
    position: 'absolute',
    paddingVertical: 15,
    backgroundColor: '$lightBlue',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 0,
  },
  chooseVersion: {
    marginTop: 30,
    color: '#000000',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Poppins-Bold',
  },
  challengeDescription: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color: "#96AAC6"
  },
  programPicture: {
    height: 200,
    width: "100%",
  },
  programPictureContainer: {
    width: "100%",
    borderRadius: 13,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: "#ffffff"
  },
  descriptionBody: {
    width: "100%",
    alignItems: "flex-start",
    paddingLeft: 25,
    paddingTop: 25,
  },
  versionBox: {
    width: "100%",
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#F0F5FA"
  },
  versionsTextBox: {
    flex: 1,
    flexDirection: "row"
  },
  versionText: {
    color: "#21293D",
    fontWeight: "bold",
    marginRight: 15,
    marginTop: 3
  },
  versionRecommendedBox: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 10,
    backgroundColor: "#E9F6FF"
  },
  versionRecommended: {
    color: "#1AA0FF",
    fontSize: 12
  },
  editButton: {
    marginRight: 10
  },
  bottomButtonContainer: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  bottomConfirmBox: {
    width: "100%",
    backgroundColor: "#1ca0ff",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    // marginTop:height-658,
  },
  confirmPlanText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  confirmButton: {
    backgroundColor: "#445533"
  },
  versionListBox: {
    width: "100%",
    paddingTop: 12,
    marginTop: height - 755,
  },
  versionList: {
    width: "100%",
    backgroundColor: "#d1d5db",
    height: 150,
    paddingTop: 15
  },
  versionsBox: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 5
  },
  versionsText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  checkIcon: {
    position: "absolute",
    left: -35,
    top: 3
  },
  actionBox: {
    flexDirection: "row",
    marginBottom: 13
  },
  actionCancel: {
    flex: 1,
    marginLeft: 15
  },
  actionSet: {
    marginRight: 15
  },
  actionText: {
    color: "#62a3f7",
    fontWeight: "bold",
    fontSize: 17
  },
  backButton: { width: 40 },
  subTitles: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#6F80A7',
  },
  next: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  contentContainerStyle: {
    backgroundColor: '#F7F9FB',
    paddingHorizontal: 15,
    paddingBottom: 30,
    flexGrow: 1
  },
  titleContainer1: {
    alignItems: "flex-start",
  },
  titleContainer: {
    alignItems: "center",
  },
  titles: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  itemHeaderText: {
    fontSize: 16,
    marginBottom: 7,
    color: "#1AA0FF",
    fontFamily: 'Poppins-Bold',
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  closeButton: {},
});
