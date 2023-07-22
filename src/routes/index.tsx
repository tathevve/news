/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeRoute from '../screens/bottomPages/home/HomeRoute';
import SignIn from '../screens/signIn/SignIn';
import AccountRoute from '../screens/bottomPages/account/AccountRoute';
import CircularLoader from '../shared/Loader/CircularLoader';
import {EPath} from '../shared/models/enums/path.enum';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectIsLoading} from '../redux/slicers/app';
import ScreenLayout from '../layout/ScreenLayout';


const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = (): JSX.Element => (
  <Tab.Navigator
    initialRouteName={EPath.HOME}
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
            <IconButton icon="eye" size={22} />
          ) : (
            <IconButton icon="home" size={20} />
          );
        },
      }}
    />
    <Tab.Screen
      name={EPath.ACCOUNT}
      component={AccountRoute}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={{color: focused ? 'black' : 'gray', fontSize: 13}}>
            Me
          </Text>
        ),
        // tabBarIcon: ({focused}) => {
        //   return focused ? (
        //     <IconButton icon="account" size={22} />
        //   ) : (
        //     <IconButton icon="account-outline" size={20} />
        //   );
        // },
      }}
    />
  </Tab.Navigator>
);

const RootNavigator = (): JSX.Element => {
  return (
    <RootStack.Navigator
      initialRouteName={EPath.PARENTHOME}
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
        name={EPath.PARENTHOME}
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
        <Text>no</Text>
    );
  }, [isLoading]);

  return <ScreenLayout>{generateScreen()}</ScreenLayout>;
};

export default Routes;
