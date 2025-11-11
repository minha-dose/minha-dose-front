import api from "@/api/api";
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function UbsListAdmin() {
  const [ubsList, setUbsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUbs, setSelectedUbs] = useState(null);
  const router = useRouter();

  async function fetchUbs() {
    try {
      const response = await api.get('/api/v1/ubs/');
      setUbsList(response.data);
    } catch (error) {
      console.error("Erro ao buscar UBS:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUbs();
  }, []);

  const openModal = (ubs) => {
    setSelectedUbs(ubs);
    setModalVisible(true);
  };

  const deleteUbs = async (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja remover esta UBS?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/api/v1/ubs/${id}`);
              setUbsList((prev) => prev.filter((ubs) => ubs.id !== id));
              setModalVisible(false);
              Alert.alert("Sucesso", "UBS removida com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir UBS:", error);
              Alert.alert("Erro", "Não foi possível remover a UBS.");
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
        <Text>Carregando UBSs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ubsList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <FontAwesome6 name="hospital" size={40} color="#083474" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.ubsName}>{item.ubsName}</Text>
              <Text style={styles.ubsAddress}>
                {item.address?.street}, {item.address?.neighborhood},{" "}
                {item.address?.city} - {item.address?.district}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => openModal(item)}
              >
                <Text style={styles.buttonText}>Ver Detalhes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedUbs?.ubsName}</Text>
            <Text style={styles.modalText}>
              <Text style={styles.label}>Endereço: </Text>
              {selectedUbs?.address?.street}, {selectedUbs?.address?.neighborhood},{" "}
              {selectedUbs?.address?.city} - {selectedUbs?.address?.district}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.label}>Contato: </Text>
              {selectedUbs?.contact?.phone} | {selectedUbs?.contact?.email}
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={() => deleteUbs(selectedUbs?.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir UBS</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#022757",
    textAlign: "center",
    marginTop: 16,
  },
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: { marginRight: 16 },
  cardContent: { flex: 1 },
  ubsName: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  ubsAddress: { fontSize: 14, color: "#555", marginBottom: 12 },
  button: {
    borderWidth: 1,
    borderColor: "#083474",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
  },
  buttonText: { color: "#083474", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#083474",
  },
  modalText: { fontSize: 16, marginBottom: 8, lineHeight: 22 },
  label: { fontWeight: "bold" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteButton: { backgroundColor: "#E53935" },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  closeButton: { backgroundColor: "#083474" },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
  backButton: { alignSelf: "center", marginVertical: 20 },
  backButtonText: { color: "#083474", fontSize: 16, fontWeight: "600" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
