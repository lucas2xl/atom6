import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './src/hooks';
import { Routes } from './src/routes';
import { theme } from './src/styles/theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent
        />
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
};
