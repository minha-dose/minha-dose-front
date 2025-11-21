import api from "@/api/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Ubs {
  id: number;
  ubsName: string;
}

interface VaccinByUbs {
  id: number;
  batch: string;
  manufacturer: string;
  expiration: string;
  quantity: number;
  vaccinId: number;
  ubsId: number;
  vaccin: {
    id: number;
    name: string;
  };
}

export default function VaccinList() {
  const router = useRouter();

  const [ubsList, setUbsList] = useState<Ubs[]>([]);
  const [selectedUbs, setSelectedUbs] = useState<Ubs | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [vaccines, setVaccines] = useState<VaccinByUbs[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Buscar UBS
  const fetchUbs = async () => {
    try {
      const response = await api.get("/api/v1/ubs/");
      setUbsList(response.data);
    } catch (err) {
      console.log("Erro ao buscar UBS:", err);
    } finally {
      setLoading(false);
    }
  };

  // Buscar vacinas da UBS selecionada
  const fetchVaccinesByUbs = async (ubsId: number) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/v1/ubsvaccin/findVaccinByUbsId/${ubsId}`
      );
      setVaccines(response.data);
    } catch (err) {
      console.log("Erro ao buscar vacinas por UBS:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUbs();
  }, []);

  // Quando escolher UBS
  useEffect(() => {
    if (selectedUbs) {
      fetchVaccinesByUbs(selectedUbs.id);
    }
  }, [selectedUbs]);

  const onRefresh = () => {
    if (!selectedUbs) return;
    setRefreshing(true);
    fetchVaccinesByUbs(selectedUbs.id);
  };

  const deleteVaccine = async (id: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja remover esta vacina?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/api/v1/vaccin/${id}`);
              setVaccines((prev) => prev.filter((v) => v.id !== id));
              Alert.alert("Sucesso", "Vacina removida com sucesso.");
            } catch (error) {
              console.error("Erro ao deletar vacina:", error);
              Alert.alert("Erro", "Não foi possível remover a vacina.");
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione uma UBS</Text>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>
          {selectedUbs ? selectedUbs.ubsName : "Escolher UBS"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#022757" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Escolha a UBS</Text>

            <ScrollView style={{ maxHeight: 300 }}>
              {ubsList.map((u) => (
                <TouchableOpacity
                  key={u.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedUbs(u);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{u.ubsName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading && !selectedUbs && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#083474" />
        </View>
      )}

      {selectedUbs && (
        <FlatList
          data={vaccines}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{item.vaccin.name}</Text>
                  <Text style={styles.cardBatch}>Lote {item.batch}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteVaccine(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="#B00020" />
                </TouchableOpacity>
              </View>

              <Text style={styles.cardText}>
                Fabricante: {item.manufacturer}
              </Text>

              <Text style={styles.cardText}>
                Quantidade: {item.quantity}
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
              <Text style={styles.emptyText}>
                Nenhuma vacina cadastrada nesta UBS.
              </Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    color: "#022757",
  },

  selectButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    marginTop: 6,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonText: { fontSize: 15, color: "#022757" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#022757",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalItemText: { fontSize: 16, color: "#022757" },
  modalCloseButton: {
    marginTop: 14,
    alignSelf: "flex-end",
  },
  modalCloseText: {
    fontSize: 15,
    color: "#B00020",
    fontWeight: "600",
  },

  loadingContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#022757" },
  cardBatch: { fontSize: 14, color: "#555" },
  cardText: { fontSize: 14, color: "#333", marginBottom: 4 },
  cardFooter: { marginTop: 6 },
  cardDate: { fontSize: 13, color: "#666" },
  emptyContainer: { alignItems: "center", marginTop: 60 },
  emptyText: { color: "#999", marginTop: 10, fontSize: 16 },

  backButton: { alignSelf: "center", marginVertical: 20 },
  backButtonText: { color: "#083474", fontSize: 16, fontWeight: "600" },
});
