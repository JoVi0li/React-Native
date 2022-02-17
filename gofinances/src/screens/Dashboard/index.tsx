import React from "react";
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
} from './styles';

export interface DataListProps  extends TransactionCardProps {
    id: string;
}

export default function Dashboard() {
    const data: DataListProps[] = [
        {
            id: "1",
            type: "positive",
            title:"Desenvolvimento de site",
            amount:"R$ 12.400,00",
            category: {
                name:"Vendas",
                icon:"dollar-sign"
            },
            date:"15/02/2022"
        },
        {
            id: "2",
            type: "negative",
            title:"Hamburgueria Pizzy",
            amount:"R$ 59,00",
            category: {
                name:"Alimentação",
                icon:"coffee"
            },
            date:"10/02/2022"
        },
        {
            id: "3",
            type: "negative",
            title:"Aluguel do apartamento",
            amount:"R$ 1.200,00",
            category: {
                name:"Casa",
                icon:"shopping-bag"
            },
            date:"5/02/2022"
        }
    ]
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: "https://avatars.githubusercontent.com/u/73193391?v=4" }} />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>João Vitor</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
            <HighlightsCards>
                <HighlightCard
                    title="Entradas"
                    amount="R$ 14.400,00"
                    lastTransaction="Última transação no dia 13 de abril"
                    type="up"
                />
                <HighlightCard
                    title=" Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril"
                    type="down"
                />
                <HighlightCard
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="01 à 16 de abril"
                    type="total"
                />

            </HighlightsCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>
        </Container>
    );
}