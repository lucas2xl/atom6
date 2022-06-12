import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled(RectButton)`
  width: 100%;

  padding: 16px;

  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};

  margin-top: 6px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.line};
`;

export const SwipeableWrapper = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.error};
  width: 30%;
  height: 100%;

  align-items: center;
  justify-content: center;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
