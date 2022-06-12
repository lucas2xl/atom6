import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IButtonStyle {
  color?: string;
}

export const Wrapper = styled(TouchableOpacity)<IButtonStyle>`
  width: 100%;
  padding: 20px 0;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin: 6px 0;

  ${({ color, theme }) =>
    css`
      border: 1px solid ${theme.colors.line};
      background-color: ${color ?? 'transparent'};
    `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
`;
