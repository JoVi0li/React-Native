import React, { useState } from 'react';
import { Modal  } from 'react-native';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionType,
} from './style';

import CategorySelect from '../CategorySelect';

export default function Register() {
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });
    const [transactionType, setStransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionTypeSelect( type: "up" | "down"){
        setStransactionType(type);
    }

    function handleCloseSetCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenSetCategoryModal(){
        setCategoryModalOpen(true);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input
                        placeholder='Nome'
                    />
                    <Input
                        placeholder='Preço'
                    />
                    <TransactionType>

                        <TransactionTypeButton
                            type='up'
                            title='Income'
                            onPress={() => handleTransactionTypeSelect("up")}
                            isActive={transactionType === "up"}
                        />
                        <TransactionTypeButton
                            type='down'
                            title='Outcome'
                            onPress={() => handleTransactionTypeSelect("down")}
                            isActive={transactionType === "down"}
                        />
                    </TransactionType>
                    <CategorySelectButton 
                        title='Categoria'
                        onPress={handleOpenSetCategoryModal}
                    />
                </Fields>
                <Button title='Enviar' />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSetCategoryModal}
                />
            </Modal>
        </Container>
    );
}