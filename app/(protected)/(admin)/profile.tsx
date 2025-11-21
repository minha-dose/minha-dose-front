import api from "@/api/api";
import { useUserStore } from "@/app/store/useUserStore";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  id: number;
  name: string;
  cpf: string;
  email: string;
};

export default function AdminProfile() {
  const router = useRouter();

  const user = useUserStore((state) => state.user) as User | null;
  const setUser = useUserStore((state) => state.setUser);

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Busca dados do usuário logado
  useEffect(() => {
    if (!user?.id) return;

    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/v1/users/${user.id}`);
        setUserData(response.data as User);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    router.replace("/");
  };

  // Salvar edição
  const handleSave = async () => {
    if (!user || !userData) return;

    setIsSaving(true);

    try {
      await api.put(`/api/v1/users/${user.id}`, {
        name: userData.name,
        email: userData.email,
      });

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os dados.");
      console.error("Erro ao atualizar usuário:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#083474" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: "#6C6C6C" }}>
          Não foi possível carregar o perfil.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Admin • Meu Cadastro</Text>

          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome name="sign-out" size={24} color="#083474" />
          </TouchableOpacity>
        </View>

        {/* Perfil */}
        <View style={styles.profileRow}>
          <Ionicons name="person-circle" size={64} color="#083474" />

          <View style={styles.userInfo}>
            {isEditing ? (
              <>
                <TextInput
                  value={userData.name}
                  onChangeText={(text) =>
                    setUserData({ ...userData, name: text })
                  }
                  style={styles.input}
                />

                <TextInput
                  value={userData.cpf}
                  editable={false}
                  style={[styles.input, { backgroundColor: "#EAEAEA" }]}
                />
              </>
            ) : (
              <>
                <Text style={styles.userName}>
                  {userData.name || "Nome não informado"}
                </Text>
                <Text style={styles.userCpf}>
                  {userData.cpf || "CPF não informado"}
                </Text>
              </>
            )}
          </View>

          {/* Botão editar */}
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setIsEditing((prev) => !prev)}
          >
            <MaterialIcons name="edit" size={22} color="#083474" />
          </TouchableOpacity>
        </View>

        {/* E-mail */}
        <View style={styles.infoBlock}>
          <Text style={styles.label}>E-mail</Text>

          {isEditing ? (
            <TextInput
              value={userData.email}
              onChangeText={(text) =>
                setUserData({ ...userData, email: text })
              }
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>
              {userData.email || "E-mail não informado"}
            </Text>
          )}
        </View>

        {/* Botão salvar */}
        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#4A4A4A",
    fontWeight: "600",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1C",
  },
  userCpf: {
    fontSize: 14,
    color: "#6C6C6C",
  },
  infoBlock: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: "#7A7A7A",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1C1C1C",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: "#083474",
    paddingVertical: 12,
    marginTop: 25,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
