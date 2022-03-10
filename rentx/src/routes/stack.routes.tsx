import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import { HomeScreen } from '../../src/screens/Home';
import { CarDetails } from '../../src/screens/CarDetails';
import { Scheduling } from '../../src/screens/Scheduling';
import { SchedulingDetails } from '../../src/screens/SchedulingDetails';
import { SchedulingComplete } from "../screens/SchedulingComplete";

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Home"
        component={HomeScreen}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen
        name="SchedulingComplete"
        component={SchedulingComplete}
      />
    </Navigator>
  );
}