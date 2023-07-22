/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {StyleSheet, Text, View} from 'react-native';

interface IConnectionLayout {
  children: React.ReactNode;
}

const ConnectionLayout = ({children}: IConnectionLayout): JSX.Element => {
  const [isConnectedToNetWork, setIsConnectedToNetWork] =
    useState<boolean>(false);
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (typeof netInfo.isConnected === 'boolean') {
      handleConnectivityChange(netInfo.isConnected);
    }
  }, [netInfo.isConnected]);

  const handleConnectivityChange = (isConnected: boolean | null): void => {
    if (isConnected) {
        setIsConnectedToNetWork(true);
        setShowBadge(false);
    } else {
        setIsConnectedToNetWork(false);
        setShowBadge(true);
    }
  };

  return (
    <>
    {showBadge && (
        <View style={styles.badge}>
            <Text style={styles.text}>You are disconnected</Text>
        </View>
    )}
    {isConnectedToNetWork && children}
    </>
  );
};

export default ConnectionLayout;

const styles = StyleSheet.create({
  badge: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5505',
    color: 'white',
    padding: 10,
    height: 85,
    position: 'absolute',
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});
