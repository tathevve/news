/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeRoute from '../screens/bottomPages/home/HomeRoute';
import SignIn, {isAuthenticated} from '../screens/signIn/SignIn';
import AccountRoute from '../screens/bottomPages/account/AccountRoute';
import CircularLoader from '../shared/Loader/CircularLoader';
import {EPath} from '../shared/models/enums/path.enum';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectIsLoading} from '../redux/slicers/app';
import ScreenLayout from '../layout/ScreenLayout';
import Ionicon from 'react-native-vector-icons/Ionicons';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = (): JSX.Element => (
  <Tab.Navigator
    initialRouteName={EPath.SIGNIN}
    screenOptions={{headerShown: false}}>
    <Tab.Screen
      name={EPath.HOME}
      component={HomeRoute}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={{color: focused ? 'black' : 'gray', fontSize: 13}}>
            Home
          </Text>
        ),
        tabBarIcon: ({focused}) => {
          return focused ? (
            <Ionicon name="home" size={22} />
          ) : (
            <Ionicon name="home-outline" size={20} />
          );
        },
      }}
    />
    {/* <Tab.Screen
      name={EPath.SIGNIN}
      component={SignIn}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={{color: focused ? 'black' : 'gray', fontSize: 13}}>
            sign
          </Text>
        ),
        tabBarIcon: ({focused}) => {
          return focused ? (
            <IconButton icon="eye" size={22} />
          ) : (
            <IconButton icon="home" size={20} />
          );
        },
      }}
    /> */}
    <Tab.Screen
      name={EPath.ACCOUNT}
      component={AccountRoute}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={{color: focused ? 'black' : 'gray', fontSize: 13}}>
            Me
          </Text>
        ),
        tabBarIcon: ({focused}) => {
          return focused ? (
            <Ionicon name="account" size={22} />
          ) : (
            <Ionicon name="account-outline" size={20} />
          );
        },
      }}
    />
  </Tab.Navigator>
);

const RootNavigator = (): JSX.Element => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    // Check authentication status when the app starts
    isAuthenticated().then(result => {
      setAuthenticated(result);
      // setLoading(false);
    });
  }, []);

  console.log(authenticated, 'is uth');
  return (
    <>
      {typeof authenticated === 'boolean' ? (
        <RootStack.Navigator
          initialRouteName={authenticated ? EPath.HOME : EPath.SIGNIN}
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 35,
            },
          }}>
          <RootStack.Screen
            name={EPath.HOME}
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={EPath.SIGNIN}
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      ) : (
        <Text>abo</Text>
      )}
    </>
  );
};

const Routes = (): JSX.Element => {
  const isLoading = useSelector(selectIsLoading);

  const generateScreen = useCallback((): JSX.Element => {
    return !isLoading ? (
      <>
        <RootNavigator />
      </>
    ) : (
      <Text>naaao</Text>
    );
  }, [isLoading]);

  return <ScreenLayout>{generateScreen()}</ScreenLayout>;
};

export default Routes;
