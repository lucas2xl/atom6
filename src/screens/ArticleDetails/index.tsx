import React, { useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { Button, Input } from '../../components';
import * as Styles from './styles';
import { IArticle } from '../../dtos/articleDTO';
import * as Yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActivityIndicator, Alert, TextInput } from 'react-native';
import { api } from '../../services';
import { useNavigation, useRoute } from '@react-navigation/native';
import { dateFormatter } from '../../utils/dateFormatter';

interface IRouteParams {
  data: IArticle;
}

interface IFormData extends FieldValues, IArticle {}

const schema = Yup.object().shape({
  title: Yup.string().required('The title field is required'),
  body: Yup.string().required('The body of the article is required'),
  description: Yup.string().required('The description is required'),
});

export const ArticleDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params as IRouteParams;
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const descriptionRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: data.title,
      description: data.description,
      body: data.body,
    },
  });

  const handleUpdateArticle = async (form: IFormData) => {
    setLoading(true);
    try {
      await api.put<IArticle>(`/article/update/${data.id}`, {
        title: form.title,
        description: form.description,
        body: form.body,
      });

      reset();
      navigation.goBack();
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveArticle = async () => {
    try {
      await api.delete(`/article/delete/${data.id}`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    }
  };

  return (
    <Styles.Wrapper>
      <Styles.Header>
        <Styles.Title>Article</Styles.Title>
      </Styles.Header>

      <Styles.Thumbnail source={{ uri: data.thumbnail }} />

      <Styles.CreatedAt>
        Created at {dateFormatter(data.created_at)}
      </Styles.CreatedAt>

      <Styles.Form>
        <Input
          placeholder="Title goes here"
          isValid={!errors.title}
          defaultValue={data.title}
          control={control}
          name="title"
          onSubmitEditing={() => descriptionRef.current?.focus()}
        />
        <Input
          ref={descriptionRef}
          placeholder="Description goes here"
          isValid={!errors.description}
          defaultValue={data.description}
          control={control}
          name="description"
          multiline
        />
        <Input
          placeholder="Body goes here"
          isValid={!errors.body}
          defaultValue={data.body}
          control={control}
          name="body"
          multiline
        />
      </Styles.Form>

      <Button
        title="Update"
        backgroundColor={colors.green}
        onPress={handleSubmit(handleUpdateArticle)}
        loading={loading}
        disabled={loading}
      />
      <Styles.RemoveArticleButton onPress={handleRemoveArticle}>
        {removeLoading ? (
          <ActivityIndicator size="small" color={colors.error} />
        ) : (
          <Styles.RemoveArticleText>Remove article</Styles.RemoveArticleText>
        )}
      </Styles.RemoveArticleButton>
    </Styles.Wrapper>
  );
};
