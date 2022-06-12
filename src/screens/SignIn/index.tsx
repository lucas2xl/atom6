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
import { useAuth } from '../../hooks/auth';

const schema = Yup.object().shape({
  password: Yup.string().required('Password field is required'),
  name: Yup.string().required('Name is required'),
});

interface IProps {}

interface IFormData extends FieldValues {
  name: string;
  password: string;
}

export const SignIn = ({}: IProps) => {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const passwordRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleSignIn = async (form: IFormData) => {
    setLoading(true);
    try {
      await signIn({
        username: form.name,
        password: form.password,
      });

      reset();
    } catch (error) {
      setLoading(false);
      Alert.alert('An error occurred, please try again');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Styles.Wrapper>
        <Styles.Header>
          <Styles.Title>Sign in</Styles.Title>
          <Styles.Description>
            Take advantage of the largest article creation platform{' '}
          </Styles.Description>
        </Styles.Header>

        <Styles.Form>
          <Input
            placeholder="Name"
            isValid={!errors.name}
            control={control}
            name="name"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <Input
            ref={passwordRef}
            placeholder="Password"
            isValid={!errors.password}
            control={control}
            name="password"
            secureTextEntry
          />

          <Styles.Error>{Object.values(errors)[0]?.message}</Styles.Error>
        </Styles.Form>

        <Styles.Footer>
          <Button
            title="Sign in"
            backgroundColor={colors.yellow}
            onPress={handleSubmit(handleSignIn)}
            loading={loading}
            disabled={loading}
          />
        </Styles.Footer>
      </Styles.Wrapper>
    </TouchableWithoutFeedback>
  );
};
