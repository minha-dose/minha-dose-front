import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import api from '../api/api';
import logo from '../assets/images/logo/minha-dose-logo.png';
import { globalStyles } from '../global';
import { useUserDataStore } from './store/userDataStore';

export default function CadastroThirdScreen() {
    const router = useRouter();
    const { password, setField } = useUserDataStore();
    const userData = useUserDataStore();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRules, setPasswordRules] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        setPasswordRules({
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecialChar,
        });
    }, [password]);

    const isPasswordValid = Object.values(passwordRules).every(Boolean);

    const handleConfirm = async () => {
        if (!isPasswordValid) return;
        const body = {
            name: userData.name,
            cpf: userData.cpf,
            password: password,
            email: userData.email,
            age: userData.age,
            role: "user",
            address: {
                street: userData.address,
                city: userData.city,
                district: userData.district,
                neighborhood: userData.neighborhood,
                country: userData.country,
                zipCode: userData.zipCode,
            },
            contact: {
                phone: userData.phoneNumber,
                email: userData.email
            }
        };

        console.log('Dados do cadastro: ', body);

        try{
            const response = await api.post('/api/v1/users/', body);
            console.log('Usuário criado com sucesso: ', response.data);
            router.push('/login');
        }catch (error: any){
            console.error('Erro ao criar usuário: ', error.response?.data || error.message);
            alert('Erro ao criar usuário.');
        }
    }

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
                    <View>
                        <Image source={logo} style={globalStyles.smallLogo} />
                        <Text style={globalStyles.cadastroIntro}>Crie sua senha:</Text>
                        <Text style={globalStyles.cadastroSubTitle}>
                            Uma senha segura deve conter:
                        </Text>
                        <View style={globalStyles.rulesList}>
                            <Text style={{ color: passwordRules.minLength ? 'green' : 'red' }}>
                                • Pelo menos 8 caracteres
                            </Text>
                            <Text style={{ color: passwordRules.hasUppercase ? 'green' : 'red' }}>
                                • Contém letra maiúscula
                            </Text>
                            <Text style={{ color: passwordRules.hasLowercase ? 'green' : 'red' }}>
                                • Contém letra minúscula
                            </Text>
                            <Text style={{ color: passwordRules.hasNumber ? 'green' : 'red' }}>
                                • Contém número
                            </Text>
                            <Text style={{ color: passwordRules.hasSpecialChar ? 'green' : 'red' }}>
                                • Contém caractere especial
                            </Text>
                        </View>
                    </View>

                    <View style={globalStyles.passwordContainer}>
                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor="#022757"
                            secureTextEntry={!showPassword}
                            style={[globalStyles.cadastroInput, { flex: 1, borderWidth: 0 }]}
                            value={password}
                            onChangeText={(text) => setField('password', text)}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={globalStyles.eyeButton}>
                            <Feather
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={22}
                                color="#022757"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={globalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={[globalStyles.buttonCadastro, globalStyles.backButton]}
                            onPress={() => router.push('/cadastro-second')}
                        >
                            <Text style={globalStyles.buttonCadastroText}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                globalStyles.buttonCadastro,
                                globalStyles.continueButton,
                                !isPasswordValid && { backgroundColor: '#ccc' },
                            ]}
                            onPress={handleConfirm}
                            disabled={!isPasswordValid}
                        >
                            <Text
                                style={[
                                    globalStyles.buttonCadastroText,
                                    !isPasswordValid && { color: '#888' },
                                ]}
                            >
                                Confirmar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}