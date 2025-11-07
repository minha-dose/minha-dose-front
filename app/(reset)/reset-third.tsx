import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

export default function ResetPasswordNewScreen() {
    const router = useRouter();
    const { token } = useAuthTempStore();
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRules, setPasswordRules] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
        const minLength = newPassword.length >= 8;
        const hasUppercase = /[A-Z]/.test(newPassword);
        const hasLowercase = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword);

        setPasswordRules({
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecialChar,
        });
    }, [newPassword]);

    const isPasswordValid = Object.values(passwordRules).every(Boolean);

    const handleConfirm = async () => {
        if (!isPasswordValid) return;
        setLoading(true);
        setError('');

        try {
            await api.post('/api/v1/passwordReset/reset-password', {
                token: token,
                newPassword: newPassword,
            });

            alert('Senha alterada com sucesso!');
            router.push('/login');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Erro ao redefinir senha.');
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
                        <Text style={globalStyles.cadastroIntro}>Crie sua nova senha:</Text>
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
                            placeholder="Nova senha"
                            placeholderTextColor="#022757"
                            secureTextEntry={!showPassword}
                            style={[globalStyles.cadastroInput, { flex: 1, borderWidth: 0 }]}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={globalStyles.eyeButton}>
                            <Feather
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={22}
                                color="#022757"
                            />
                        </TouchableOpacity>
                    </View>

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
                                (!isPasswordValid || loading) && { backgroundColor: '#ccc' },
                            ]}
                            onPress={handleConfirm}
                            disabled={!isPasswordValid || loading}
                        >
                            <Text
                                style={[
                                    globalStyles.buttonCadastroText,
                                    (!isPasswordValid || loading) && { color: '#888' },
                                ]}
                            >
                                {loading ? 'Salvando...' : 'Confirmar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}