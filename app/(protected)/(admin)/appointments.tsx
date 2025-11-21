import api from "@/api/api";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  id: number;
  name: string;
  cpf: string;
};

type Appointment = {
  id: number;
  date: string;
  vaccinId: number;
  vaccineName?: string;
  status: string;
};

export default function AdminAppointments() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState("Escolher usuário...");
  const [showUserModal, setShowUserModal] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  // Carrega usuários
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await api.get("/api/v1/users");
        setUsers(resp.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Buscar nome da vacina com cache
  const fetchVaccineName = async (
    vaccinId: number,
    cache: Record<number, string>
  ): Promise<string> => {
    if (cache[vaccinId]) {
      return cache[vaccinId];
    }

    try {
      const resp = await api.get(`/api/v1/vaccin/${vaccinId}`);
      const name = resp.data?.name || "Vacina";
      cache[vaccinId] = name;
      return name;
    } catch (error) {
      console.error("Erro ao buscar vacina:", error);
      return "Vacina";
    }
  };

  // Carregar agendamentos do usuário
 const fetchAppointments = async (userId: number) => {
  setLoadingAppointments(true);
  try {
    const resp = await api.get(`/api/v1/appointment/users/${userId}`);
    const raw = resp.data;

    if (!Array.isArray(raw)) {
      setAppointments([]);
      return;
    }

    const vaccineCache: Record<number, string> = {};

    const enriched = await Promise.all(
      raw.map(async (item: Appointment) => {
        const vaccineName = await fetchVaccineName(item.vaccinId, vaccineCache);
        return { ...item, vaccineName };
      })
    );

    setAppointments(enriched);
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
    setAppointments([]);
  } finally {
    setLoadingAppointments(false);
  }
};


  const selectUser = (user: User) => {
    setSelectedUserId(user.id);
    setSelectedUserName(`${user.name} • ${user.cpf}`);
    setShowUserModal(false);
    fetchAppointments(user.id);
  };

  const handleComplete = async (appointment: Appointment) => {
    try {
      await api.patch(`/api/v1/appointment/${appointment.id}/status`, {
        status: "completed",
      });

      await api.patch(`/api/v1/ubsvaccin/decrement/${appointment.vaccinId}`);

      Alert.alert("Sucesso", "Agendamento concluído e estoque atualizado!");

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointment.id ? { ...item, status: "completed" } : item
        )
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível concluir o agendamento.");
    }
  };

  if (loadingUsers) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#083474" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Selecione o usuário</Text>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowUserModal(true)}
        >
          <Text style={styles.selectButtonText}>{selectedUserName}</Text>
          <Ionicons name="chevron-down" size={20} color="#6C6C6C" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showUserModal}
          onRequestClose={() => setShowUserModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Selecionar usuário</Text>

              <ScrollView style={{ maxHeight: 350 }}>
                {users.map((u) => (
                  <TouchableOpacity
                    key={u.id}
                    style={styles.modalItem}
                    onPress={() => selectUser(u)}
                  >
                    <Text style={styles.modalItemText}>
                      {u.name} • {u.cpf}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowUserModal(false)}
              >
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {loadingAppointments && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#083474" />
          </View>
        )}

        {!loadingAppointments && appointments.length === 0 && selectedUserId && (
          <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
        )}

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Ionicons name="calendar" size={28} color="#083474" />

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{item.vaccineName}</Text>
                <Text style={styles.cardSub}>
                  Data: {item.date?.substring(0, 10)}
                </Text>
                <Text style={styles.cardSub}>
                  Status:{" "}
                  <Text style={{ fontWeight: "600" }}>
                    {item.status === "completed" ? "Concluído" : "Pendente"}
                  </Text>
                </Text>
              </View>

              {item.status !== "completed" && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleComplete(item)}
                >
                  <Text style={styles.completeButtonText}>Concluir</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#7A7A7A",
    marginBottom: 6,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 15,
    color: "#1C1C1C",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1C",
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  modalItemText: {
    fontSize: 15,
    color: "#1C1C1C",
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  modalCloseText: {
    fontSize: 15,
    color: "#083474",
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 20,
    fontSize: 15,
    color: "#6C6C6C",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1C1C",
  },
  cardSub: {
    fontSize: 13,
    color: "#6C6C6C",
  },
  completeButton: {
    backgroundColor: "#083474",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
