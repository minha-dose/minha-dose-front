import api from "@/api/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function NewUser() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idade, setIdade] = useState("");
  const [role, setRole] = useState(""); // Ex: "admin", "user", "doctor", etc.
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !cpf || !email || !senha || !idade || !role) {
      Alert.alert("Atenção", "Preencha todos os campos antes de continuar.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/v1/users/", {
        name: nome,
        cpf: cpf,
        email: email,
        password: senha,
        age: parseInt(idade, 10),
        role: role,
      });

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      router.back();

      // limpa campos
      setNome("");
      setCpf("");
      setEmail("");
      setSenha("");
      setIdade("");
      setRole("");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Não foi possível criar o usuário. Verifique os dados e tente novamente.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Novo Usuário</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="CPF"
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          placeholder="Idade"
          keyboardType="numeric"
          style={styles.input}
          value={idade}
          onChangeText={setIdade}
        />
        <TextInput
          placeholder="Função"
          style={styles.input}
          value={role}
          onChangeText={setRole}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#083474",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  content: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#083474",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
});
