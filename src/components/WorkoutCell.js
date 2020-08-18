import React, { Component } from 'react';
import { StyleSheet, View, Text, Image,Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
const {height,width} = Dimensions.get('window');
class WorkoutCell extends Component {
    videoPlayer;
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'content',
        };
    }
    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };
    onPaused = playerState => {
        //Handler for Video Pause
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };
    onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };
    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };
    onLoad = data => this.setState({ duration: data.duration, isLoading: false });
    onLoadStart = data => this.setState({ isLoading: true });
    // onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
    onEnd = () => {
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    }
    onError = () => alert('Oh! ', error);
    exitFullScreen = () => {
        alert('Exit full screen');
    };
    enterFullScreen = () => {};
    onFullScreen = () => {
        if (this.state.screenType == 'content')
            this.setState({ screenType: 'cover' });
        else 
            this.setState({ screenType: 'content' });
    };
    renderToolbar = () => (
        <View>
          <Text> toolbar </Text>
        </View>
    );
    onSeeking = currentTime => this.setState({ currentTime });
    render() {
        // if (this.props.isVideo) {
        //     console.log("true")
        // } else {
        //     console.log("false")
        // }
        return (
            <View style={styles.contentView}>
                    
                    {/* // <MediaControls
                    //     duration={this.state.duration}
                    //     isLoading={this.state.isLoading}
                    //     mainColor="#333"
                    //     onFullScreen={this.onFullScreen}
                    //     onPaused={this.onPaused}
                    //     onReplay={this.onReplay}
                    //     onSeek={this.onSeek}
                    //     onSeeking={this.onSeeking}
                    //     playerState={this.state.playerState}
                    //     progress={this.state.currentTime}
                    //     toolbar={this.renderToolbar()}
                    // /> */}
                    {/* <Image source={require('../res/workoutimage.png')} resizeMode="cover" style={styles.image}/> */}
                {
                    this.props.isVideo ?
                        <Video
                        onEnd={this.onEnd}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                        paused={this.state.paused}
                        ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                        resizeMode="cover"
                        // onFullScreen={this.state.isFullScreen}
                        // source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
                        source={require('../res/video/Jump-Squat.mp4')}
                        style={styles.mediaPlayer}
                        volume={10}
                        />
                    :
                        <Image source={require('../res/workoutimage.png')} resizeMode="cover" style={styles.image}/>
                    
                }
                
                <View style={{height:111, width:"100%", marginTop:0}}>
                    <LinearGradient colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)"]} style={styles.linearGradient}>
                        <Text style={styles.exercise}>{this.props.exercise}</Text>
                    </LinearGradient>
                </View>
                <View style={{height:78, width:"100%", bottom:0, flex:1, position: "absolute"}}>
                    <LinearGradient colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]} style={styles.linearGradient}>
                        <Text style={styles.time}>{this.props.time}</Text>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}
export default WorkoutCell;

WorkoutCell.propTypes = {
    exercise: PropTypes.string,
    time: PropTypes.string,
    isVideo: PropTypes.bool
}

WorkoutCell.defaultProps = {
    exercise: "Exercise name",
    time: "00:00",
    isVideo: false
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1, 
       // borderBottomRightRadius: 34,
       // borderBottomLeftRadius: 34, 
        backgroundColor: "#F0F5FA",
       
        height:width * 1.2,
        overflow:"hidden"
    },
    linearGradient: {
        flex: 1,
        // borderRadius: 8
    },
    exercise: {
        marginTop: 20,
        marginLeft: 17,
        marginRight: 17,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 24,
        color: "#FFFFFF"
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute"
    },
    time: {
        marginLeft: 17,
        marginBottom: 32,
        marginRight: 17,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 30,
        color: "#FFFFFF"
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
      },
});