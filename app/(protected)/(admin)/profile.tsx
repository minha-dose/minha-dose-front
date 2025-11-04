import api from "@/api/api";
import { useUserStore } from "@/app/store/useUserStore"; // 👈 mesmo store do usuário comum
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AdminProfile() {
  const router = useRouter();
  const { setUser } = useUserStore(); // 👈 para limpar o usuário no logout
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/v1/users/7");
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    setUser(null); // limpa Zustand
    router.replace("/"); // volta pra tela inicial ou login
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#083474" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: "#6C6C6C" }}>Não foi possível carregar o perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Meu Cadastro</Text>

          {/* 👇 Botão de logout adicionado aqui */}
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome name="sign-out" size={20} color="#083474" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileRow}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={64} color="#083474" />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name || "Nome não informado"}</Text>
            <Text style={styles.userCpf}>{user.cpf || "CPF não informado"}</Text>
          </View>

          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={() => router.push("/(protected)/(admin)/settings")}>
              <Ionicons name="settings-sharp" size={20} color="#083474" />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 10 }}>
              <MaterialIcons name="edit" size={20} color="#083474" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{user.email || "E-mail não informado"}</Text>
        </View>
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
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "500",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1C",
  },
  userCpf: {
    fontSize: 14,
    color: "#6C6C6C",
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 14,
    color: "#1C1C1C",
    fontWeight: "500",
  },
});
