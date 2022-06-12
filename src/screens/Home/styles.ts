import { FlatList, FlatListProps } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IArticle } from '../../dtos/articleDTO';

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: ${getStatusBarHeight() + 20}px 10%;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const User = styled.View``;

export const UserName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  text-transform: capitalize;
`;

export const Greeting = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.primary_bold};
  color: ${({ theme }) => theme.colors.title};
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

export const Content = styled(
  FlatList as new (props: FlatListProps<IArticle>) => FlatList<IArticle>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  flex: 1;
  width: 100%;
  margin-top: 20px;
`;

export const Footer = styled.View`
  width: 100%;
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;

  align-items: center;
  justify-content: center;

  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.green};
`;

export const NewArticle = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.primary_bold};
  color: ${({ theme }) => theme.colors.title};
  text-align: center;

  margin: 20px;
`;

export const Thumbnail = styled.View`
  width: 100%;
  height: 100px;

  border-radius: 10px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const ThumbnailText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};

  margin-top: 12px;
`;

export const Form = styled.ScrollView`
  margin-top: 20px;
`;

export const ModalFooter = styled.View`
  align-items: center;
  justify-content: center;

  margin-bottom: ${getBottomSpace() + 20}px;
`;

export const Gap = styled.View`
  margin-top: 12px;
`;

export const NoArticleText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text_detail};
`;
