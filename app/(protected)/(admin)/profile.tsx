import api from "@/api/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AdminProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/v1/users/7");
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Meu Cadastro</Text>

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
  header: {
    backgroundColor: "#083474",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "500",
    marginBottom: 10,
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
