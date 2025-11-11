import api from '@/api/api';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NewUbs() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [ubsName, setUbsName] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [zipCode, setZipCode] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastrar = async () => {
    if (!ubsName.trim()) {
      Alert.alert('Atenção', 'Preencha o nome da UBS.');
      return;
    }
    if (!street.trim() || !city.trim() || !district.trim()) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios do endereço.');
      return;
    }
    if (!phone.trim() || !email.trim()) {
      Alert.alert('Atenção', 'Preencha o telefone e o e-mail de contato.');
      return;
    }

    setLoading(true);

    const payload = {
      ubsName: ubsName.trim(),
      address: {
        street: street.trim(),
        city: city.trim(),
        district: district.trim(),
        neighborhood: neighborhood.trim(),
        country: country.trim(),
        zipCode: zipCode.trim(),
        extraInfo: extraInfo.trim(),
      },
      contact: {
        phone: phone.trim(),
        email: email.trim(),
      },
    };

    try {
      await api.post('/api/v1/ubs', payload);
      Alert.alert('Sucesso', 'UBS cadastrada com sucesso!');
      // Limpa o formulário
      setUbsName('');
      setStreet('');
      setNeighborhood('');
      setCity('');
      setDistrict('');
      setCountry('Brasil');
      setZipCode('');
      setExtraInfo('');
      setPhone('');
      setEmail('');
    } catch (error: any) {
      console.error('Erro ao cadastrar UBS:', error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        'Não foi possível cadastrar a UBS. Verifique os dados e tente novamente.';
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
          <Text style={styles.title}>Cadastre uma nova UBS!</Text>
          <Text style={styles.description}>
            Preencha as informações abaixo para cadastrar uma nova Unidade Básica de Saúde no sistema.
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nome da UBS</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da UBS"
            placeholderTextColor="#999"
            value={ubsName}
            onChangeText={setUbsName}
          />
        </View>

        <Text style={[styles.label, { marginBottom: 8 }]}>Endereço</Text>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Rua / Avenida"
            placeholderTextColor="#999"
            value={street}
            onChangeText={setStreet}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <TextInput
              style={styles.input}
              placeholder="Bairro"
              placeholderTextColor="#999"
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
          </View>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              placeholderTextColor="#999"
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <TextInput
              style={styles.input}
              placeholder="Estado (ex: PE)"
              placeholderTextColor="#999"
              value={district}
              onChangeText={setDistrict}
            />
          </View>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <TextInput
              style={styles.input}
              placeholder="CEP"
              placeholderTextColor="#999"
              value={zipCode}
              onChangeText={setZipCode}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Informações adicionais (ex: nº, complemento)"
            placeholderTextColor="#999"
            value={extraInfo}
            onChangeText={setExtraInfo}
          />
        </View>

        <Text style={[styles.label, { marginBottom: 8 }]}>Contato</Text>
        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleCadastrar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Cadastrar UBS</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/(protected)/(admin)/ubs-list")}
      >
        <Text style={styles.secondaryButtonText}>Visualizar UBS cadastradas</Text>
      </TouchableOpacity>
      </ScrollView>
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
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#083474",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: "#083474",
    fontSize: 16,
    fontWeight: "600",
  },
});
