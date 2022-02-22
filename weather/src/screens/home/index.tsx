import React, { FunctionComponent, useEffect, useState } from "react";
import AdvisorService from "../../services/advisor_service";
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

interface DataProps {
    id: number;
    name: string;
    data: {
        temperature: number;
        wind_velocity: string;
        humidity: number;
        condition: string;
    }
}

export const Home: FunctionComponent = () => {

    const adService = new AdvisorService();
    const [data, setData] = useState<DataProps>({} as DataProps);

    useEffect(() =>  {
       async function initState(){
            const response = await adService.getCurrentWeather(3477);
            setData(response);
            console.log("Função executada");
       }

       initState();

    }, []);
    return (
        <Wrapper>
            <Header>
                <SelectWrapper>
                    <Icon name={"location"} size={36} />
                    <Select>{data?.name}</Select>
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
                <Title>{data?.data?.temperature}</Title>
                <SubTitle>{data?.data?.condition}</SubTitle>
                <InfosWrapper>
                    <Info>
                        <MaterialIcon name={"weather-windy"} size={36}/>
                        <Text>Wind  |    {data?.data?.wind_velocity}km/h</Text>
                    </Info>
                    <Info>
                        <MaterialIcon name={"water-outline"} size={36}/>
                        <Text>Hum   |    {data?.data?.humidity}%</Text>
                    </Info>
                </InfosWrapper>
            </CardWrapper>
        </Wrapper>
    );
}