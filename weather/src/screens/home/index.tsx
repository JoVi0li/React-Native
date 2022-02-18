import React, { FunctionComponent } from "react";
import LottiView from "lottie-react-native";
import animaton from "../../assets/lottie/animation.json";
import {
    Wrapper,
    Header,
    SelectWrapper,
    Select,
    Icon,
    CardWrapper,
    Text,
    Title,
    SubTitle,
    InfosWrapper,
    Info,
    MaterialIcon
} from "./style";

export const Home: FunctionComponent = () => {
    return (
        <Wrapper>
            <Header>
                <SelectWrapper>
                    <Icon name={"location"} size={36} />
                    <Select>São Paulo</Select>
                </SelectWrapper>
                <Icon name={"bell"} size={36}/>
            </Header>
            <LottiView
                source={animaton}
                autoPlay
                loop
                style={{
                    width: '100%'
                }}
            />
            <CardWrapper>
                <Text>Today, 12 September</Text>
                <Title>29°</Title>
                <SubTitle>Cloudy</SubTitle>
                <InfosWrapper>
                    <Info>
                        <MaterialIcon name={"weather-windy"} size={36}/>
                        <Text>Wind  |    10km/h</Text>
                    </Info>
                    <Info>
                        <MaterialIcon name={"water-outline"} size={36}/>
                        <Text>Hum   |    54%</Text>
                    </Info>
                </InfosWrapper>
            </CardWrapper>
        </Wrapper>
    );
}