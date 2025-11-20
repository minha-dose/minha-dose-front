import api from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface UBS {
  id: number;
  ubsName: string;
  address?: {
    street?: string;
    neighborhood?: string;
    city?: string;
    district?: string;
  };
}
interface Vaccin {
  id: number;
  name: string;
}


export default function NewVaccin() {
  const router = useRouter();
  const [ubsList, setUbsList] = useState<UBS[]>([]);
  const [selectedUbs, setSelectedUbs] = useState<UBS | null>(null);
  const [showUbsModal, setShowUbsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUbs, setLoadingUbs] = useState(true);

  const [lote, setLote] = useState('');
  const [fabricante, setFabricante] = useState('');

  const [dataValidade, setDataValidade] = useState<Date | null>(null);
  const [showDataValidade, setShowDataValidade] = useState(false);
  const [vaccinsList, setVaccinsList] = useState<Vaccin[]>([]);
  const [selectedVaccin, setSelectedVaccin] = useState<Vaccin | null>(null);
  const [showVaccinModal, setShowVaccinModal] = useState(false);
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    fetchUbs();
    fetchVaccins();
  }, []);

  const fetchUbs = async () => {
    try {
      const response = await api.get('/api/v1/ubs/');
      setUbsList(response.data);
    } catch (error) {
      console.error('Erro ao buscar UBS:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de UBSs.');
    } finally {
      setLoadingUbs(false);
    }
  };
  const fetchVaccins = async () => {
  try {
    const response = await api.get('/api/v1/vaccin/');
    setVaccinsList(response.data);
  } catch (error) {
    console.error('Erro ao buscar vacinas:', error);
    Alert.alert('Erro', 'Não foi possível carregar a lista de vacinas.');
  }
};

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') setShowDataValidade(false);
    if (selectedDate) setDataValidade(selectedDate);
  };

  const handleCadastrar = async () => {
    if (!selectedUbs) {
      Alert.alert('Atenção', 'Selecione uma UBS.');
      return;
    }
    if (!selectedVaccin) {
      Alert.alert('Atenção', 'Selecione uma vacina.');
      return;
    }

    if (!lote.trim()) {
      Alert.alert('Atenção', 'Preencha o lote.');
      return;
    }
    if (!fabricante.trim()) {
      Alert.alert('Atenção', 'Preencha o fabricante.');
      return;
    }
    if (!dataValidade) {
      Alert.alert('Atenção', 'Selecione a data de validade.');
      return;
    }
    if (!quantidade.trim()) {
    Alert.alert('Atenção', 'Informe a quantidade recebida.');
    return;
    }


    setLoading(true);

    try {
      const formatDateForAPI = (date: Date) => date.toISOString().split('T')[0];

      const payload = {
      vaccinId: selectedVaccin.id,
      ubsId: selectedUbs.id,
      batch: lote.trim(),
      manufacturer: fabricante.trim(),
      expiration: formatDateForAPI(dataValidade),
      quantity: Number(quantidade),
    };

      await api.post('/api/v1/ubsvaccin/', payload);


      Alert.alert('Sucesso', 'Vacina cadastrada com sucesso!');
      router.push('/(protected)/(admin)/vaccins-list');

      // Resetar form
      setSelectedUbs(null);
      setLote('');
      setFabricante('');
      setDataValidade(null);
    } catch (error: any) {
      console.error('Erro ao cadastrar vacina:', error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        'Não foi possível cadastrar a vacina. Verifique os dados e tente novamente.';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <Text style={styles.title}>Cadastre uma nova vacina!</Text>
          <Text style={styles.description}>
            Cada novo lote recebido equivale a uma nova vacina. Preencha abaixo os dados básicos da vacina recebida para sua disponibilização.
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Escolha a UBS</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowUbsModal(true)}>
            <Text style={[styles.inputText, !selectedUbs && styles.placeholderText]}>
              {selectedUbs ? selectedUbs.ubsName : 'Selecione uma UBS'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

          <View style={styles.fieldContainer}>
          <Text style={styles.label}>Vacina</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowVaccinModal(true)}>
            <Text style={[styles.inputText, !selectedVaccin && styles.placeholderText]}>
              {selectedVaccin ? selectedVaccin.name : 'Selecione a vacina'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Lote</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o lote"
              placeholderTextColor="#999"
              value={lote}
              onChangeText={setLote}
            />
          </View>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Fabricante</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o fabricante"
              placeholderTextColor="#999"
              value={fabricante}
              onChangeText={setFabricante}
            />
          </View>
        </View>
        <View style={styles.fieldContainer}>
  <Text style={styles.label}>Quantidade</Text>
  <TextInput
    style={styles.input}
    placeholder="Digite a quantidade"
    placeholderTextColor="#999"
    value={quantidade}
    onChangeText={setQuantidade}
    keyboardType="numeric"
  />
</View>


        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Data de validade</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowDataValidade(true)}>
            <Text style={[styles.inputText, !dataValidade && styles.placeholderText]}>
              {dataValidade ? formatDate(dataValidade) : 'Selecione a data'}
            </Text>
          </TouchableOpacity>
            <DateTimePickerModal
            isVisible={showDataValidade}
            mode="date"
            onConfirm={(date) => {
              setDataValidade(date);
              setShowDataValidade(false);
            }}
            onCancel={() => setShowDataValidade(false)}
            minimumDate={new Date()}
            locale="pt-BR"
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleCadastrar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Cadastrar Vacina</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/(protected)/(admin)/vaccins-list')}
        >
          <Ionicons name="list" size={18} color="#083474" />
          <Text style={styles.secondaryButtonText}>Ver vacinas cadastradas</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showUbsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowUbsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione a UBS</Text>
              <TouchableOpacity onPress={() => setShowUbsModal(false)}>
                <Ionicons name="close" size={24} color="#083474" />
              </TouchableOpacity>
            </View>

            {loadingUbs ? (
              <ActivityIndicator size="large" color="#083474" style={styles.modalLoader} />
            ) : (
              <ScrollView style={styles.modalList}>
                {ubsList.map((ubs) => (
                  <TouchableOpacity
                    key={ubs.id}
                    style={[
                      styles.modalItem,
                      selectedUbs?.id === ubs.id && styles.modalItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedUbs(ubs);
                      setShowUbsModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        selectedUbs?.id === ubs.id && styles.modalItemTextSelected,
                      ]}
                    >
                      {ubs.ubsName}
                    </Text>
                    {selectedUbs?.id === ubs.id && (
                      <Ionicons name="checkmark" size={20} color="#083474" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
      <Modal
  visible={showVaccinModal}
  transparent
  animationType="slide"
  onRequestClose={() => setShowVaccinModal(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Selecione a Vacina</Text>
        <TouchableOpacity onPress={() => setShowVaccinModal(false)}>
          <Ionicons name="close" size={24} color="#083474" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.modalList}>
        {vaccinsList.map((v) => (
          <TouchableOpacity
            key={v.id}
            style={[
              styles.modalItem,
              selectedVaccin?.id === v.id && styles.modalItemSelected,
            ]}
            onPress={() => {
              setSelectedVaccin(v);
              setShowVaccinModal(false);
            }}
          >
            <Text
              style={[
                styles.modalItemText,
                selectedVaccin?.id === v.id && styles.modalItemTextSelected,
              ]}
            >
              {v.name}
            </Text>
            {selectedVaccin?.id === v.id && (
              <Ionicons name="checkmark" size={20} color="#083474" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </View>
</Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  introSection: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#022757', marginBottom: 12 },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  fieldContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#022757', marginBottom: 8 },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: { fontSize: 16, color: '#022757', flex: 1 },
  placeholderText: { color: '#999' },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  halfWidth: { flex: 1 },
  submitButton: {
    backgroundColor: '#083474',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#022757' },
  modalLoader: { padding: 40 },
  modalList: { maxHeight: 400 },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalItemSelected: { backgroundColor: '#F0F7FF' },
  modalItemText: { fontSize: 16, color: '#022757', flex: 1 },
  modalItemTextSelected: { fontWeight: '600', color: '#083474' },
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#083474',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 40,
    gap: 8,
  },
  secondaryButtonText: { color: '#083474', fontSize: 16, fontWeight: '600' },
});
