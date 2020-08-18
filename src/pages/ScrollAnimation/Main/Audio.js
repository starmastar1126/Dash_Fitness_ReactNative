import React from 'react';
import {View, StyleSheet} from 'react-native';

import Sound from 'react-native-sound';
import _ from 'lodash';

export default class extends React.Component {
  audioExcercises;
  audioSeconds;
  currentPlayItem;

  pausedItem;

  setAudio = (item, callback = () => {}) => {
    this.currentPlayItem = item;
    if (this.audioExcercises) {
      this.audioExcercises.stop();
      this.audioSeconds.stop();
      this.audioExcercises.release();
      this.audioSeconds.release();
    }

    this.audioExcercises = new Sound(
      item.audioExcercises,
      (error) => {
        if (error) {
          console.log('failed to load the sound audioExcercises', error);
          return;
        }
        this.audioSeconds = new Sound(
          item.audioSeconds,
          (error) => {
            if (error) {
              console.log('failed to load the sound audioSeconds', error);
              return;
            }
            if (this.props.muted) {
              this.mute();
            } else {
              this.unmute();
            }
            callback();
          },
        );
      },
    );
  };

  play = (callback = () => {}) => {
    this.audioExcercises.play((success) => {
      if (success) {
        this.audioSeconds.play((success) => {
          if (success) {
            callback();
          } else {
          }
        });
      } else {
      }
    });
  };

  continue = (item, callbackNewItem = () => {}, callbackOldItem = () => {}) => {
    if (_.isEqual(item, this.currentPlayItem)) {
      this.audioExcercises.setCurrentTime(
        this.pausedItem.audioExcercises.seconds,
      );
      this.audioSeconds.setCurrentTime(this.pausedItem.audioSeconds.seconds);
      this.play();
      callbackOldItem();
    } else {
      callbackNewItem();
    }
  };

  pause = () => {
    this.audioExcercises.getCurrentTime((seconds, isPlaying) => {
      const audioExcercises = {seconds, isPlaying};
      this.audioSeconds.getCurrentTime((seconds, isPlaying) => {
        const audioSeconds = {seconds, isPlaying};
        this.pausedItem = {audioExcercises, audioSeconds};
        this.audioExcercises.pause();
        this.audioSeconds.pause();
      });
    });
  };

  mute = () => {
    this.audioExcercises.setVolume(0);
    this.audioSeconds.setVolume(0);
  };

  unmute = () => {
    this.audioExcercises.setVolume(1);
    this.audioSeconds.setVolume(1);
  };

  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({});
