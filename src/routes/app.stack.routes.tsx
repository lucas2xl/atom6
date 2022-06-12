import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { ArticleDetails } from '../screens/ArticleDetails';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createStackNavigator();

export const AppStackRoutes = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
};
