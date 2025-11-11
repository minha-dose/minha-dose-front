import api from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Vaccine {
  id: number;
  name: string;
  batch: string;
  manufacturer: string;
  manufacturingDate: string;
  expirationDate: string;
  quantityReceived: number;
  receiptDate: string;
  ubsName?: string;
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#083474" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#083474']} />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardBatch}>Lote {item.batch}</Text>
            </View>

            <Text style={styles.cardText}>Fabricante: {item.manufacturer}</Text>
            <Text style={styles.cardText}>UBS: {item.ubsName || 'Não informada'}</Text>
            <Text style={styles.cardText}>Qtd. recebida: {item.quantityReceived}</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.cardDate}>
                Fab: {item.manufacturingDate} | Val: {item.expirationDate}
              </Text>
              <Text style={styles.cardDate}>Recebida: {item.receiptDate}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backButton: { alignSelf: "center", marginVertical: 20 },
  backButtonText: { color: "#083474", fontSize: 16, fontWeight: "600" },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#083474',
  },
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
