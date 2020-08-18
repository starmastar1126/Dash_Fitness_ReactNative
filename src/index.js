import React, {useState, useEffect} from 'react';
import {SafeAreaView, Keyboard} from 'react-native';
import {Router, Scene, Reducer} from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';

import {Provider} from 'react-redux';
import store from './store';

import AuthPopup from 'dash/src/components/AuthPopup';

import PlanExploration from './pages/PlanExploration';
import Main from './pages/Main';
import MyChallenges from './pages/MyChallenges';

import CameraRoll from './pages/CameraRoll';
import CustomTabBar from './pages/CustomTabBar';
import InviteFriendsToDash from './pages/InviteFriendsToDash';
import InviteToChallenge from './pages/InviteToChallenge';
import ScrollAnimation from './pages/ScrollAnimation';
import Notifications from './pages/Notifications';
import PastChallenges from './pages/PastChallenges';
import Explore from './pages/Explore';
import ExplorePost from './pages/Explore/ExplorePost';
import AccountInformation from './pages/AccountInformation';
import PickAUsername from './pages/PickAUsername';
import ChallengeDetail from './pages/ChallengeDetail';
import InviteFriends from 'dash/src/pages/ChallengeDetail/InviteFriends';

import PostPage from 'dash/src/pages/ChallengeDetail/Social/PostPage';
import CreatePost from 'dash/src/pages/ChallengeDetail/Social/CreatePost';
import Completed from './pages/Workout/Completed';

import Workout from 'dash/src/pages/Workout/index';

// Profile
import Profile from './pages/Profile';
import Friends from './pages/Profile/Friends';

// MyChallenges
import ProfileDetailPopup from './pages/MyChallenges/ProfileDetailPopup';

import * as settingsActions from 'dash/src/actions/settings';
import * as userActions from 'dash/src/actions/user';
import NewView from './pages/Workout/NewView';

import themes from './themes';
EStyleSheet.build(themes.light);

export let AuthPopupRef;
export let ProfileDetailPopupRef;
export let InviteFriendsRef;

const createReducer = (params) => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    store.dispatch(action);
    return defaultReducer(state, action);
  };
};

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      const data = await settingsActions.getStorage();
      if (data.user) {
        userActions.getCurrentUser();
      }
      setLoading(false);
     
    };
    init();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        {!loading && (
          <>
            <Router createReducer={createReducer}>
              <Scene key="root" hideNavBar>
              {/* <Scene 
                     initial 
                     key="HomePage1" 
                     component={NewView} 
                      /> */}
                <Scene
                    initial
                  key="HomePage"
                  tabs={true}
                  tabBarComponent={CustomTabBar}>
                   
                  <Scene key="MyProfile">
                    <Scene key="Profile" component={Profile} hideNavBar />
                    <Scene key="Friends" component={Friends} hideNavBar />
                    <Scene
                      key="Notifications"
                      component={Notifications}
                      hideNavBar
                    />
                  </Scene>
                  <Scene key="MyChallengesTab" initial>
                    <Scene
                      key="Challenges"
                      component={MyChallenges}
                      hideNavBar
                    />
                  </Scene>
                  <Scene key="ExploreTab">
                    <Scene key="Explore" component={Explore} hideNavBar />
                  </Scene>
                </Scene>
                <Scene
                  key="PlanExploration"
                  type="reset"
                  component={PlanExploration}
                  hideNavBar
                />
                <Scene
                  key="InviteToChallenge"
                  component={InviteToChallenge}
                  hideNavBar
                />
                <Scene
                  key="PastChallenges"
                  component={PastChallenges}
                  hideNavBar
                />
                <Scene key="Main" component={Main} hideNavBar />
                <Scene
                  key="ScrollAnimation"
                  component={ScrollAnimation}
                  hideNavBar
                />
                <Scene key="ExplorePost" component={ExplorePost} hideNavBar />
                <Scene
                  key="PickAUsername"
                  component={PickAUsername}
                  hideNavBar
                />
                <Scene
                  key="InviteFriendsToDash"
                  component={InviteFriendsToDash}
                  hideNavBar
                />
                <Scene
                  key="AccountInformation"
                  component={AccountInformation}
                  hideNavBar
                />
                <Scene key="CameraRoll" component={CameraRoll} hideNavBar />
                <Scene
                  key="ChallengeDetail"
                  component={ChallengeDetail}
                  hideNavBar
                />
                <Scene key="PostPage" component={PostPage} hideNavBar />
                <Scene key="CreatePost" component={CreatePost} hideNavBar />
                <Scene key="Workout" component={Workout} hideNavBar />
                <Scene key="Completed" component={Completed} hideNavBar />
              </Scene>
            </Router>
            <ProfileDetailPopup ref={(e) => (ProfileDetailPopupRef = e)} />
            <AuthPopup ref={(e) => (AuthPopupRef = e)} />
            <InviteFriends ref={(e) => (InviteFriendsRef = e)} />
          </>
        )}
      </Provider>
    </SafeAreaView>
  );
};
