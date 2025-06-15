import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from '@/services/api'; 

const VaccineCard = ({ vaccine }) => (
  <View style={styles.card}>
    <FontAwesome5 name="syringe" size={24} color="#000080" style={styles.cardIcon} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{vaccine.name}</Text>
      <Text style={styles.cardText}>Data: {vaccine.date}</Text>
      <Text style={styles.cardText}>Posto: {vaccine.post}</Text>
    </View>
  </View>
);

export default function VaccinCard() {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get('/api/v1/vaccincard/user/2');
        setVaccines(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000080" />

      {loading ? (
        <ActivityIndicator size="large" color="#000080" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={vaccines}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <VaccineCard vaccine={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});