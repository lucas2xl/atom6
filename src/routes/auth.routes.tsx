import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from '../screens/Welcome';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

const { Navigator, Screen } = createStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Welcome">
      <Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
};
