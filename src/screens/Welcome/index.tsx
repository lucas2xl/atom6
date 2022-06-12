import React from 'react';
import { useTheme } from 'styled-components';
import { Animation, Button } from '../../components';
import * as Styles from './styles';
import AnimationArticle from '../../assets/article.json';
import { useNavigation } from '@react-navigation/native';

interface IProps {}

export const Welcome = ({}: IProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleNavigateSignIn = (): void => {
    navigation.navigate('SignIn');
  };
  const handleNavigateSignUp = (): void => {
    navigation.navigate('SignUp');
  };

  return (
    <Styles.Wrapper>
      <Styles.Header>
        <Styles.Title>Welcome</Styles.Title>
        <Styles.Description>
          Create articles simply and quickly
        </Styles.Description>
      </Styles.Header>

      <Styles.Content>
        <Animation animationUrl={AnimationArticle} size={'100%'} />
      </Styles.Content>

      <Styles.Footer>
        <Button title="Sign in" onPress={handleNavigateSignIn} />
        <Button
          title="Sign up"
          backgroundColor={colors.yellow}
          onPress={handleNavigateSignUp}
        />
      </Styles.Footer>
    </Styles.Wrapper>
  );
};
