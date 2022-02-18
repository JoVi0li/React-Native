import React from "react";
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";
import { Home } from "../screens/home";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes: Function = () => {
    const theme = useTheme();

    return (
        <Navigator
            initialRouteName="Home"
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
        </Navigator>
    );
}