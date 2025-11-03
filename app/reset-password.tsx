import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import logo from '../assets/images/logo/minha-dose-logo.jpeg';

export default function ResetPasswordEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSendResetEmail() {
    if (!email) {
      setError('Informe o e-mail.');
      return;
    }

    Alert.alert('Simulação', 'Um código seria enviado para o seu e-mail.');

    router.push({
      pathname: '/reset-password-code',
      params: { email },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Alteração de senha</Text>
        <Text style={styles.subtitle}>
          Informe abaixo o e-mail utilizado no momento de criação de sua conta:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSendResetEmail}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
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
  errorText: {
    color: '#d33',
    marginTop: 4,
    marginBottom: 4,
  },
});
