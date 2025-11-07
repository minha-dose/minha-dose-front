import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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
    View,
} from 'react-native';
import api from '../../api/api';
import logo from '../../assets/images/logo/minha-dose-logo.png';
import { globalStyles } from '../../global';
import { useAuthTempStore } from '../store/useResetPasswordUserStore';

export default function ResetPasswordCodeScreen() {
    const router = useRouter();
    const emailTemp = useAuthTempStore((state) => state.email);
    const setAuthField = useAuthTempStore((state) => state.setField);

    const [code, setCode] = useState(['', '', '', '']);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(45);

    const inputRefs = useRef<TextInput[]>([]);
    const allFieldsFilled = code.every((c) => c !== '');

    useEffect(() => {
        let interval: number;
        if (resendDisabled && timer > 0) {
            interval = window.setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            setResendDisabled(false);
            setTimer(45);
        }
        return () => window.clearInterval(interval);
    }, [resendDisabled, timer]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 3) inputRefs.current[index + 1].focus();
        if (!value && index > 0) inputRefs.current[index - 1].focus();
    };

    const handleContinue = async () => {
        try {
            const response = await api.post('/api/v1/passwordReset/verify-code', {
                email: emailTemp,
                code: code.join(''),
            });

            const { token } = response.data; 
            setAuthField('token', token);
            router.push('/(reset)/reset-third');
        } catch (error: any) {
            console.log(error);
            alert(error.response?.data?.error || 'Erro ao validar código.');
        }
    };

    const handleResendCode = async () => {
        try {
            setResendDisabled(true);
            await api.post('/api/v1/passwordReset/forgot-password', { email: emailTemp });
            alert('Novo código enviado para o seu e-mail!');
        } catch (error: any) {
            console.log(error);
            alert(error.response?.data?.error || 'Erro ao reenviar código.');
            setResendDisabled(false);
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
                        <Text style={globalStyles.cadastroIntro}>Alteração de senha.</Text>
                        <Text style={globalStyles.cadastroSubTitle}>
                            Informe os 4 dígitos que você recebeu no seu e-mail.
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(el) => {
                                    if (el) inputRefs.current[index] = el;
                                }}
                                value={digit}
                                onChangeText={(value) => handleChange(value, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#022757',
                                    borderRadius: 5,
                                    width: 50,
                                    height: 50,
                                    textAlign: 'center',
                                    fontSize: 24,
                                    color: '#022757',
                                }}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={handleResendCode}
                        disabled={resendDisabled}
                        style={{ marginTop: 20, alignItems: 'center' }}
                    >
                        <Text style={{ color: resendDisabled ? '#999' : '#002C66', fontWeight: 'bold' }}>
                            {resendDisabled ? `Aguarde ${timer}s` : 'Reenviar código'}
                        </Text>
                    </TouchableOpacity>

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
                                !allFieldsFilled && { backgroundColor: '#ccc' },
                            ]}
                            onPress={handleContinue}
                            disabled={!allFieldsFilled}
                        >
                            <Text style={globalStyles.buttonCadastroText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}