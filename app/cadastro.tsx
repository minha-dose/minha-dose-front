import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import SuccessModal from '../components/SuccessModal';
import { globalStyles } from '../global';

export default function CadastroScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const data = {
            name,
            password,
            email,
            age: Number(age),
            role: 'user',
            address: {
                street,
                city,
                district,
                neighborhood,
                country,
                zipCode,
            },
            contact: {
                phone,
                email,
            },
        };

        try {
            const response = await axios.post('https://minha-dose-back-s6ae.onrender.com/api/v1/users/', data);
            if (response.status === 201 || response.status === 200) {
                setModalVisible(true);
            } else {
                alert('Erro ao cadastrar. Tente novamente.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar. Verifique sua conexão e tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={globalStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ padding: 16 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={globalStyles.cadastroCenterView}>
                        <Text style={globalStyles.cadastroIntro}>
                            Preencha os campos abaixo para cadastrar-se na plataforma:
                        </Text>
                    </View>

                    <TextInput placeholder="Nome" style={globalStyles.cadastroInput} value={name} onChangeText={setName} />
                    <TextInput placeholder="Idade" style={globalStyles.cadastroInput} value={age} onChangeText={setAge} keyboardType="numeric" />
                    <TextInput placeholder="E-mail" style={globalStyles.cadastroInput} value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <TextInput placeholder="Telefone" style={globalStyles.cadastroInput} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    <TextInput placeholder="Rua" style={globalStyles.cadastroInput} value={street} onChangeText={setStreet} />
                    <TextInput placeholder="Cidade" style={globalStyles.cadastroInput} value={city} onChangeText={setCity} />
                    <TextInput placeholder="Bairro" style={globalStyles.cadastroInput} value={neighborhood} onChangeText={setNeighborhood} />
                    <TextInput placeholder="Estado" style={globalStyles.cadastroInput} value={district} onChangeText={setDistrict} />
                    <TextInput placeholder="CEP" style={globalStyles.cadastroInput} value={zipCode} onChangeText={setZipCode} keyboardType="numeric" />
                    <TextInput placeholder="N. da casa" style={globalStyles.cadastroInput} value={houseNumber} onChangeText={setHouseNumber} keyboardType="numeric" />
                    <TextInput placeholder="País" style={globalStyles.cadastroInput} value={country} onChangeText={setCountry} />
                    <TextInput placeholder="Senha" secureTextEntry style={globalStyles.cadastroInput} value={password} onChangeText={setPassword} />
                    <TextInput placeholder="Confirmar senha" secureTextEntry style={globalStyles.cadastroInput} value={confirmPassword} onChangeText={setConfirmPassword} />

                    <View style={globalStyles.cadastroCenterView}>
                        <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
                            <Text style={globalStyles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>

                        <Text style={globalStyles.footerText}>
                            Já possui cadastro?
                            <Text onPress={() => router.push('/login')} style={globalStyles.link}> Logar</Text>
                        </Text>
                    </View>

                    <SuccessModal
                        visible={modalVisible}
                        onClose={() => {
                            setModalVisible(false);
                            router.push('/login');
                        }}
                        message="Cadastro realizado com sucesso!"
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}