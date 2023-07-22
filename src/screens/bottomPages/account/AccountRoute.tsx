import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setUserData} from '../../../redux/slicers/loginSlice';
import {useState, useCallback} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {List} from 'react-native-paper';
import {EPath} from '../../../shared/models/enums/path.enum';

const AccountRoute = (): JSX.Element => {

  return (
    <ScrollView style={styles.root}>
      <View style={styles.rootContainer}>
        <Text>hello</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  rootContainer: {
    display: 'flex',
    marginLeft: 17,
    marginRight: 17,
  },
  typesText: {
    fontWeight: '900',
    fontSize: 18,
    fontFamily: 'Mulish',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  text: {
    marginBottom: 15,
  },
  sectionHeader: {
    fontWeight: '900',
    fontSize: 17,
    fontFamily: 'Mulish',
  },
  textStyle: {
    marginBottom: 15,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 17,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '100%',
    height: 35,
    marginTop: 35,
    borderStyle: 'solid',
    color: 'black',
    marginBottom: 15,
  },
});

export default AccountRoute;
