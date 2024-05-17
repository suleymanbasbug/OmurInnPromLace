/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import store, {RootState} from '@app/store';
import {getTokenFromKeychain} from '@app/utils/keychain';
import {useMeMutation, useRefreshTokenMutation} from '@app/services/auth';
import {setToken, setUser} from '@app/store/userSlice';
import {getFcmToken, registerListenerWithFCM} from '@app/utils/fcmHelper';
import {useSubscribeToTopicsMutation} from '@app/services/notification';
import Tabbar from './components/Tabbar';
import Auth from './components/Auth';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

const NavigationHandler = () => {
  const [triggerRefreshToken] = useRefreshTokenMutation();
  const [triggerMe] = useMeMutation();
  const [triggerSubscribeToTopics] = useSubscribeToTopicsMutation();
  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );

  const isLoggedIn = !!access_token;

  useEffect(() => {
    const postLoginActions = async () => {
      const firebaseToken = await getFcmToken();
      if (firebaseToken) {
        await triggerSubscribeToTopics({token: firebaseToken})
          .unwrap()
          .then(res => {
            console.log('Subscribed to topics => ', res);
          })
          .catch(err => {
            console.log('Error subscribing to topics => ', err);
          });
      }
    };
    if (isLoggedIn) {
      postLoginActions();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    async function tryAutoLogin() {
      const tokenData = await getTokenFromKeychain();
      if (tokenData.access_token) {
        return await triggerRefreshToken({
          token: tokenData.access_token,
        }).unwrap();
      } else {
        throw 'No Refresh Token, revert to biometric login';
      }
    }

    async function progressiveLogin(): Promise<void> {
      try {
        const tokenResult = await tryAutoLogin();
        store.dispatch(setToken(tokenResult));
        if (tokenResult) {
          const meResult = await triggerMe().unwrap();
          store.dispatch(setUser(meResult));
        }
      } catch {
        SplashScreen.hide();
      }
    }
    progressiveLogin().finally(() => {
      SplashScreen.hide();
    });
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return useMemo(() => {
    return isLoggedIn ? <Tabbar /> : <Auth />;
  }, [isLoggedIn]);
};

export default () => {
  return (
    <NavigationContainer>
      <NavigationHandler />
    </NavigationContainer>
  );
};
