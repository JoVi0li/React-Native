import React from "react";

import GasolineSvg from "../../assets/gasoline.svg";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./style";

interface CarData{
  brand: string,
  name: string,
  rent: {
    period: string,
    price: number
  }
}

interface Props {
  data: CarData
}

export function Car({ data } : Props) {
  return (
    <Container>
      <Details>
        <Brand >{data.brand}</Brand>
        <Name>{`R$ ${data.name}`}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{data.rent.price}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: "https://w7.pngwing.com/pngs/853/38/png-transparent-2017-audi-r8-car-audi-rs5-audi-r8-lms-2016-audi-sedan-car-performance-car.png" }}/>
        
    </Container>

  )
}