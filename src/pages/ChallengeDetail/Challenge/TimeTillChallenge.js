import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {TimeDots} from '../../../components/Icons';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    const {startDate} = this.props.challenge;
    const current = new Date().getTime();
    const challengeTime = new Date(startDate).getTime();
    const timer = challengeTime - current;
    this.state = {
      timer,
    };
  }

  componentDidMount() {
    const {startDate} = this.props.challenge;
    this.timer = setInterval(() => {
      const current = new Date().getTime();
      const challengeTime = new Date(startDate).getTime();
      const timer = challengeTime - current;
      this.setState({timer});
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const {timer} = this.state;
    const days = Math.floor(timer / (24 * 60 * 60 * 1000)),
      minutes = Math.floor((timer / (1000 * 60)) % 60),
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Time till Challenge!</Text>
        <View style={styles.clockContainer}>
          <Text style={styles.text}>{days < 10 ? `0${days}` : days}</Text>
          <TimeDots />
          <Text style={styles.text}>{hours < 10 ? `0${hours}` : hours}</Text>
          <TimeDots />
          <Text style={styles.text}>
            {minutes < 10 ? `0${minutes}` : minutes}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>Days</Text>
          <Text style={styles.time}>Hours</Text>
          <Text style={styles.time}>Mins</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  time: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#6F80A7',
    fontFamily: 'Poppins-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  clockContainer: {
    borderRadius: 20,
    backgroundColor: '#f7f9fb',
    borderWidth: 1,
    borderColor: '#E0EAF3',
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  container: {
    borderTopWidth: 1,
    borderTopColor: '#F0F5FA',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
    paddingHorizontal: 15,
    paddingVertical: 40,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

Component.defaultProps = {};
