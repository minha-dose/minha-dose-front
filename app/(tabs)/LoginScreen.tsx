import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {globalStyles} from '../../styles/globalStyle';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
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
        <Text onPress={() => navigation.navigate('Cadastro')} style={globalStyles.link}> Registrar</Text>
      </Text>
    </View>
  );
}
