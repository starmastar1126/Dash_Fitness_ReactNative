import React from 'react';
import { StatusBar, View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Stories from './Stories';
import * as planActions from '../../actions/plans';

const thumbnail_rest_inside_circuit = require('../../res/workout/rest_inside_circuit.png');
const thumbnail_rest_outside_circuit = require('../../res/workout/rest_outside_circuit.png');
const thumbnail_note_card = require('../../res/workout/note_thumbnail.png');
const thumbnail_old = require('../../res/list_image.png');


export default class App extends React.Component {
  state = {
    ready: false,
    isModalOpen: true,
    stories: [],
    arrayVersionTask: []

  };

  componentDidMount() {
    this.setState({ ready: true });
  }

  render() {

    const { ready } = this.state;
    const {stories, arrayVersionTask} = this.props;

    console.log(" in work out ", this.props);
    if (!ready) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
      
        <Stories
          stories={stories} 
          dayTasks={arrayVersionTask}
          challenge={this.props.navigation.state.params.challenge}
          user={this.props.navigation.state.params.user} />

          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  modal: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flex: 1
  }
});
