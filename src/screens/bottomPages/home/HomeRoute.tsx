/* eslint-disable react-native/no-inline-styles */
import {View, Image, Dimensions, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {EPath} from '../../../shared/models/enums/path.enum';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export default function HomeRoute(): JSX.Element {
  const navigation = useNavigation();
  // const items = useSelector(selectRecommendItems);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.rootContainer}>
        <Text>alla</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    root: {
      backgroundColor: 'white',
    },
    rootContainer: {
      display: 'flex',
      marginLeft: 17,
      marginRight: 17,
    }
  });