import React from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import * as PostsActions from 'dash/src/actions/posts';

import WriteSomething from './WriteSomething';
import Post from './Post';

class Component extends React.Component {
  PopupPostRef;
  state = {
    loading: false,
    refresh: false,
  };
  componentDidMount = () => {
    this.getData(true);
  };
  getData = async (loading = false) => {
    try {
      this.setState({loading, refresh: true});
      await PostsActions.getPosts();
      this.setState({loading: false, refresh: false});
    } catch (e) {
      this.setState({loading: false, refresh: false});
    }
  };
  render() {
    const {user, challenge, PopupPostRef} = this.props;
    const posts = this.props.posts.filter(
      (v) => v.challengeId === challenge._id,
    );
    return (
      <>
        <LinearGradient
          colors={['#F0F5FA', '#FFFFFF']}
          useAngle={true}
          angle={72}
          style={styles.container}>
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={styles.contentContainerStyle}
            refreshControl={
              <RefreshControl
                colors={[EStyleSheet.value('$lightBlue')]}
                refreshing={this.state.refresh}
                onRefresh={this.getData}
              />
            }>
            <View style={styles.postsContainer}>
              {posts.map((value, index) => (
                <Post
                  key={index}
                  postId={value._id}
                  user={user}
                  onPressMenu={() => {
                    PopupPostRef.open();
                  }}
                />
              ))}
            </View>
          </ScrollView>
          {/* <TouchableWithoutFeedback
            onPress={() => Actions.CreatePost({challenge})}> */}
          <View style={styles.writeSomething}>
            <WriteSomething
              onPress={() => Actions.CreatePost({challenge})}
              onPressPhoto={() => {
                Actions.CreatePost({challenge, photo: true});
              }}
            />
          </View>
          {/* </TouchableWithoutFeedback> */}
        </LinearGradient>
      </>
    );
  }
}

export default connect(({posts}) => ({
  posts,
}))(Component);

const styles = EStyleSheet.create({
  writeSomething: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 90,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
    zIndex: 1,
  },
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 40,
  },
  postsContainer: {
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    paddingTop: 140,
  },
});

Component.defaultProps = {};
