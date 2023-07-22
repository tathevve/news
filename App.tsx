/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/redux/index';
import ConnectionLayout from './src/layout/ConnectionLayout';
import Routes from './src/routes';
// import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        {/* <ToastProvider> */}
          <NavigationContainer>
            <ConnectionLayout>
              <Routes />
            </ConnectionLayout>
          </NavigationContainer>
        {/* </ToastProvider> */}
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;
