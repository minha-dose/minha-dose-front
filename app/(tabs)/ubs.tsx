import { FontAwesome6 } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ubsList = [
  {
    id: "1",
    name: "Ubs Boa Viagem",
    address: "Rua Conselheiro aguiar, 258",
  },
  {
    id: "2",
    name: "Ubs Boa Viagem",
    address: "Rua Conselheiro aguiar, 258",
  },
  {
    id: "3",
    name: "Ubs Boa Viagem",
    address: "Rua Conselheiro aguiar, 258",
  },
  {
    id: "4",
    name: "Ubs Boa Viagem",
    address: "Rua Conselheiro aguiar, 258",
  },
];

export default function Ubs() {
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
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ver Detalhes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
});
