import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../api/api';
import logo from '../assets/images/logo/minha-dose-logo.jpeg';
import { useUserStore } from './store/useUserStore';
import { useUserDataStore } from './store/userDataStore';

type User = {
  id: number;
  email: string;
  role?: string;
  token?: string;
};

export default function LoginScreen() {
  const router = useRouter();

  const setUserDataEmail = useUserDataStore((state) => state.setField);
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [userFound, setUserFound] = useState<User | null>(null);

  async function handleVerifyEmail() {
    setError('');

    try {
      const response = await api.get(`api/v1/users/email?email=${encodeURIComponent(email)}`);
      const userData: User = response.data;

      if (userData) {
        setUserFound(userData);
        setVerifiedEmail(true);
      }
    } catch (e: any) {

      if (e.response && e.response.status === 404) {
        setUserDataEmail('email', email);
        router.push({
          pathname: '/loadingPage',
          params: { next: '/cadastro' },
        });
      } else {
        setError('Erro ao verificar e-mail.');
      }
    }
  }

  async function handleLogin() {
    setError('');

    try {
      const response = await api.post(
        '/api/v1/auth/login',
        { email, password: senha },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token } = response.data;

      if (!token) {
        setError('Falha ao autenticar usuário.');
        return;
      }

      setUser({
        ...userFound,
        token,
      } as any);

      router.push('/home');
    } catch (e: any) {
      if (e.response?.status === 401) {
        setError('Senha incorreta.');
      } else {
        setError('Erro ao realizar login.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.subtitle}>Vacinar-se é auto cuidado</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#fff"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {verifiedEmail && (
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#fff"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={verifiedEmail ? handleLogin : handleVerifyEmail}
        >
          <Text style={styles.buttonText}>
            {verifiedEmail ? 'Entrar' : 'Continuar'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não possui cadastro?
          <Text onPress={() => router.push('/cadastro')} style={styles.link}> Registrar</Text>
        </Text>
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
    paddingTop: 0,
    paddingBottom: 0,
  },
  logo: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
    marginBottom: 0,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: -100,
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#002C66',
    borderTopLeftRadius: 60,
    marginTop: 50,
    borderTopRightRadius: 60,
    paddingTop: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#002C66',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#fff',
  },
  link: {
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: '#ff3333',
    marginBottom: 10,
    fontWeight: 'bold',
  }
});