import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { AuthRoutes } from './auth.routes';
import { Animation } from '../components';
import animationLoad from '../assets/loading.json';
import { AppStackRoutes } from './app.stack.routes';
import { IArticle } from '../dtos/articleDTO';
import { IUser } from '../dtos/userDTO';

export type AppRoutes = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ArticleDetails: {
    data: IArticle;
  };
  Profile: {
    data: IUser;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutes {}
  }
}

export const Routes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Animation animationUrl={animationLoad} />;
  }

  return (
    <NavigationContainer>
      {user.id ? <AppStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
