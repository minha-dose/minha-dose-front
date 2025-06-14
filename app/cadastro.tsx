import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import SuccessModal from '../components/SuccessModal';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    setModalVisible(true);
  };

  return (
    <View style={globalStyles.container}>
      <TextInput placeholder="CPF" style={globalStyles.input} />
      <TextInput placeholder="CEP" style={globalStyles.input} />
      <TextInput placeholder="Data de nascimento" style={globalStyles.input} />
      <TextInput placeholder="E-mail" style={globalStyles.input} />
      <TextInput placeholder="Senha" secureTextEntry style={globalStyles.input} />
      <TextInput placeholder="Confirmar senha" secureTextEntry style={globalStyles.input} />

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={globalStyles.footerText}>
        Já possui cadastro?
        <Text onPress={() => router.push('/login')} style={globalStyles.link}> Logar</Text>
      </Text>

      <SuccessModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          router.push('/login');
        }}
      />
    </View>
  );
}