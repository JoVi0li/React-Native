import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.header};

  padding-top: 96px;
`;

export const Content = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.View`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;

  color: ${({ theme }) => theme.colors.shape};

  margin-top: 40px;
`;

export const Message = styled.View`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.fonts.primary_400};

  text-align: center;

  line-height: 25px;

  margin-top: 16px;


`;
