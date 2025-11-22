import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import api from '../../../api/api';
import { globalStyles } from '../../../global';
import { useUserStore } from '../../store/useUserStore';

interface Vaccine {
  id: number;
  name: string;
  manufacturer: string;
  batch: string;
  expiration: string;
  date: string;
  ubsName: string;
}

export default function VaccinCardScreen() {
  const user = useUserStore((state) => state.user);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVaccines() {
      if (!user?.id) return;

      try {
        // Buscar agendamentos concluídos do usuário
        const appointmentsResponse = await api.get(`/api/v1/appointment/users/${user.id}`);
        const appointments = appointmentsResponse.data || [];

        // Filtrar apenas agendamentos concluídos
        const completedAppointments = appointments.filter(
          (apt: any) => apt.status === 'completed'
        );

        // Para cada agendamento concluído, buscar os detalhes da vacina
        const vaccinesData = await Promise.all(
          completedAppointments.map(async (apt: any) => {
            try {
              // Buscar todas as UBS que têm essa vacina
              const ubsVaccinResponse = await api.get(
                `/api/v1/ubsvaccin/findUbsVaccinByVaccinId/${apt.vaccinId}`
              );
              const ubsVaccins = ubsVaccinResponse.data;

              // Filtrar pela UBS específica do agendamento
              const ubsVaccinData = ubsVaccins.find(
                (item: any) => item.ubsId === apt.ubsId
              );

              if (!ubsVaccinData) {
                console.error(`UBS Vaccin não encontrada para agendamento ${apt.id}`);
                return null;
              }

              return {
                id: apt.id,
                name: ubsVaccinData.vaccin?.name || 'Vacina',
                manufacturer: ubsVaccinData.manufacturer,
                batch: ubsVaccinData.batch,
                expiration: ubsVaccinData.expiration,
                date: apt.date,
                ubsName: ubsVaccinData.ubs?.ubsName || 'UBS',
              };
            } catch (error) {
              console.error(`Erro ao buscar detalhes da vacina ${apt.id}:`, error);
              return null;
            }
          })
        );

        // Filtrar valores nulos e definir as vacinas
        const validVaccines = vaccinesData.filter((v) => v !== null) as Vaccine[];
        setVaccines(validVaccines);
      } catch (error: any) {
        if (error.response?.status === 404) {
          // Usuário não tem agendamentos
          setVaccines([]);
        } else {
          console.error('Erro ao buscar vacinas:', error);
        }
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
                <Text style={styles.text}>Local: {item.ubsName}</Text>
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
