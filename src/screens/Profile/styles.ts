import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: ${getStatusBarHeight() + 80}px 10%;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.View`
  width: 60px;
  height: 60px;

  border-radius: 30px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.green};
`;

export const Avatar = styled.Image`
  width: 55px;
  height: 55px;

  border-radius: 30px;
`;

export const Form = styled.ScrollView`
  margin-top: 20px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.primary_bold};
  color: ${({ theme }) => theme.colors.title};

  text-align: center;

  margin-bottom: 20px;
`;

export const RemoveAccountButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const RemoveAccountText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.error};

  margin-bottom: 20px;
`;
