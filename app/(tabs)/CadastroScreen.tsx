import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal } from 'react-native';
import {globalStyles} from '../../styles/globalStyle';
import SuccessModal from '../../components/SuccessModal';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  // add other routes here if needed
};

type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface CadastroScreenProps {
  navigation: CadastroScreenNavigationProp;
}

export default function CadastroScreen({ navigation }: CadastroScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);

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
        <Text onPress={() => navigation.navigate('Login')} style={globalStyles.link}> Logar</Text>
      </Text>

      <SuccessModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
      />
    </View>
  );
}
