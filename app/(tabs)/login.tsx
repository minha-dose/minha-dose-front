import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyle';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.logo}>Minha Dose</Text>
      <Text style={globalStyles.subtitle}>Vacinar-se é auto cuidado</Text>
      <TextInput placeholder="CPF" style={globalStyles.input} />
      <TextInput placeholder="Senha" secureTextEntry style={globalStyles.input} />
      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={globalStyles.footerText}>
        Não possui cadastro?
        <Text onPress={() => router.push('/cadastro')} style={globalStyles.link}> Registrar</Text>
      </Text>
    </View>
  );
}