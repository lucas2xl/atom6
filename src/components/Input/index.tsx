import React, { forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import * as Styles from './styles';
import { Control, Controller } from 'react-hook-form';

interface IProps extends TextInputProps {
  isValid: boolean;
  name: string;
  control: Control<any>;
}

export const Input = forwardRef(
  ({ control, name, isValid = true, ...rest }: IProps, ref) => {
    const { colors } = useTheme();

    return (
      <Styles.Wrapper valid={!!isValid}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <Styles.Input
              placeholderTextColor={colors.text_detail}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              ref={ref as any}
              {...rest}
            />
          )}
        />
      </Styles.Wrapper>
    );
  },
);
