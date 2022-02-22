import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native";
import HighlightCard from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
    Container,
    Header,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    HighlightsCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightPros {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightPros;
    expensives: HighlightPros;
    total: HighlightPros;
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const theme = useTheme();

    function getLastTransactionDate(collection: DataListProps[], type: "positive" | "negative") {
        const lastTransaction = new Date(
            Math.max.apply(
                Math,
                collection
                    .filter(tr => tr.type === type)
                    .map(tr => new Date(tr.date).getTime())
            )
        );

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString("pt-BR", { month: "long" })} de ${lastTransaction.toLocaleString("pt-BR", { year: "numeric" })}`;
    }

    async function loadTransacions() {
        const dataKey = "@gofinances:transactions";

        const response = await AsyncStorage.getItem(dataKey);

        const transactions = response ? JSON.parse(response) : [];

        let entrieTotal = 0;
        let expenseveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === "positive") {
                    entrieTotal += Number(item.amount);
                } else {
                    expenseveTotal += Number(item.amount);
                }

                const amount = Number(item.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });


                const date = Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                }).format(new Date(item.date));


                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date

                }

            });

        setTransactions(transactionsFormatted);

        const lastTransactionsEntries = getLastTransactionDate(transactions, "positive");
        const lastTransactionsExpensives = getLastTransactionDate(transactions, "negative");
        const totalInterval = `01 a ${lastTransactionsExpensives}`;

        const total = entrieTotal - expenseveTotal;

        setHighlightData({
            entries: {
                amount: entrieTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }),
                lastTransaction: lastTransactionsEntries
            },
            expensives: {
                amount: expenseveTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }),
                lastTransaction: lastTransactionsExpensives
            },
            total: {
                amount: total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }),
                lastTransaction: totalInterval
            }
        });
        setIsLoading(false);
    }

    useEffect(() => {

        loadTransacions();

    }, []);

    useFocusEffect(useCallback(() => {
        loadTransacions();
    }, []));

    return (
        <Container>

            {
                isLoading ? <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size={"large"}
                    />
                </LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: "https://avatars.githubusercontent.com/u/73193391?v=4" }} />
                                    <User>
                                        <UserGreeting>Olá, </UserGreeting>
                                        <UserName>João Vitor</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton onPress={() => { }}>
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>
                        <HighlightsCards>
                            <HighlightCard
                                title="Entradas"
                                amount={highlightData?.entries?.amount}
                                lastTransaction={"Última entrada no dia " + highlightData?.entries?.lastTransaction}
                                type="up"
                            />
                            <HighlightCard
                                title=" Saídas"
                                amount={highlightData?.expensives?.amount}
                                lastTransaction={"Última saída no dia " + highlightData?.expensives?.lastTransaction}
                                type="down"
                            />
                            <HighlightCard
                                title="Total"
                                amount={highlightData?.total?.amount}
                                lastTransaction={highlightData?.total.lastTransaction}
                                type="total"
                            />

                        </HighlightsCards>

                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />

                        </Transactions>
                    </>
            }
        </Container>
    );
}