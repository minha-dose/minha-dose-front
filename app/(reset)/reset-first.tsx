import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
import api from '../../api/api';
import logo from '../../assets/images/logo/minha-dose-logo.png';
import { globalStyles } from '../../global';
import { useAuthTempStore } from '../store/useResetPasswordUserStore';

export default function ResetPasswordFirst() {
    const router = useRouter();

    const setAuthField = useAuthTempStore((state) => state.setField);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const allFieldsFilled = email.trim().length > 0;

    const handleContinue = async () => {
        if (!allFieldsFilled) return;

        setError('');
        setLoading(true);

        try {
            setAuthField('email', email);

            await api.post('/api/v1/passwordReset/forgot-password', {
                email: email
            });

            router.push('/(reset)/reset-second');
        } catch (err: any) {
            console.log(err);
            setError(err.response?.data?.error || 'Erro ao solicitar código.');
        } finally {
            setLoading(false);
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
                    <View>
                        <Image source={logo} style={globalStyles.smallLogo} />
                        <Text style={globalStyles.cadastroIntro}>
                            Alteração de senha.
                        </Text>
                        <Text style={globalStyles.cadastroSubTitle}>
                            Informe abaixo o e-mail utilizado no momento de cadastro de sua conta.
                        </Text>
                    </View>

                    <TextInput
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                    />

                    {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

                    <View style={globalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={[globalStyles.buttonCadastro, globalStyles.backButton]}
                            onPress={() => router.push('/login')}
                        >
                            <Text style={globalStyles.buttonCadastroText}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                globalStyles.buttonCadastro,
                                globalStyles.continueButton,
                                !allFieldsFilled && { backgroundColor: '#ccc' }
                            ]}
                            onPress={handleContinue}
                            disabled={!allFieldsFilled || loading}
                        >
                            <Text style={globalStyles.buttonCadastroText}>
                                {loading ? 'Enviando...' : 'Continuar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}