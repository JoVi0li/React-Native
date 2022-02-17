import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import Button from '../../components/Form/Button';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import InputForm from '../../components/Form/InputForm';
import CategorySelect from '../CategorySelect';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionType,
} from './style';

export type FormData = {
    [name: string]: any;

}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required("Nome é obrigatório"),
    amount: Yup
        .number()
        .typeError("Informe uma valor numérico")
        .positive("O valor não pode ser negativo")
        .required("O valor é obrigatório")
})

export default function Register() {
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [transactionType, setStransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionTypeSelect(type: "up" | "down") {
        setStransactionType(type);
    }

    function handleCloseSetCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenSetCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleRegister(form: FormData) {

        if (!transactionType) {
            return Alert.alert("Selecione o tipo da transação");
        }

        if (category.key === "category") {
            return Alert.alert("Selecione a categoria");
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            error={errors.name && errors.name.message}
                            control={control}
                            name="name"
                            placeholder='Nome'
                            autoCapitalize="sentences"
                            autoCorrect={false}
                        />
                        <InputForm
                            error={errors.amount && errors.amount.message}
                            control={control}
                            name="amount"
                            placeholder='Preço'
                            keyboardType="numeric"
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
                    <Button
                        title='Enviar'
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSetCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}