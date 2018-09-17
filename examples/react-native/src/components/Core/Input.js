import styled from 'styled-components';

export const Button = styled.TouchableOpacity`
  border-radius: 3px;
  padding: 0.25px 1px;
  margin: 0 1px;
  background-color: ${props => props.theme.background};
  border: 2px solid blue;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.primary};
`;
