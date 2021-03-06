import React from 'react';
import {Provider} from 'react-redux';
import BottomNavigationBar from './src/components/BottomNavigationBar';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import configureStore from './src/store/configureStore';
import config from './src/lib/config';
import TopHeader from './src/components/Header/TopHeader';
import Notify from './src/components/Notification';

const store = configureStore({});

const theme = {
  ...DefaultTheme,
  flex: 1,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: config.PRIMARY_THEME_COLOR_600,
    accent: config.SECONDARY_THEME_COLOR_500,
    background: config.SEVENTH_THEME_COLOR_50,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <TopHeader />
        <BottomNavigationBar />
        <Notify />
      </PaperProvider>
      {/* Screen configuration */}
    </Provider>
  );
}
