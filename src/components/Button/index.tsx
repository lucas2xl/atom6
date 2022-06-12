import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import * as Styles from './styles';

interface IProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  backgroundColor?: string;
}

export const Button = ({
  title,
  loading = false,
  backgroundColor,
  ...rest
}: IProps) => {
  const { colors } = useTheme();

  return (
    <Styles.Wrapper color={backgroundColor} activeOpacity={0.6} {...rest}>
      {loading ? (
        <ActivityIndicator style={{ height: 14 }} color={colors.line} />
      ) : (
        <Styles.Title>{title}</Styles.Title>
      )}
    </Styles.Wrapper>
  );
};
