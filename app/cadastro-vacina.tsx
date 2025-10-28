import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const MAIN_COLOR = '#002856';

export default function CadastrarVacinaScreen() {
  const router = useRouter();

  
  const [ubs, setUbs] = useState('');
  const [nomeVacina, setNomeVacina] = useState('');
  const [lote, setLote] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [quantidadeRecebida, setQuantidadeRecebida] = useState('');
  const [dataRecebimento, setDataRecebimento] = useState('');

  const handleCadastro = () => {
    console.log('Dados a serem enviados para o Back-End:', {
      ubs,
      nomeVacina,
      lote,
      fabricante,
      dataValidade,
      quantidadeRecebida,
    });
    alert('Vacina cadastrada (Simulação)');
  };

  return (
    <View style={styles.fullContainer}>
      {}
      <Text style={styles.headerTitle}>Cadastrar vacina</Text> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {}
        <Text style={styles.mainTitle}>Cadastre uma nova vacina!</Text>
        <Text style={styles.description}>
          Cada novo lote recebido equivale a uma nova vacina. Preencha abaixo os dados 
          básicos da vacina recebida para sua disponibilização.
        </Text>
        
        {}
        <Text style={styles.label}>Escolha a ubs</Text>
        <View style={styles.selectInput}>
            <Text style={styles.selectText}>Toque para selecionar a UBS</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
        </View>

        {}
        <Text style={styles.label}>Nome da vacina</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={nomeVacina}
          onChangeText={setNomeVacina}
        />
        
        {}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Lote</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={lote}
              onChangeText={setLote}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Fabricante</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={fabricante}
              onChangeText={setFabricante}
            />
          </View>
        </View>

        {}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Data de fabricação</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value={dataFabricacao}
              onChangeText={setDataFabricacao}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Data de validade</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value={dataValidade}
              onChangeText={setDataValidade}
            />
          </View>
        </View>

        {}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Quantidade recebida</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value={quantidadeRecebida}
              onChangeText={setQuantidadeRecebida}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Data de recebimento</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="numeric"
              value={dataRecebimento}
              onChangeText={setDataRecebimento}
            />
          </View>
        </View>
        
        {}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleCadastro}
        >
          <Text style={styles.submitButtonText}>Cadastrar Vacina</Text>
        </TouchableOpacity>

      </ScrollView>

      {}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}>
          <MaterialIcons name="home" size={24} color={MAIN_COLOR} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="edit" size={24} color={MAIN_COLOR} /> 
          <Text style={styles.navText}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/vaccins')}>
          <MaterialIcons name="vaccines" size={24} color={MAIN_COLOR} />
          <Text style={styles.navText}>Vacinas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/perfil')}>
          <MaterialIcons name="person" size={24} color={MAIN_COLOR} />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: MAIN_COLOR,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: MAIN_COLOR,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectText: {
    fontSize: 16,
    color: '#666', 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfInputContainer: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 30,
    width: width - 32,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: MAIN_COLOR,
    marginTop: 3,
  },
});