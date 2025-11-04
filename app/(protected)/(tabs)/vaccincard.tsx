import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import api from '../../../api/api';
import { globalStyles } from '../../../global';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '../../store/useUserStore';

interface Vaccine {
  id: number;
  name: string;
  manufacturer: string;
  batch: number;
  expiration: string;
}

export default function VaccinCardScreen() {
  const user = useUserStore((state) => state.user);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVaccines() {
      if (!user?.id) return;

      try {
        const response = await api.get(`/api/v1/vaccincard/user/${user.id}`);
        const vaccins = response.data?.vaccins || [];
        setVaccines(vaccins);
      } catch (error) {
        console.error('Erro ao buscar vacinas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVaccines();
  }, [user]);

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color="#003366" />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { padding: 16 }]}>
      <Text style={styles.title}>Histórico de vacinas</Text>

      {vaccines.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Nenhuma vacina no seu cartão</Text>
        </View>
      ) : (
        <FlatList
          data={vaccines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <MaterialCommunityIcons
                name="needle"
                size={30}
                color="#003366"
                style={styles.icon}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.vaccineName}>{item.name}</Text>
                <Text style={styles.text}>Fabricante: {item.manufacturer}</Text>
                <Text style={styles.text}>Lote: {item.batch}</Text>
                <Text style={styles.text}>
                  Validade: {new Date(item.expiration).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 12,
  },
  vaccineName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    color: '#444',
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 20,
  },
});
