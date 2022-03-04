import React, { FunctionComponent } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from "./style";

export function HomeScreen() {
  const carData = [
    {
      brand: "audi",
      name: "RS5 Coupé",
      rent: {
        period: "Ao dia",
        price: 120
      },
      thumbnail: "https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_3484151711005714.png?s=fill&w=440&h=330&q=80&t=true"
    },
    {
      brand: "porche",
      name: "Panamera",
      rent: {
        period: "Ao dia",
        price: 150
      },
      thumbnail: "https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-PNG-Images-HD.png"
    }
  ]
  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent={true}
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={carData}
        renderItem={({ item }) => <Car data={item} />}
        keyExtractor={item => item.thumbnail}
      />
    </Container>
  )
}