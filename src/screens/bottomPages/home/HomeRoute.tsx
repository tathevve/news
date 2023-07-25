import {View, Image, Dimensions, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {EPath} from '../../../shared/models/enums/path.enum';
import {create} from 'apisauce';
import OneItem from '../../../shared/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeRoute(): JSX.Element {
  const navigation = useNavigation();
  const api = create({
    baseURL: 'https://lzone.secret-agents.ru/api',
    headers: {
      authorization:
        'Bearer eyJhY2Nlc3MtdG9rZW4iOiJPbHctdXV5My1LRnlfZWtXWEI2ZDZRIiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6IllOclFGSFVHRzFOWllTekF3eUJWX1EiLCJleHBpcnkiOiI0ODQ1OTAxMTgwIiwidWlkIjoiYnVsbGV0MjI3MTI5M0BnbWFpbC5jb20ifQ==',
    },
  });

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchNewsData = async (page: number) => {
    try {
      const response = await api.get(`/v2/news?page=${page}`);
      console.log(response, 'res');
      if (response.ok) {
        // If the response has no news items, set hasMoreData to false to stop loading more data
        if (response.data.news.length === 0) {
          setHasMoreData(false);
        } else {
          // Append new news items to the existing state
          setNewsData(prevData => [...prevData, ...response.data.news]);
        }
      } else {
        setError('Failed to fetch news data');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNewsData(pageNumber);
  }, [pageNumber]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const paddingToBottom = 20;
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isAtEnd =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    if (isAtEnd && !isLoadingMore && hasMoreData) {
      // Load more data if the user has reached the end and there is no ongoing loading
      setIsLoadingMore(true);
      setPageNumber(prevPage => prevPage + 1);
    }
  };

  console.log(newsData, 'news');

  return (
    <ScrollView
      style={styles.root}
      onScroll={handleScroll}
      scrollEventThrottle={400}>
      <View style={styles.rootContainer}>
        {newsData?.map((item, index: number) => (
          <View key={index}>
            <View>
              <OneItem item={item} showSizeAndQty />
            </View>
          </View>
        ))}
        {isLoadingMore && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text>Error: {error}</Text>}
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
  },
});
