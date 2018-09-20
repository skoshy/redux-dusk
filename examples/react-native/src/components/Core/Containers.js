import styled from 'styled-components';

export const BackgroundView = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  flex: 1;
`;

export const PostContainer = styled.View`
  background-color: ${props => props.theme.postBackgroundColor};
  flex: 1;
`;
