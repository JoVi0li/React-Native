import React from "react";

import PatternHillsImage from "../../assets/pattern-hills.svg";
import BackgroundStarsImage from "../../assets/bg-stars.svg";

import {
  HomeWrapper,
  PatternHills,
  BackgroundStars
} from "./styles";

export const Home = () => {
  return (
    <HomeWrapper>
      <PatternHills source={PatternHillsImage}/>
      <BackgroundStars source={BackgroundStarsImage}/>
    </HomeWrapper>
  )
}

