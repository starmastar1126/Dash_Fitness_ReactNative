import * as React from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  View,
  StatusBar,
} from 'react-native';

import Story from './Story';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('screen');
const height = Dimensions.get('screen').height - StatusBar.currentHeight;
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

export default class Stories extends React.PureComponent {
  stories = [];
  currentStory = 0;
  state = {
    x: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.scroll = React.createRef();
    this.storiesContainer = React.createRef();
    this.stories = props.stories.map(() => React.createRef());
    this.storiesItem = props.stories.map(() => React.createRef());
  }

  async componentDidMount() {
    const { x } = this.state;
    await x.addListener(() =>
      this.stories.forEach((story, index) => {
        const offset = index * width;
        const inputRange = [offset - width, offset + width];
        const translateX = x
          .interpolate({
            inputRange,
            outputRange: [width / ratio, -width / ratio],
            extrapolate: "clamp"
          })
          .__getValue();

        const rotateY = x
          .interpolate({
            inputRange,
            outputRange: [`${angle}rad`, `-${angle}rad`],
            extrapolate: "clamp"
          })
          .__getValue();

        const parsed = parseFloat(
          rotateY.substr(0, rotateY.indexOf("rad")),
          10
        );
        const alpha = Math.abs(parsed);
        const gamma = angle - alpha;
        const beta = Math.PI - alpha - gamma;
        const w = width / 2 - ((width / 2) * Math.sin(gamma)) / Math.sin(beta);
        const translateX2 = parsed > 0 ? w : -w;

        const style = {
          transform: [
            { perspective },
            { translateX },
            { rotateY },
            { translateX: translateX2 }
          ]
        };
        story.current.setNativeProps({ style });
      })
    );
  }

  _handleSwipeLeftRight = () => {
    alert("swipe");
  };

  nextStory = () => {

    console.log(" in nextStory story ===",  this.props.stories[this.currentStory]);
  
    if (this.currentStory === this.stories.length - 1) {
      Actions.Completed({challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true})
      return;
    }

    this.currentStory = this.currentStory + 1;
// If next video is empty 
    if (this.props.stories[this.currentStory].videos.length>0) {
      this.storiesItem[this.currentStory]?.current.countDown();
      this.scroll.current.scrollTo({
        x: this.currentStory * width,
        animated: true,
      });
      this.storiesItem[this.currentStory - 1]?.current.stop();
    }else{
      Actions.Completed({challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true})
      return;
    }

   
  };

  prevStory = () => {

    console.log(" in pre story ===", this.currentStory);

    if (this.currentStory === 0) return;
    this.currentStory = this.currentStory - 1;
    this.storiesItem[this.currentStory]?.current.countDown();
    this.scroll.current.scrollTo({
      x: this.currentStory * width,
      animated: true,
    });
    this.storiesItem[this.currentStory + 1]?.current.stop();
  };
  
  render() {
    const { x, ready } = this.state;
    const { stories } = this.props;

    return (
      <View style={styles.container}>
        
        {stories
          .map((story, i) => (
            <Animated.View
              ref={this.stories[i]}
              style={StyleSheet.absoluteFill}
              key={story.id}
            >
               <Story
                    ref={this.storiesItem[i]}
                    story={story}
                    isCircuit={story.type === 'circuit' ? true : false}
                    dayTasks={this.props.dayTasks}
                    nextStory={this.nextStory}
                    prevStory={this.prevStory}
                  />
              
            </Animated.View>
          ))
          .reverse()}
        <Animated.ScrollView
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          contentContainerStyle={{ width: width * stories.length }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          decelerationRate={0.99}
          horizontal
        />
      </View>
    );
  }

  render1()
   {
    const { x } = this.state;
    const { stories } = this.props;
      console.log(" stories ,me ", this.props.stories ); 
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          onMomentumScrollEnd={(e) => {
            const prevStoryIndex = this.currentStory;
            const nextStory = Math.ceil(e.nativeEvent.contentOffset.x / width);
            if (nextStory !== prevStoryIndex) {
              this.currentStory = nextStory;
              this.storiesItem[this.currentStory]?.current.countDown();
              this.storiesItem[prevStoryIndex]?.current.stop();
            }
          }}
          contentContainerStyle={{ width: width * stories.length }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          decelerationRate={0.99}
          horizontal>
         
          <View
           ref={this.storiesContainer}
            style={{
              position: 'absolute',
              width,
              height,
              
            }}>
            {stories
              .map((story, i) => (
                <Animated.View
                  ref={this.stories[i]}
                  style={{ ...StyleSheet.absoluteFillObject, width, height }}
                  key={story.id}>
                  <Story
                    ref={this.storiesItem[i]}
                    story={story}
                    isCircuit={story.flag === 'circuit' ? true : false}
                    dayTasks={this.props.dayTasks}
                    nextStory={this.nextStory}
                    prevStory={this.prevStory}
                  />
                </Animated.View>
              ))
               .reverse()
              }
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
