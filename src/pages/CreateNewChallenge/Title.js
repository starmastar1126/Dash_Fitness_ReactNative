import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Switch} from 'react-native-switch';

import Input from 'dash/src/components/Input';

export default class extends React.Component {
  inputRef;
  focus = () => {
    this.inputRef.focus()
  };
  render() {
    const {challenge, onChangeSwitch, onChangeText} = this.props;
    return (
      <>
        <Input
          currentRef={(e) => (this.inputRef = e)}
          value={challenge.title}
          onChangeText={onChangeText}
          placeholder="Title"
          blurOnSubmit={false}
        />
        {/* <View style={styles.container}>
          <View style={styles.publicTextContainer}>
            <Text style={styles.publicText}>
              Public{' '}
              {challenge.public ? (
                <Text style={{color: '#1AA0FF'}}>ON</Text>
              ) : (
                <Text style={{color: '#6F80A7'}}>OFF</Text>
              )}
            </Text>
          </View>
          <Text style={styles.info}>
            {challenge.public
              ? 'Anyone can join your challenge.'
              : 'Only people you invite can join.'}
          </Text>
          <Switch
            value={challenge.public}
            onValueChange={onChangeSwitch}
            disabled={false}
            circleSize={30}
            circleBorderWidth={1}
            barHeight={30}
            backgroundActive={'#1AA0FF'}
            backgroundInactive={'#96AAC6'}
            circleActiveColor={'white'}
            circleInActiveColor={'white'}
            circleActiveBorderColor={'#1AA0FF'}
            circleInactiveBorderColor={'#96AAC6'}
            changeValueImmediately={true}
            innerCircleStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2}
            switchRightPx={2}
          />
        </View> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    color: '#6F80A7',
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  container: {
    alignItems: 'center',
  },
  publicText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  publicTextContainer: {
    marginTop: 25,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
