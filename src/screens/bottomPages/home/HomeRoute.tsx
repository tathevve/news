/* eslint-disable react-native/no-inline-styles */
import {View, Image, Dimensions, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {EPath} from '../../../shared/models/enums/path.enum';
import { create } from 'apisauce';
import OneItem from '../../../shared/Item';


export default function HomeRoute(): JSX.Element {
  const navigation = useNavigation();
  // const items = useSelector(selectRecommendItems);

  const api = create({
    baseURL: 'https://lzone.secret-agents.ru/api/v2/',
    headers: {
      // Add the required headers here
      "authorization": "Bearer eyJhY2Nlc3MtdG9rZW4iOiJIMUlFNGt2WVFUUVhuX05QdWVxeU93IiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6InNtZUk4WEprWWRuNzNxSjJFcG5seWciLCJleHBpcnkiOiI0ODQ1ODUzMjA1IiwidWlkIjoiYnVsbGV0MjI3MTI5M0BnbWFpbC5jb20ifQ==",
      "cache-control": "max-age=0, private, must-revalidate",
    },
  });
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await api.get('news');
        console.log(response, 'res')
        if (response.ok) {
          setNewsData(response.data.news); // Assuming the response is an array of news items
        } else {
          setError('Failed to fetch news data');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

console.log(newsData, 'news')
  return (
    <ScrollView style={styles.root}>
      <View style={styles.rootContainer}>
        <Text>alla</Text>
        {newsData?.map((item, index: number) => {
                return (
                  <View key={index}>
                    <View>
                      <OneItem
                        item={item}
                        // customStyles={styles.item}
                        showSizeAndQty
                      />
                    </View>
                  </View>
                );
              })}
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