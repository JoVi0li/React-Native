import React, { useCallback, useEffect, useState } from "react";
import HistoryCard from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from "./style";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native"
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface TransactionData {
    type: "positive" | "negative",
    name: string,
    amount: number,
    category: string,
    date: string
}

interface CategoryData {
    key: string,
    name: string,
    total: number,
    totalFormatted: string,
    color: string,
    percent: string
}

export default function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const theme = useTheme();

    function handleDateChange(action: "next" | "prev") {
        if (action === "next") {
            const newDate = addMonths(selectedDate, 1);
            setSelectedDate(newDate);
        } else {
            const newDate = subMonths(selectedDate, 1);
            setSelectedDate(newDate);
        }
    }

    async function LoadData() {
        setIsLoading(true);
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((e: TransactionData) =>
                e.type === "negative" &&
                new Date(e.date).getMonth() === selectedDate.getMonth() &&
                new Date(e.date).getFullYear() === selectedDate.getFullYear()
            );


        const expensivesTotal = expensives
            .reduce((acumullator: number, expensive: TransactionData) => {
                return acumullator + Number(expensive.amount);
            }, 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.foreach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += expensive.amount;
                }
            })
            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                });
            }
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }



    useFocusEffect(useCallback(() => {
        LoadData();
    }, [selectedDate]))

    return (
        <Container>

            <Header>
                <Title>
                    Resumo por categoria
                </Title>
            </Header>
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size={"large"}
                        />
                    </LoadContainer> :


                    <Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: useBottomTabBarHeight(),
                        }}
                    >
                        <MonthSelect>
                            <MonthSelectButton onPress={() => handleDateChange('prev')}>
                                <MonthSelectIcon name="chevron-left" />
                            </MonthSelectButton>

                            <Month>
                                {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
                            </Month>

                            <MonthSelectButton onPress={() => handleDateChange("next")}>
                                <MonthSelectIcon name="chevron-right" />
                            </MonthSelectButton>
                        </MonthSelect>

                        <ChartContainer>
                            <VictoryPie
                                colorScale={totalByCategories.map(cat => cat.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: "bold",
                                        fill: theme.colors.shape
                                    }
                                }}
                                labelRadius={50}
                                data={totalByCategories}
                                x="percent"
                                y="total"
                            />
                        </ChartContainer>
                        {
                            totalByCategories.map(item => {
                                <HistoryCard
                                    key={item.key}
                                    title={item.name}
                                    amount={item.totalFormatted}
                                    color={item.color}
                                />
                            })
                        }
                    </Content>
            }
        </Container>
    );
}