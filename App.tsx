import React from 'react';
import MainNavigator from './src/navigation/Main/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';

function App(): JSX.Element {
  const persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar
              backgroundColor="transparent"
              translucent={true}
              barStyle={'dark-content'}
            />
            <MainNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
