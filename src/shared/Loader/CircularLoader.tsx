import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

interface ISpinner {
  size?: string | any;
  color?: string;
  style?: any;
  defaultStyles?: boolean;
}

const CircularLoader = ({
  size = 'large',
  color = '#281e78',
  style,
  defaultStyles = false,
}: ISpinner): JSX.Element => {
  return (
    <ActivityIndicator
      size={size}
      color={color}
      style={defaultStyles ? styles.defaultStyle : style}
    />
  );
};

export default memo(CircularLoader);

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
  },
});
