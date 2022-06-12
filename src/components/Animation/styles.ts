import styled from 'styled-components/native';

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;
