import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions, // Para pegar a largura da tela
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"; // Ícone de caneta e vacinas
import { useRouter } from "expo-router"; // Para navegação
import { globalStyles } from "../styles/globalStyle"; // Assumindo que você tem um globalStyle.ts na pasta 'styles'

const { width } = Dimensions.get('window');

// Dados de exemplo para as vacinas (você pode expandir isso com mais detalhes)
const vaccineData = [
  {
    id: "1",
    name: "Febre Amarela",
    description: "Protege contra a febre amarela.",
    technicalDetails: "Vacina de vírus atenuado. Dose única em áreas de risco. Necessário reforço a cada 10 anos para viajantes.",
    ubsAvailable: ["UBS Boa Viagem", "UBS Pina"], // Nomes das UBSs que possuem
  },
  {
    id: "2",
    name: "Tríplice Viral",
    description: "Protege contra sarampo, caxumba e rubéola.",
    technicalDetails: "Duas doses são recomendadas para a maioria das pessoas. Primeira dose aos 12 meses e segunda entre 15 e 18 meses.",
    ubsAvailable: ["UBS Pina", "UBS Imbiribeira"],
  },
  {
    id: "3",
    name: "Gripe",
    description: "Protege contra os vírus da gripe.",
    technicalDetails: "Dose anual, especialmente para grupos de risco. A composição da vacina muda a cada ano.",
    ubsAvailable: ["UBS Boa Viagem", "UBS Espinheiro"],
  },
  {
    id: "4",
    name: "Dengue",
    description: "Protege contra a dengue.",
    technicalDetails: "Vacina tetravalente, para indivíduos de 9 a 45 anos que já tiveram dengue confirmada. Esquema de 3 doses.",
    ubsAvailable: ["UBS Boa Viagem"],
  },
  {
    id: "5",
    name: "Chikungunya",
    description: "Protege contra o vírus Chikungunya.",
    technicalDetails: "Vacina ainda em fase de estudos/disponibilidade limitada no SUS. Protocolos específicos de uso.",
    ubsAvailable: ["UBS Boa Vista"],
  },
  {
    id: "6",
    name: "Zika",
    description: "Protege contra o vírus Zika.",
    technicalDetails: "Atualmente, não há vacina licenciada para o vírus Zika. Prevenção é baseada no controle do mosquito.",
    ubsAvailable: [], // Não disponível em UBS, para demonstrar o caso
  },
];

export default function VaccinsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVaccines, setFilteredVaccines] = useState(vaccineData);

  // Função de pesquisa
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const newData = vaccineData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredVaccines(newData);
    } else {
      setFilteredVaccines(vaccineData);
    }
  };

  const renderVaccineItem = ({ item }: { item: typeof vaccineData[0] }) => (
    <TouchableOpacity
      style={styles.vaccineCard}
      onPress={() => router.push({
        pathname: "/vaccine-details", // Rota para detalhes da vacina (será criada abaixo)
        params: {
          name: item.name,
          description: item.description,
          technicalDetails: item.technicalDetails,
          ubsAvailable: JSON.stringify(item.ubsAvailable), // Passa array como string
        },
      })}
    >
      <MaterialIcons name="vaccines" size={24} color="#002856" style={styles.vaccineIcon} />
      <Text style={styles.vaccineName}>{item.name}</Text>
      {/* Aqui estava a tag de fechamento para o ícone de caneta que pode ter causado o problema */}
      <FontAwesome5 name="pencil-alt" size={16} color="#002856" /> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a sua próxima dose</Text>

      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar vacinas disponíveis"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {/* Adicionado o fechamento correto do TextInput que estava faltando na imagem */}
      </View>

      <FlatList
        data={filteredVaccines}
        keyExtractor={(item) => item.id}
        renderItem={renderVaccineItem}
        contentContainerStyle={styles.vaccinesList}
      />
      {/* Adicionado o fechamento correto do FlatList que estava faltando na imagem */}

      <TouchableOpacity
        style={styles.chooseUbsButton}
        onPress={() => router.push("/ubs")} // Navega para a tela de UBS
      >
        <Text style={styles.chooseUbsButtonText}>Escolher UBS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#002856",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  vaccinesList: {
    paddingBottom: 20,
  },
  vaccineCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  vaccineIcon: {
    marginRight: 15,
  },
  vaccineName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  chooseUbsButton: {
    backgroundColor: "#002856",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    width: width - 32, // Para centralizar e ter margem
    alignSelf: 'center', // Centraliza o botão
  },
  chooseUbsButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});