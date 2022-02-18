import styled from "styled-components/native";
import { Feather, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 52px 30px 36px 30px;
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const SelectWrapper = styled.View`
    width: 50%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Select = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 24px;
`;

export const Icon = styled(EvilIcons)`
    color: ${({ theme }) => theme.colors.secondary};
`;



export const CardWrapper = styled.View`
    width: 100%;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 18px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 100px;
    line-height: 127px;
    color: ${({ theme }) => theme.colors.secondary};
    text-shadow: -4px 8px 50px rgba(0, 0, 0, 0.1);
`;

export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 24px;
    color: ${({ theme }) => theme.colors.secondary};
    text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1);
`

export const InfosWrapper = styled.View`
    align-items: flex-start;
    justify-content: center;
    padding: 26px 77px;
`;

export const Info = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
`;

export const MaterialIcon = styled(MaterialCommunityIcons)`
    color: ${({ theme }) => theme.colors.secondary};
    margin-right: 20px;
`;
