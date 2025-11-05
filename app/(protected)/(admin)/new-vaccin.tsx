import api from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function NewVaccin() {
  const router = useRouter();
  const [ubsList, setUbsList] = useState<UBS[]>([]);
  const [selectedUbs, setSelectedUbs] = useState<UBS | null>(null);
  const [showUbsModal, setShowUbsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUbs, setLoadingUbs] = useState(true);

  // Form fields
  const [nomeVacina, setNomeVacina] = useState('');
  const [lote, setLote] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [quantidade, setQuantidade] = useState('');

  // Date states
  const [dataFabricacao, setDataFabricacao] = useState<Date | null>(null);
  const [showDataFabricacao, setShowDataFabricacao] = useState(false);
  const [dataValidade, setDataValidade] = useState<Date | null>(null);
  const [showDataValidade, setShowDataValidade] = useState(false);
  const [dataRecebimento, setDataRecebimento] = useState<Date | null>(null);
  const [showDataRecebimento, setShowDataRecebimento] = useState(false);

  useEffect(() => {
    fetchUbs();
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

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    field: 'fabricacao' | 'validade' | 'recebimento'
  ) => {
    if (Platform.OS === 'android') {
      if (field === 'fabricacao') setShowDataFabricacao(false);
      if (field === 'validade') setShowDataValidade(false);
      if (field === 'recebimento') setShowDataRecebimento(false);
    }

    if (selectedDate) {
      if (field === 'fabricacao') setDataFabricacao(selectedDate);
      if (field === 'validade') setDataValidade(selectedDate);
      if (field === 'recebimento') setDataRecebimento(selectedDate);
    }
  };

  const handleCadastrar = async () => {
    // Validation
    if (!selectedUbs) {
      Alert.alert('Atenção', 'Selecione uma UBS.');
      return;
    }
    if (!nomeVacina.trim()) {
      Alert.alert('Atenção', 'Preencha o nome da vacina.');
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
    if (!dataFabricacao) {
      Alert.alert('Atenção', 'Selecione a data de fabricação.');
      return;
    }
    if (!dataValidade) {
      Alert.alert('Atenção', 'Selecione a data de validade.');
      return;
    }
    if (!quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha a quantidade recebida.');
      return;
    }
    if (!dataRecebimento) {
      Alert.alert('Atenção', 'Selecione a data de recebimento.');
      return;
    }

    setLoading(true);

    try {
      // Format dates for API (ISO format)
      const formatDateForAPI = (date: Date) => {
        return date.toISOString().split('T')[0];
      };

      const payload = {
        ubsId: selectedUbs.id,
        name: nomeVacina.trim(),
        batch: lote.trim(),
        manufacturer: fabricante.trim(),
        manufacturingDate: formatDateForAPI(dataFabricacao),
        expirationDate: formatDateForAPI(dataValidade),
        quantityReceived: parseInt(quantidade, 10),
        receiptDate: formatDateForAPI(dataRecebimento),
      };

      await api.post('/api/v1/vaccines/', payload);

      Alert.alert('Sucesso', 'Vacina cadastrada com sucesso!');
      
      // Reset form
      setSelectedUbs(null);
      setNomeVacina('');
      setLote('');
      setFabricante('');
      setQuantidade('');
      setDataFabricacao(null);
      setDataValidade(null);
      setDataRecebimento(null);
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
        {/* Title and Description */}
        <View style={styles.introSection}>
          <Text style={styles.title}>Cadastre uma nova vacina!</Text>
          <Text style={styles.description}>
            Cada novo lote recebido equivale a uma nova vacina. Preencha abaixo os dados básicos da vacina recebida para sua disponibilização.
          </Text>
        </View>

        {/* UBS Selection */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Escolha a ubs</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowUbsModal(true)}
          >
            <Text style={[styles.inputText, !selectedUbs && styles.placeholderText]}>
              {selectedUbs ? selectedUbs.ubsName : 'Selecione uma UBS'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Nome da Vacina */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nome da vacina</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da vacina"
            placeholderTextColor="#999"
            value={nomeVacina}
            onChangeText={setNomeVacina}
          />
        </View>

        {/* Lote e Fabricante */}
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

        {/* Data de Fabricação e Data de Validade */}
        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Data de fabricação</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDataFabricacao(true)}
            >
              <Text style={[styles.inputText, !dataFabricacao && styles.placeholderText]}>
                {dataFabricacao ? formatDate(dataFabricacao) : 'Selecione a data'}
              </Text>
            </TouchableOpacity>
            {showDataFabricacao && (
              <DateTimePicker
                value={dataFabricacao || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => handleDateChange(event, date, 'fabricacao')}
                maximumDate={new Date()}
              />
            )}
          </View>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Data de validade</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDataValidade(true)}
            >
              <Text style={[styles.inputText, !dataValidade && styles.placeholderText]}>
                {dataValidade ? formatDate(dataValidade) : 'Selecione a data'}
              </Text>
            </TouchableOpacity>
            {showDataValidade && (
              <DateTimePicker
                value={dataValidade || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => handleDateChange(event, date, 'validade')}
                minimumDate={new Date()}
              />
            )}
          </View>
        </View>

        {/* Quantidade Recebida e Data de Recebimento */}
        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Quantidade recebida</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a quantidade"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />
          </View>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Data de recebimento</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDataRecebimento(true)}
            >
              <Text style={[styles.inputText, !dataRecebimento && styles.placeholderText]}>
                {dataRecebimento ? formatDate(dataRecebimento) : 'Selecione a data'}
              </Text>
            </TouchableOpacity>
            {showDataRecebimento && (
              <DateTimePicker
                value={dataRecebimento || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => handleDateChange(event, date, 'recebimento')}
                maximumDate={new Date()}
              />
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleCadastrar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Cadastra Vacina</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* UBS Selection Modal */}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  introSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#022757',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#022757',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#022757',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#022757',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#083474',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#022757',
  },
  modalLoader: {
    padding: 40,
  },
  modalList: {
    maxHeight: 400,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalItemSelected: {
    backgroundColor: '#F0F7FF',
  },
  modalItemText: {
    fontSize: 16,
    color: '#022757',
    flex: 1,
  },
  modalItemTextSelected: {
    fontWeight: '600',
    color: '#083474',
  },
});
