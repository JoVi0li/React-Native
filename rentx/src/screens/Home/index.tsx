import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';

import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTo'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from "./style";

export function HomeScreen({ navigation }) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    const fecthCars = async () => {
      await api.get('/cars')
        .then((value) => {
          setCars(value.data);
        })
        .catch((error) => {
          console.error("Olha a excessão aí || " + error + " ||");
        }).finally(() => {
          setLoading(false);
        });

    };
    fecthCars();
  }, []);

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
      {
        loading ?
          <Loading /> :
          <CarList
            data={cars}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
            keyExtractor={item => item.id}
          />
      }

    </Container>
  )
}