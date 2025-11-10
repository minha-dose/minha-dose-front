import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import api from "../../../../api/api";
import { globalStyles } from "../../../../global";

type Vaccin = {
  id: number;
  name: string;
};

export default function AppointmentScreen() {
  const [vaccins, setVaccins] = useState<Vaccin[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getVaccinList = async () => {
    try {
      const response = await api.get("/api/v1/vaccin/");
      setVaccins(response.data);
    } catch (error) {
      console.log("Erro ao recuperar a lista de vacinas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVaccinByName = async (name: string) => {
    try {
      const response = await api.get(`/api/v1/vaccin/findByName?name=${encodeURIComponent(name.trim().toLowerCase())}`);
      console.log("Resposta:", response.data);

      const data = Array.isArray(response.data) ? response.data : [response.data];
      setVaccins(data);
    } catch (error: any) {
      console.log(
        "Erro ao recuperar a vacina:",
        error.response?.status,
        error.response?.data || error.message
      );
      setVaccins([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setSelectedId(null);
      getVaccinList();
      return () => setVaccins([]);
    }, [])
  );

  if (loading) {
    return (
      <View style={globalStyles.loadingAppointment}>
        <ActivityIndicator size="large" color="#002856" />
        <Text style={globalStyles.loadingAppointmentTxt}>
          Carregando vacinas...
        </Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[globalStyles.appointmentMainView, { flex: 1 }]}>
        <Text style={globalStyles.appointmentScreenTitle}>
          Para realizar o agendamento, escolha uma vacina:
        </Text>

        <View style={globalStyles.appointmentSearchContainer}>
          <FontAwesome5
            name="search"
            size={18}
            color="#555"
            style={globalStyles.appointmentSearchIcon}
          />
          <TextInput
            style={globalStyles.appointmentSearchInput}
            placeholder="Pesquisar vacina"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (search.trim() === "") {
                getVaccinList();
              } else {
                getVaccinByName(search);
              }
            }}
          />
        </View>

        <FlatList
          data={vaccins}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedId;
            return (
              <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    globalStyles.appointmentFlatListItem,
                    {
                      backgroundColor: isSelected ? "#dce3f5" : "#fff",
                      borderColor: isSelected ? "#022757" : "#ccc",
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                  <Text style={globalStyles.appointmentFlatListText}>
                    <FontAwesome5 name="syringe" size={20} color="#022757" />{" "}
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <Text style={globalStyles.appointmentEmptyText}>
              Ops... Nenhuma vacina encontrada!
            </Text>
          }
          contentContainerStyle={[
            globalStyles.appointmentFlatListContainer,
            { paddingBottom: 100 },
          ]}
        />

        {selectedId && (
          <View style={globalStyles.appointmentUbsChooseView}>
            <TouchableOpacity
              style={globalStyles.appointmentUbsChooseBtn}
              onPress={() =>
                router.push({
                  pathname: "/(protected)/(tabs)/(appointment)/appointment-ubs",
                  params: { vaccineId: selectedId },
                })
              }
            >
              <Text style={globalStyles.appointUbsChooseBtnTitle}>
                Selecionar UBS
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}