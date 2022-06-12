import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { IArticle } from '../../dtos/articleDTO';
import * as Styles from './styles';

interface IProps extends RectButtonProps {
  data: Partial<IArticle>;
  onSwipleablePress: () => void;
  loading: boolean;
}

export const Card = ({ data, onSwipleablePress, loading, ...rest }: IProps) => {
  const { colors } = useTheme();

  const geRightContent = () => {
    return (
      <Styles.SwipeableWrapper activeOpacity={0.5} onPress={onSwipleablePress}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.background_primary} />
        ) : (
          <MaterialCommunityIcons
            name="trash-can-outline"
            color={colors.background_primary}
            size={30}
          />
        )}
      </Styles.SwipeableWrapper>
    );
  };

  return (
    <Swipeable renderRightActions={geRightContent}>
      <Styles.Wrapper {...rest}>
        <Styles.Title>{data.title}</Styles.Title>
        <Styles.Line />
        <Styles.Description>{data.description}</Styles.Description>
      </Styles.Wrapper>
    </Swipeable>
  );
};
