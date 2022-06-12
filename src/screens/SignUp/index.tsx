import React, { useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Button, Input } from '../../components';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Styles from './styles';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

const schema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required('The confirm password field is required')
    .equals([Yup.ref('password')], 'the passwords do not match'),
  password: Yup.string()
    .required('The password field is required')
    .min(8, 'you need at least 8 characters'),
  email: Yup.string()
    .required('E-mail required')
    .email('Enter a valid e-mail address'),
  name: Yup.string().required('Name is required'),
});

interface IProps {}

interface IFormData extends FieldValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp = ({}: IProps) => {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (form: IFormData) => {
    setLoading(true);
    try {
      await signUp({
        email: form.email,
        username: form.name,
        password: form.password,
      });

      reset();
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Styles.Wrapper>
        <Styles.Header>
          <Styles.Title>Sign up</Styles.Title>
          <Styles.Description>Create an account, it`s free</Styles.Description>
        </Styles.Header>

        <Styles.Form>
          <Input
            placeholder="Name"
            isValid={!errors.name}
            control={control}
            name="name"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <Input
            ref={emailRef}
            placeholder="E-mail"
            isValid={!errors.email}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current?.focus()}
            control={control}
            name="email"
          />
          <Input
            ref={passwordRef}
            placeholder="Password"
            isValid={!errors.password}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            control={control}
            name="password"
            secureTextEntry
          />
          <Input
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            isValid={!errors.confirmPassword}
            control={control}
            name="confirmPassword"
            secureTextEntry
          />

          <Styles.Error>{Object.values(errors)[0]?.message}</Styles.Error>
        </Styles.Form>

        <Styles.Footer>
          <Button
            title="Sign up"
            backgroundColor={colors.green}
            onPress={handleSubmit(handleSignUp)}
            loading={loading}
            disabled={loading}
          />

          <Styles.ButtonWrapper onPress={handleNavigateSignIn}>
            <Styles.Text>Already have an account? </Styles.Text>
            <Styles.BoldText>Sign in</Styles.BoldText>
          </Styles.ButtonWrapper>
        </Styles.Footer>
      </Styles.Wrapper>
    </TouchableWithoutFeedback>
  );
};
