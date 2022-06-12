import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  padding: ${getStatusBarHeight() + 20}px 10%;
`;

export const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.primary_bold};
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
  margin-bottom: 12px;
`;
export const Description = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const Form = styled.View`
  flex: 2;

  align-items: center;
  justify-content: center;
`;

export const Error = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.error};
  margin-top: 12px;
`;

export const Footer = styled.View`
  flex: 1;

  justify-content: space-between;
  align-items: center;
`;
