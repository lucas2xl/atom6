import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IInputStyles {
  valid: boolean;
}
export const Wrapper = styled.View<IInputStyles>`
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, valid }) =>
    valid ? theme.colors.text_detail : theme.colors.error};
  margin: 6px;
`;

export const Input = styled(TextInput)`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, editable }) =>
    editable === false ? theme.colors.text_detail : theme.colors.text};
  min-height: 50px;
`;
