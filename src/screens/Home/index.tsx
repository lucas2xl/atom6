import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { Button, Card, Input, Modal } from '../../components';
import * as Styles from './styles';
import { useAuth } from '../../hooks/auth';
import Feather from 'react-native-vector-icons/Feather';
import { IArticle } from '../../dtos/articleDTO';
import * as Yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, TextInput } from 'react-native';
import { api } from '../../services';
import { useIsFocused, useNavigation } from '@react-navigation/native';

interface IProps {}

interface IFormData extends FieldValues, IArticle {}

const schema = Yup.object().shape({
  title: Yup.string().required('The title field is required'),
  body: Yup.string().required('The body of the article is required'),
  description: Yup.string().required('The description is required'),
});

export const Home = ({}: IProps) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colors } = useTheme();
  const [isShowAddArticle, setIsShowAddArticle] = useState<boolean>(false);
  const [articles, setArticles] = useState<IArticle[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const descriptionRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    isFocused && getArticles();
  }, [refreshing, isFocused]);

  const handleOpenAddArticleModal = () => {
    setIsShowAddArticle(true);
  };
  const handleCloseAddArticleModal = () => {
    setIsShowAddArticle(false);
  };

  const getArticles = async () => {
    try {
      const result = await api.get<IArticle[]>('/article/all');
      setArticles(result.data);
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    }
  };

  const handleCreateArticle = async (form: IFormData) => {
    setLoading(true);
    try {
      await api.post<IArticle>('/article/create', {
        title: form.title,
        description: form.description,
        body: form.body,
      });

      reset();
      setIsShowAddArticle(false);
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    } finally {
      onRefresh();
      setLoading(false);
    }
  };

  const handleRemoveArticle = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/article/delete/${id}`);
    } catch (error) {
      Alert.alert('An error occurred, please try again');
    } finally {
      onRefresh();
      setLoading(false);
    }
  };

  const renderArticles = ({ item }: { item: IArticle }) => (
    <Card
      data={item}
      onSwipleablePress={() => handleRemoveArticle(item.id)}
      loading={loading}
      onPress={() => navigation.navigate('ArticleDetails', { data: item })}
    />
  );

  const onRefresh = React.useCallback((temp = 500) => {
    setRefreshing(true);
    new Promise(resolve => setTimeout(resolve, temp)).then(() =>
      setRefreshing(false),
    );
  }, []);

  const handleNavigateProfileUser = () => {
    navigation.navigate('Profile', {
      data: user,
    });
  };

  return (
    <Styles.Wrapper>
      <Styles.Header onPress={handleNavigateProfileUser}>
        <Styles.User>
          <Styles.Greeting>Hello</Styles.Greeting>
          <Styles.UserName>{user.username}</Styles.UserName>
        </Styles.User>
        <Styles.Profile>
          <Styles.Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
        </Styles.Profile>
      </Styles.Header>

      {articles?.length === 0 && (
        <Styles.NoArticleText>No articles</Styles.NoArticleText>
      )}

      <Styles.Content
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={articles}
        keyExtractor={key => key.id}
        renderItem={renderArticles}
        ItemSeparatorComponent={() => <Styles.Gap />}
      />

      <Styles.Footer>
        <Styles.AddButton onPress={handleOpenAddArticleModal}>
          <Feather name="plus" size={40} color={colors.background_primary} />
        </Styles.AddButton>
      </Styles.Footer>

      {/* add article modal */}
      <Modal
        visible={isShowAddArticle}
        onRequestClose={handleCloseAddArticleModal}>
        <Styles.NewArticle>New article</Styles.NewArticle>
        <Styles.Thumbnail>
          <Feather name="plus" size={30} color={colors.text} />
          <Styles.ThumbnailText>Add cover image</Styles.ThumbnailText>
        </Styles.Thumbnail>

        <Styles.Form>
          <Input
            placeholder="Title goes here"
            isValid={!errors.title}
            control={control}
            name="title"
            onSubmitEditing={() => descriptionRef.current?.focus()}
          />
          <Input
            ref={descriptionRef}
            placeholder="Description goes here"
            isValid={!errors.description}
            control={control}
            name="description"
            multiline
          />
          <Input
            placeholder="Body goes here"
            isValid={!errors.body}
            control={control}
            name="body"
            multiline
          />
        </Styles.Form>

        <Styles.ModalFooter>
          <Button
            title="Create"
            backgroundColor={colors.yellow}
            onPress={handleSubmit(handleCreateArticle)}
            loading={loading}
            disabled={loading}
          />
        </Styles.ModalFooter>
      </Modal>
    </Styles.Wrapper>
  );
};
