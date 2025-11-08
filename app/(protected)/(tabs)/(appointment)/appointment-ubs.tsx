import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../../../../api/api";
import { globalStyles } from "../../../../global";

type Ubs = {
  id: number;
  ubsName: string;
};

export default function AppointmentUbs() {
  const { vaccineId } = useLocalSearchParams<{ vaccineId: string }>();
  const [ubsList, setUbsList] = useState<Ubs[]>([]);
  const [selectedUbsId, setSelectedUbsId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUbs = async () => {
    try {
      const response = await api.get("/api/v1/ubs/");
      setUbsList(response.data);
    } catch (error) {
      console.error("Erro ao buscar UBS:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setSelectedUbsId(null);
      fetchUbs();
      return () => setUbsList([]);
    }, [])
  );

 if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFF",
        }}
      >
        <ActivityIndicator size="large" color="#002856" />
        <Text style={{ marginTop: 10, color: "#002856" }}>
          Carregando vacinas...
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.appointmentMainView}>
      <Text style={globalStyles.appointmentScreenTitle}>
        Agora, selecione a melhor UBS para você:
      </Text>

      <FlatList
        data={ubsList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={globalStyles.appointmentFlatListContainer}
        renderItem={({ item }) => {
          const isSelected = selectedUbsId === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelectedUbsId(item.id);
              }}
            >
              <View
                style={[
                  globalStyles.appointmentFlatListItem,
                  {
                    backgroundColor: isSelected ? "#dce3f5" : "#fff",
                    borderColor: isSelected ? "#022757" : "#ccc",
                    borderWidth: isSelected ? 2 : 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  },
                ]}
              >
                <FontAwesome6 name="hospital" size={30} color="#002856" />
                <Text style={globalStyles.appointmentFlatListText}>
                  {item.ubsName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={globalStyles.appointmentEmptyText}>
            Nenhuma UBS encontrada!
          </Text>
        }
      />
    </View>
  );
}