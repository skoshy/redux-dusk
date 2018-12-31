import styled from 'styled-components';

export const Button = styled.TouchableOpacity`
  border-radius: 3px;
  padding: 0.25px 1px;
  margin: 0 1px;
  background-color: ${props => props.theme.backgroundColor};
  alignItems: center;
  justifyContent: center;
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  color: ${props => props.theme.primary};
`;
