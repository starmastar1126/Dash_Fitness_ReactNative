import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Actions} from 'react-native-router-flux';

import * as PostsActions from 'dash/src/actions/posts';

import {Comments, Like} from 'dash/src/components/Icons';
import {mediaHost} from 'dash/src/config';

import ActivityButton from './ActivityButton';
import Comment from './Comment';

const {width} = Dimensions.get('screen');

export default function Component(props) {
  const [like, setLike] = useState(null);
  const {
    user,
    value,
    showAllButton,
    onPressShowAll,
    allComments,
    blockComment,
  } = props;
  const goToPostPage = () => {
    if (!blockComment) {
      Actions.PostPage({postId: value._id, user});
    }
  };
  const userLike = value.commitData.find(
    (v) => v.commitUserId === user._id && v.commitTypes === 'like',
  );
  const onPressLike = async () => {
    try {
      if (userLike) {
        setLike('deleted');
        await PostsActions.deletePostCommit({
          editPostID: value._id,
          delCommitID: userLike.id,
        });
      } else {
        setLike(true);
        await PostsActions.addCommit({
          editPostID: value._id,
          commitIds: user._id,
          commitTypes: 'like',
          commitDetails: '',
        });
      }
    } catch (e) {
      console.log(e.message);
      console.log(e.response);
      setLike(null);
    }
  };
  const array = value.commitData.filter((v) => v.commitTypes !== 'like');
  return (
    <>
      <TouchableWithoutFeedback onPress={goToPostPage}>
        <View>
          <Text style={styles.postText}>{value.detail}</Text>
          {value.postImage && (
            <Image
              resizeMode="cover"
              source={{uri: `${mediaHost}${value.postImage}`}}
              style={styles.picture}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.activities}>
        <View style={styles.buttons}>
          <ActivityButton
            title="Cheer"
            icon={Like}
            onPress={onPressLike}
            enabled={like === 'deleted' ? false : like || userLike}
          />
          <ActivityButton
            enabled={blockComment}
            title="Comment"
            icon={Comments}
            onPress={goToPostPage}
          />
        </View>
        {array && array.length !== 0 && (
          <>
            <View style={styles.commentsContainer}>
              {allComments ? (
                array.map((v, i) => {
                  return <Comment key={i} value={v} />;
                })
              ) : (
                <Comment value={array[0]} />
              )}
            </View>
            {showAllButton && array.length !== 1 && !allComments && (
              <TouchableOpacity
                style={styles.seeAllCommentsContainer}
                onPress={onPressShowAll}>
                <Text style={styles.allCommentsText}>See All Comments</Text>
                <View style={styles.commentsCountContainer}>
                  <Text style={styles.commentsCount}>{array.length}</Text>
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </>
  );
}

const styles = EStyleSheet.create({
  postText: {
    marginHorizontal: 15,
    marginBottom: 15,
    color: '#292E3A',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  picture: {
    width: '100%',
    height: width - 30,
  },
  commentsCount: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 9,
    lineHeight: 12,
  },
  commentsCountContainer: {
    backgroundColor: '$lightBlue',
    height: 17,
    width: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    marginLeft: 10,
  },
  allCommentsText: {
    color: '$lightBlue',
    fontFamily: 'Poppins-Bold',
    lineHeight: 20,
  },
  seeAllCommentsContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#E9F6FF',
    borderRadius: 10,
    marginBottom: 15,
  },
  commentsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  activities: {
    borderTopWidth: 1,
    borderTopColor: '#F0F5FA',
  },
});

Component.defaultProps = {};
