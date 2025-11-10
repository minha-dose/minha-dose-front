import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import api from "../../../../api/api";
import { globalStyles } from "../../../../global";
import { useUserStore } from "../../../store/useUserStore";

type Ubs = {
  id: number;
  ubsName: string;
};

export default function AppointmentUbs() {
  const { vaccineId } = useLocalSearchParams<{ vaccineId: string }>();
  const user = useUserStore((state) => state.user);
  const [ubsList, setUbsList] = useState<Ubs[]>([]);
  const [selectedUbsId, setSelectedUbsId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const fetchUbsByVaccine = async () => {
    try {
      const response = await api.get(`/api/v1/vaccin/${vaccineId}`);
      setUbsList(response.data.ubs || []);
    } catch (error) {
      console.error("Erro ao buscar UBS:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTimes = async (date: string, ubsId: number) => {
    try {
      setLoadingTimes(true);
      const response = await api.get(
        `/api/v1/appointment/availableTime?date=${date}&ubsId=${ubsId}`
      );

      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];

      const filteredTimes =
        date === currentDate
          ? response.data.freeTimes.filter((time: string) => {
            const [hour, minute] = time.split(":").map(Number);
            return (
              hour > now.getHours() ||
              (hour === now.getHours() && minute > now.getMinutes())
            );
          })
          : response.data.freeTimes;

      setAvailableTimes(filteredTimes || []);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    } finally {
      setLoadingTimes(false);
    }
  };

  const handleSchedule = async () => {
    if (!selectedUbsId || !selectedDate || !selectedTime) {
      Alert.alert("Atenção", "Selecione a UBS, data e horário antes de agendar.");
      return;
    }

    try {
      const dateTime = `${selectedDate}T${selectedTime}:00`;

      const dateTimeObj = new Date(dateTime);
      const dateTimeAdjusted = new Date(dateTimeObj.getTime() + 3 * 60 * 60 * 1000);

      const formattedDateTime = `${dateTimeAdjusted.getFullYear()}-${String(
        dateTimeAdjusted.getMonth() + 1
      ).padStart(2, "0")}-${String(dateTimeAdjusted.getDate()).padStart(2, "0")} ${String(
        dateTimeAdjusted.getHours()
      ).padStart(2, "0")}:${String(dateTimeAdjusted.getMinutes()).padStart(2, "0")}:${String(
        dateTimeAdjusted.getSeconds()
      ).padStart(2, "0")}`;
      
      await api.post("/api/v1/appointment", {
        userId: user?.id,
        ubsId: selectedUbsId,
        vaccinId: Number(vaccineId),
        date: formattedDateTime,
        status: "scheduled",
      });

      Alert.alert("Sucesso!", "Agendamento realizado com sucesso!");
      setSelectedTime(null);
    } catch (error) {
      console.error("Erro ao agendar:", error);
      Alert.alert("Erro", "Não foi possível realizar o agendamento.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setSelectedUbsId(null);
      setSelectedDate(null);
      setAvailableTimes([]);
      fetchUbsByVaccine();
      return () => setUbsList([]);
    }, [vaccineId])
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
          Carregando UBS...
        </Text>
      </View>
    );
  }

  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7);

  return (
    <ScrollView style={globalStyles.appointmentMainView}>
      <Text style={globalStyles.appointmentScreenTitle}>
        Agora, selecione a melhor UBS para você:
      </Text>

      <FlatList
        data={ubsList}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={globalStyles.appointmentFlatListContainer}
        renderItem={({ item }) => {
          const isSelected = selectedUbsId === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelectedUbsId(item.id);
                setSelectedDate(null);
                setAvailableTimes([]);
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

      {selectedUbsId && (
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#002856",
              marginBottom: 10,
            }}
          >
            Escolha uma data para agendar:
          </Text>

          <Calendar
            current={today.toISOString().split("T")[0]}
            minDate={today.toISOString().split("T")[0]}
            disableAllTouchEventsForDisabledDays={true}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              fetchAvailableTimes(day.dateString, selectedUbsId);
            }}
            onMonthChange={(month) => {
              if (month.dateString.slice(0, 7) !== currentMonth) {
                alert("Você só pode selecionar datas do mês atual.");
              }
            }}
            hideArrows={true}
            markedDates={
              selectedDate
                ? {
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "#002856",
                    selectedTextColor: "#fff",
                  },
                }
                : {}
            }
            theme={{
              todayTextColor: "#002856",
              arrowColor: "#002856",
            }}
          />
        </View>
      )}

      {selectedDate && (
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#002856",
              marginBottom: 10,
            }}
          >
            Agora, escolha um horário:
          </Text>

          {loadingTimes ? (
            <ActivityIndicator size="large" color="#002856" />
          ) : availableTimes.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {availableTimes.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={{
                      backgroundColor: isSelected ? "#001B44" : "#002856",
                      opacity: isSelected ? 1 : 0.9,
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                    }}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={{ color: "#fff", fontSize: 15 }}>{time}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Text style={{ textAlign: "center", color: "#666" }}>
              Nenhum horário disponível para essa data.
            </Text>
          )}

          {selectedTime && (
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#002856",
                paddingVertical: 12,
                borderRadius: 8,
                alignSelf: "center",
                width: "60%",
              }}
              onPress={handleSchedule}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Agendar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}