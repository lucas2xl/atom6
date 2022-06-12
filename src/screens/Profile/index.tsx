import React, { useRef } from 'react';
import { useTheme } from 'styled-components';
import { Button, Input } from '../../components';
import * as Styles from './styles';
import { IArticle } from '../../dtos/articleDTO';
import * as Yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, TextInput } from 'react-native';
import { api } from '../../services';
import { useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IUser } from '../../dtos/userDTO';
import { useAuth } from '../../hooks/auth';

interface IRouteParams {
  data: IUser;
}

interface IFormData extends FieldValues, IArticle {}

const schema = Yup.object().shape({
  username: Yup.string().required('The body username is required'),
});

export const Profile = () => {
  const { signOut } = useAuth();
  const route = useRoute();
  const { data } = route.params as IRouteParams;
  const { colors } = useTheme();
  const descriptionRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleUpdateUser = async (form: IFormData) => {
    Alert.alert('function temporarily unavailable');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    }
  };

  const handleRemoveUserAccount = async () => {
    try {
      await api.delete(`/auth/delete/${data.id}`);
      await signOut();
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    }
  };

  return (
    <Styles.Wrapper>
      <Styles.Title>Profile</Styles.Title>

      <Styles.Header>
        <Styles.Profile>
          <Styles.Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
        </Styles.Profile>
        <MaterialIcons
          name="logout"
          size={30}
          color={colors.line}
          onPress={handleSignOut}
        />
      </Styles.Header>

      <Styles.Form>
        <Input
          placeholder="Username"
          isValid={!errors.username}
          defaultValue={data.username}
          control={control}
          name="username"
          onSubmitEditing={() => descriptionRef.current?.focus()}
        />
        <Input
          ref={descriptionRef}
          placeholder="E-mail"
          isValid={!errors.email}
          defaultValue={data.email}
          control={control}
          name="email"
          editable={false}
          multiline
        />
      </Styles.Form>

      <Button
        title="Update"
        backgroundColor={colors.yellow}
        onPress={handleSubmit(handleUpdateUser)}
      />
      <Styles.RemoveAccountButton onPress={handleRemoveUserAccount}>
        <Styles.RemoveAccountText>Remove account</Styles.RemoveAccountText>
      </Styles.RemoveAccountButton>
    </Styles.Wrapper>
  );
};
