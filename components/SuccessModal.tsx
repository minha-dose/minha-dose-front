import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import {globalStyles} from '../styles/globalStyle';


type SuccessModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function SuccessModal({ visible, onClose }: SuccessModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContent}>
          <Text style={globalStyles.modalText}>Cadastro realizado com sucesso!</Text>
          <TouchableOpacity style={globalStyles.button} onPress={onClose}>
            <Text style={globalStyles.buttonText}>Logar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}