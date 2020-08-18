import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as userActions from 'dash/src/actions/user';

class Component extends React.Component {
  TextInputRef;
  state = {
    username: '',
    loading: false,
  };
  componentDidMount() {
    if (this.TextInputRef) {
      setTimeout(() => {
        this.TextInputRef.focus();
      }, 150);
    }
  }
  createAccount = async () => {
    try {
      const {username} = this.state;
      const {userInfo, callback, user} = this.props;
      this.setState({loading: true});
      const res = await userActions.editUser({
        ...user,
        username,
        editUserID: user._id,
      });
      if (callback) {
        callback();
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };
  render() {
    const {username} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Pick a Username</Text>
          <Text style={styles.text}>Choose a username so</Text>
          <Text style={styles.text}>your friends can quickly find you.</Text>
        </View>
        <View style={{marginHorizontal: 15}}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={(e) => (this.TextInputRef = e)}
              value={username}
              onChangeText={(username) => this.setState({username})}
              style={styles.textInput}
              placeholder="Username"
            />
          </View>
        </View>
        <Text style={styles.alreadyExist}>
          {/* This username is already taken */}
        </Text>
        <View style={{marginHorizontal: 15}}>
          <TouchableOpacity
            style={styles.CreateContainer}
            onPress={this.createAccount}>
            <Text style={styles.CreateText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(({user}) => ({
  user,
}))(Component);

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0EAF3',
    backgroundColor: 'white',
  },
  textInput: {
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alreadyExist: {
    width: '100%',
    textAlign: 'center',
    color: '#FF2272',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginVertical: 10,
  },
  CreateText: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  CreateContainer: {
    borderRadius: 10,
    backgroundColor: '#00A1FF',
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    color: '#6F80A7',
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  title: {
    color: '#292E3A',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
