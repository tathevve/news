import React from 'react';
import {Text, StyleProp, TextStyle, TouchableOpacity} from 'react-native';
import CircularLoader from '../Loader/CircularLoader';

interface IButton {
  buttonStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: (params?: any) => void | Promise<void>;
  onBlur?: () => void;
  title?: string;
  Icon?: React.ReactNode | null;
  loading?: boolean;
  disabled?: boolean;
  disabledStyles?: StyleProp<TextStyle>;
}

const RNButton = ({
  buttonStyle,
  textStyle,
  onPress,
  onBlur,
  title = 'Shop Now',
  Icon = null,
  loading = false,
  disabled = false,
  disabledStyles,
}: IButton): JSX.Element => {
  return (
    <TouchableOpacity
      style={[buttonStyle, disabled === true && disabledStyles]}
      onPress={onPress}
      onBlur={onBlur}
      disabled={disabled}>
      {loading ? (
        <CircularLoader />
      ) : (
        <>
          {Icon}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default RNButton;
