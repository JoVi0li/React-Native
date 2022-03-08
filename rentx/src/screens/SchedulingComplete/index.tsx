import React from "react";
import { useWindowDimensions } from "react-native";


import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import {
  Container,
  Content,
  Title,
  Message,
} from "./style";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  return (
    <Container>
      <LogoSvg  width={width}/>
      <Content>
        <DoneSvg height={80} width={80}/>
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>
    </Container>
  );
}