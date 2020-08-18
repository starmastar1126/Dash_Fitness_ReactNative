import React, { Component } from 'react';
import { StatusBar, AppRegistry, FlatList, Platform, View, Text, Dimensions, Animated, ImageBackground, Image } from 'react-native';

import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import Story from './Story';

const { width } = Dimensions.get('screen');
const height = Dimensions.get('screen').height - StatusBar.currentHeight;
const perspective = width;
const thumbnail_rest_inside_circuit = require('../../res/workout/rest_inside_circuit.png');
const thumbnail_rest_outside_circuit = require('../../res/workout/rest_outside_circuit.png');
const thumbnail_note_card = require('../../res/workout/note_thumbnail.png');
const thumbnail_old = require('../../res/list_image.png');

export default class NewStories extends Component {
    constructor(props) {
        super(props);
    }

    nextStory = () => {

        console.log(" in nextStory story ===", this.props.arrayCompleteData[this.currentStory]);

        if (this.currentStory === this.arrayCompleteData.length - 1) {
            Actions.Completed({ challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true })
            return;
        }

        this.currentStory = this.currentStory + 1;
        // If next video is empty 
        // if (this.props.stories[this.currentStory].videos.length > 0) {
        //     this.storiesItem[this.currentStory]?.current.countDown();
        //     this.scroll.current.scrollTo({
        //         x: this.currentStory * width,
        //         animated: true,
        //     });
        //     this.storiesItem[this.currentStory - 1]?.current.stop();
        // } else {
        //     Actions.Completed({ challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true })
        //     return;
        // }
    };

    prevStory = () => {

        console.log(" in pre story ===", this.currentStory);

        if (this.currentStory === 0) return;
        this.currentStory = this.currentStory - 1;
        // this.storiesItem[this.currentStory]?.current.countDown();
        // this.scroll.current.scrollTo({
        //     x: this.currentStory * width,
        //     animated: true,
        // });
        // this.storiesItem[this.currentStory + 1]?.current.stop();
    };

    render() {
        const { arrayCircuitData, arrayNormalData, dayTasks, challenge, user, stories } = this.props;

        let arrayView = [];
        {
            stories.map((item, index) => {
                let viewObject = <View style={{ backgroundColor: 'pink' }}>
                    <Text>Horizontal Page +{index}</Text>
                </View>
                arrayView.push(viewObject);
            })
        }


        return (
            <View style={{ flex: 1, }} >
                <CubeNavigationHorizontal ref={view => { this.cube = view; }}>

                <View style={[styles.container, {backgroundColor:'white'}]}>
                       <Image
                       source={thumbnail_note_card}
                       />
                    </View>

                    <View style={[styles.container, {backgroundColor:'white'}]}>
                        <Text style={styles.text}>Horizontal Page 2</Text>
                        <Image
                       source={thumbnail_note_card}
                       />
                    </View>
                   
                    <View style={[styles.container, {backgroundColor:'pink'}]}>
                        <Text style={styles.text}>Horizontal Page 3</Text>
                        <Image
                       source={thumbnail_note_card}
                       />
                    </View>

                    <View style={[styles.container, {backgroundColor:'white'}]}>
                    <Text style={styles.text}>Horizontal Page 4</Text>
                       <Image
                       source={thumbnail_note_card}
                       />
                    </View>
                </CubeNavigationHorizontal>
            </View>)

    }


    render1() {
        const { arrayCircuitData, arrayNormalData, dayTasks, challenge, user, stories } = this.props;

        console.log(" ccomlete data ----......", this.props);

        return (
            <View style={{ flex: 1, }} >
                <CubeNavigationHorizontal ref={view => { this.cube = view; }}>

                    {/* {stories.map((item, index) => {
                        
                            index === 0 ?
                            <Animated.View>
                                <Story
                                    //ref={this.storiesItem[i]}
                                    story={arrayCircuitData}
                                    isCircuit={item.isCircuit}
                                    dayTasks={this.props.dayTasks}
                                    nextStory={this.nextStory}
                                    prevStory={this.prevStory}
                                    arrayCircuitData={arrayCircuitData}
                                    arrayNormalData={arrayNormalData}
                                />
                            </Animated.View>
                            :
                            <Animated.View>
                                <Story
                                    //ref={this.storiesItem[i]}
                                    story={stories[index]}
                                    isCircuit={false}
                                    dayTasks={this.props.dayTasks}
                                    nextStory={this.nextStory}
                                    prevStory={this.prevStory}
                                    arrayCircuitData={arrayCircuitData}
                                    arrayNormalData={arrayNormalData}
                                />
                            </Animated.View>
                        
                    })} */}

                    <View style={[styles.container, { backgroundColor: '#5CDB8B' }]}>
                        <Text style={styles.text}>Horizontal Page 1</Text>
                    </View>
                    <View style={[styles.container, { backgroundColor: '#A3F989' }]}>
                        <Text style={styles.text}>Horizontal Page 2</Text>
                    </View>
                </CubeNavigationHorizontal>
            </View >
        );
    }
}

const styles = {
    text: {

    },
    container: {

    }
}