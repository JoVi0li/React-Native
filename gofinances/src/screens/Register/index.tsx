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
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from '@react-navigation/native'; 
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionType,
} from './style';

export type FormData = {
    [name: string]: string;
    
}

type NavigationProps = {
    navigate:(screen: string) => void
}

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required("Nome é obrigatório"),
    amount: Yup
    .number()
    .typeError("Informe uma valor numérico")
    .positive("Valor não pode ser negativo")
    .required("Valor é obrigatório")
})

export default function Register() {    
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });
    
    const navigation = useNavigation<NavigationProps>();
    
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [transactionType, setStransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionTypeSelect(type: "positive" | "negative") {
        setStransactionType(type);
    }

    function handleCloseSetCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenSetCategoryModal() {
        setCategoryModalOpen(true);
    }

    async function handleRegister(form: FormData) {
        
        if (!transactionType) {
            return Alert.alert("Selecione o tipo da transação");
        }

        if (category.key === "category") {
            return Alert.alert("Selecione a categoria");
        }

        const newTransaction = {
            id:  String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = "@gofinances:transactions";

            const data = await AsyncStorage.getItem(dataKey);

            const currentData = data ? JSON.parse(data) : [];
            
            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            
            reset();

            setStransactionType("");
            setCategory({
                key: "category",
                name: "Categoria"
            });
            
            navigation.navigate("Listagem");

        } catch (error) {
            console.error(error);
            Alert.alert("Não foi possível salvar");
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
                                type="positive"
                                title='Income'
                                onPress={() => handleTransactionTypeSelect("positive")}
                                isActive={transactionType === "up"}
                            />
                            <TransactionTypeButton
                                type="negative"
                                title='Outcome'
                            onPress={() => handleTransactionTypeSelect("negative")}
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