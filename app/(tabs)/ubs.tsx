import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ubsList = [
  {
    id: "1",
    name: "UBS Boa Viagem",
    address: "Rua Conselheiro Aguiar, 258, Boa Viagem, Recife - PE",
    horario: "7h às 8h - Segunda a sexta\n8h às 12h - Sábado",
  },
  {
    id: "2",
    name: "UBS Boa Viagem",
    address: "Rua Conselheiro Aguiar, 258, Boa Viagem, Recife - PE",
    horario: "7h às 8h - Segunda a sexta\n8h às 12h - Sábado",
  },
  {
    id: "3",
    name: "UBS Boa Viagem",
    address: "Rua Conselheiro Aguiar, 258, Boa Viagem, Recife - PE",
    horario: "7h às 8h - Segunda a sexta\n8h às 12h - Sábado",
  },
  {
    id: "4",
    name: "UBS Boa Viagem",
    address: "Rua Conselheiro Aguiar, 258, Boa Viagem, Recife - PE",
    horario: "7h às 8h - Segunda a sexta\n8h às 12h - Sábado",
  },
];

export default function Ubs() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUbs, setSelectedUbs] = useState(null);

  const openModal = (ubs) => {
    setSelectedUbs(ubs);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ubsList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <FontAwesome6 name="hospital" size={40} color="#002856" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.ubsName}>{item.name}</Text>
              <Text style={styles.ubsAddress}>{item.address}</Text>
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

      {/* Modal com detalhes da UBS */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedUbs?.name}</Text>
            <Text style={styles.modalText}>
              <Text style={styles.label}>Endereço: </Text>
              {selectedUbs?.address}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.label}>Horário de Funcionamento: </Text>
              {selectedUbs?.horario}
            </Text>

            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: {
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  ubsName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ubsAddress: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  button: {
    borderWidth: 1,
    borderColor: "#002856",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#002856",
    fontWeight: "bold",
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#002856",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  label: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 16,
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#002856",
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
