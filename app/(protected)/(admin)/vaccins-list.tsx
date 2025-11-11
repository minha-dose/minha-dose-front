import api from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Vaccine {
  id: number;
  name: string;
  batch: string | number;
  manufacturer: string;
  expiration: string;
  ubs: { id: number; ubsName: string }[];
}

export default function VaccinList() {
  const router = useRouter();
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVaccines = async () => {
    try {
      const response = await api.get('/api/v1/vaccin/');
      setVaccines(response.data);
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVaccines();
  };

  const deleteVaccine = async (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja remover esta vacina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/api/v1/vaccin/${id}`);
              setVaccines((prev) => prev.filter((v) => v.id !== id));
              Alert.alert('Sucesso', 'Vacina removida com sucesso.');
            } catch (error) {
              console.error('Erro ao deletar vacina:', error);
              Alert.alert('Erro', 'Não foi possível remover a vacina.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#083474" />
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#083474']}
          />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardBatch}>Lote {item.batch}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteVaccine(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#B00020" />
              </TouchableOpacity>
            </View>

            <Text style={styles.cardText}>Fabricante: {item.manufacturer}</Text>
            <Text style={styles.cardText}>
              UBS:{' '}
              {item.ubs.length > 0
                ? item.ubs.map((u) => u.ubsName).join(', ')
                : 'Não informada'}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.cardDate}>
                Validade: {formatDate(item.expiration)}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="medkit-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma vacina cadastrada ainda.</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: { alignSelf: 'center', marginVertical: 20 },
  backButtonText: { color: '#083474', fontSize: 16, fontWeight: '600' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#022757',
  },
  cardBatch: {
    fontSize: 14,
    color: '#555',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  cardFooter: {
    marginTop: 6,
  },
  cardDate: {
    fontSize: 13,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#999',
    marginTop: 10,
    fontSize: 16,
  },
});
