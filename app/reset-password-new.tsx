import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../assets/images/logo/minha-dose-logo.jpeg';

export default function ResetPasswordNewScreen() {
  const router = useRouter();
  const { email, code } = useLocalSearchParams(); // recebidos da tela anterior

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleResetPassword() {
    setError('');

    if (!password || !confirmPassword) {
      setError('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      setError('A senha deve conter no mínimo 8 caracteres, uma letra maiúscula e um número.');
      return;
    }

    // Simulação de sucesso
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso', 'Sua senha foi redefinida com sucesso!');
      router.replace('/'); // redireciona para a tela de login
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Nova senha</Text>
        <Text style={styles.subtitle}>
          Crie uma nova senha seguindo os parâmetros solicitados.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar nova senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Salvando...' : 'Confirmar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordRules}>
          <Text style={styles.rulesTitle}>A senha deve conter:</Text>
          <Text style={styles.rulesText}>• Mínimo de 8 caracteres</Text>
          <Text style={styles.rulesText}>• Letras maiúsculas e minúsculas</Text>
          <Text style={styles.rulesText}>• Números e caracteres especiais</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  bottomContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002C66',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 15,
    color: '#000',
    backgroundColor: '#f8f8f8',
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002C66',
  },
  button: {
    backgroundColor: '#002C66',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  passwordRules: {
    marginTop: 30,
  },
  rulesTitle: {
    fontWeight: 'bold',
    color: '#002C66',
    marginBottom: 4,
  },
  rulesText: {
    color: '#333',
    fontSize: 12,
  },
  errorText: {
    color: '#d33',
    marginTop: 4,
    marginBottom: 4,
  },
});
