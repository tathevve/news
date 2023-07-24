/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
// import {IItem, IItemProps} from '../../shared/models/interfaces/item.interface';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux';
// import {selectItemData, setItemData} from '../../redux/slicers/wishlistSlice';
// import {selectItems, setItems} from '../../redux/slicers/allItemsSlice';
// import {
//   selectRecommendItems,
//   setItem,
// } from '../../redux/slicers/recommendSlice';

const OneItem = ({
  item,
//   customStyles,
  showHeartIcon = false,
  showSizeAndQty = false,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
//   const wishListItemsData = useSelector(selectItemData);
//   const allItemsData = useSelector(selectRecommendItems);
//   console.log(item, 'ITEM')
  return (
    <View style={styles.root}>
      <Text>{item.title}</Text>
      
      <View style={[{width: '100%'}]}>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            height: 150,
          }}
          // source={require(`https://lzone.secret-agents.ru//system/news/images/2023/07/19/372/main_api.png?1689756001`)}
          // source=  {{uri: item} as any}
          source={item?.image_additional_url}
          
          // source={require(item)}
        />
        <View style={{paddingLeft: 13}}>
          <Text>{item?.short_text} </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 250,
    marginTop: 45,
  },
  heartedStyle: {
    position: 'absolute',
    top: 12,
    right: 12,
    height: 22,
    width: 22,
    zIndex: 2,
  },
});

export default OneItem;
