import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import api from '../../api/api';
import SuccessModal from '../../components/SuccessModal';
import { globalStyles } from '../../global';

function useUserDataStore() {
  return { id: undefined as number | undefined, name: undefined as string | undefined };
}

const HORARIOS_PADRAO = [
  "09:00","09:20","09:40","10:00","10:20","10:40","11:00","11:20","11:40",
  "12:00","12:20","12:40","13:00","13:20","13:40","14:00","14:20","14:40",
  "15:00","15:20","15:40","16:00"
];

export default function Agendamentos() {
  // Recebendo parâmetros via navegação
  const params = useLocalSearchParams();
  const selectedVaccineName = params.name as string;
  const selectedVaccineDesc = params.description as string;
  const selectedVaccineDetails = params.technicalDetails as string;
  const selectedUbsList = params.ubsAvailable ? JSON.parse(params.ubsAvailable as string) : [];

  const userStore = useUserDataStore();
  const currentUserId = userStore?.id ?? 1;

  const [vacinas, setVacinas] = useState<any[]>([]);
  const [filteredUbs, setFilteredUbs] = useState<any[]>([]);
  const [selectedVacina, setSelectedVacina] = useState<any | null>(null);
  const [selectedUbs, setSelectedUbs] = useState<any | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loadingUbs, setLoadingUbs] = useState(false);
  const [loadingDates, setLoadingDates] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Carregar todas as vacinas, e setar a vacina selecionada (se veio da escolha anterior)
  
  useEffect(() => {
    api.get('/api/v1/getAllVaccins')
      .then(res => {
        setVacinas(res.data || []);
        // Busca por nome, id, etc, caso a navegação só mande nome
        if (selectedVaccineName) {
          const existente = (res.data || []).find(
            (v: any) => v.name === selectedVaccineName
          );
          if (existente) setSelectedVacina(existente);
        }
      });
  }, [selectedVaccineName]);

  // Buscar UBSs que possuem a vacina selecionada
  useEffect(() => {
    setSelectedUbs(null);
    setFilteredUbs([]);
    setAvailableDates([]);
    setSelectedDate(null);
    setAvailableTimes([]);
    setSelectedTime(null);
    if (!selectedVaccineName && !selectedVacina?.id) return;

    setLoadingUbs(true);
    // Usa id da vacina selecionada, pegando do objeto ou dos params
    const vacinaIdParaBuscar = selectedVacina?.id
      ? selectedVacina.id
      : vacinas.find(v => v.name === selectedVaccineName)?.id;

    if (vacinaIdParaBuscar) {
      api.get(`/api/v1/getUbsByVaccin/${vacinaIdParaBuscar}`)
        .then(res => setFilteredUbs(res.data || []))
        .catch(() => setFilteredUbs([]))
        .finally(() => setLoadingUbs(false));
    }
  }, [selectedVaccineName, selectedVacina, vacinas]);

  // Chamar disponibilidade de horários/datas após escolher UBS
  useEffect(() => {
    setAvailableDates([]);
    setAvailableTimes([]);
    setSelectedDate(null);
    setSelectedTime(null);
    if (!selectedUbs) return;
    setLoadingDates(true);
    api.get('/api/v1/appointment/getAvailableTime', {
      params: { ubsId: selectedUbs.id }
    })
      .then(res => {
        const raw = res.data || [];
        type Row = { date: string; times: any[] };
        const rows: Row[] = raw.flatMap((item: any) => {
          if (item.date && Array.isArray(item.times))
            return [{ date: String(item.date), times: item.times }];
          return [];
        });
        const dates = rows.map((r: Row) => r.date);
        setAvailableDates(dates);
      })
      .catch(() => setAvailableDates([]))
      .finally(() => setLoadingDates(false));
  }, [selectedUbs]);

  // Buscar horários disponíveis para a data escolhida
  useEffect(() => {
    if (!selectedDate || !selectedUbs) {
      setAvailableTimes([]);
      setSelectedTime(null);
      return;
    }
    setLoadingDates(true);
    api.get('/api/v1/appointment/getAvailableTime', {
      params: { ubsId: selectedUbs.id, date: selectedDate }
    })
      .then(res => {
        const raw = res.data || [];
        const times = Array.isArray(raw) ? raw.filter((t: any) => HORARIOS_PADRAO.includes(typeof t === 'string' ? t : t.time || "")).map((t: any) => typeof t === 'string' ? t : t.time || "") : [];
        setAvailableTimes(times);
      })
      .catch(() => setAvailableTimes([]))
      .finally(() => setLoadingDates(false));
  }, [selectedDate, selectedUbs]);

  // Agendamento
  async function handleConfirmBooking() {
    if (!selectedVacina && !selectedVaccineName || !selectedUbs || !selectedDate || !selectedTime) {
      return alert('Selecione vacina, UBS, data e horário.');
    }
    setBookingLoading(true);
    try {
      await api.post('/api/v1/appointment/createAppointment', {
        userId: currentUserId,
        ubsId: selectedUbs.id,
        vaccinId: selectedVacina?.id ?? vacinas.find(v => v.name === selectedVaccineName)?.id,
        date: `${selectedDate}T${selectedTime}:00`,
        status: 'scheduled'
      });
      setModalVisible(true);
      setSelectedUbs(null);
      setSelectedVacina(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } catch {
      alert('Erro ao criar agendamento.');
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={globalStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.headerOuter}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.headerTitle}> Agendamento de Vacina</Text>
        </View>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ padding: 16,paddingTop: 100 }} keyboardShouldPersistTaps="handled">
          
          {/* Card de escolha anterior */}
            <View style={styles.selectionCard}>
              <Text style={styles.selectionTitle}>Vacina escolhida:</Text>
              <Text style={styles.selectionName}>{selectedVaccineName}</Text>
              <Text style={styles.selectionDescription}>{selectedVaccineDesc}</Text>
              <Text style={styles.selectionDetails}>
                <Text style={{ fontWeight: "bold" }}>Detalhes:</Text> {selectedVaccineDetails}
              </Text>
            </View>
          {/* UBSs */}
            <Text style={styles.label}>UBSs com esta vacina:</Text>
            {loadingUbs ? (
              <ActivityIndicator />
            ) : filteredUbs.length > 0 ? (
              <FlatList
                data={filteredUbs}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      globalStyles.button,
                      selectedUbs?.id === item.id ? styles.selected : {}
                    ]}
                    onPress={() => setSelectedUbs(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
                horizontal
                style={{ marginBottom: 12 }}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <Text style={{ color: '#666', marginBottom: 12 }}>
                Nenhuma UBS encontrada para esta vacina.
              </Text>
            )}

          {/* Datas do calendário */}
          {selectedUbs && (
            <>
              <Text style={styles.label}>Datas disponíveis (mês atual)</Text>
              {loadingDates ? <ActivityIndicator /> : (
                <View style={styles.calendarRow}>
                  {availableDates.length === 0 && <Text style={{ color: '#666' }}>Nenhuma data disponível para o mês atual.</Text>}
                  {availableDates.map(date => (
                    <TouchableOpacity
                      key={date}
                      style={[
                        styles.dateButton,
                        selectedDate === date ? { backgroundColor: '#002C66', borderColor: '#002C66' } : {},
                      ]}
                      onPress={() => setSelectedDate(date)}
                    >
                      <Text style={{ color: selectedDate === date ? '#fff' : '#222' }}>{date.slice(8)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}

          {/* Horários */}
          {selectedDate && (
            <>
              <Text style={styles.label}>Horários disponíveis</Text>
              {loadingDates ? <ActivityIndicator /> : (
                availableTimes.length === 0 ? <Text style={{ color: '#666' }}>Nenhum horário disponível nesta data.</Text> : (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {HORARIOS_PADRAO.map(hora => (
                      <TouchableOpacity
                        key={hora}
                        style={[
                          styles.timeSlot,
                          selectedTime === hora ? { backgroundColor: '#002C66' } : {},
                          !availableTimes.includes(hora) ? { opacity: 0.5 } : {}
                        ]}
                        disabled={!availableTimes.includes(hora)}
                        onPress={() => setSelectedTime(hora)}
                      >
                        <Text style={{ color: selectedTime === hora ? '#fff' : '#222' }}>{hora}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )
              )}
            </>
          )}

          {/* Botão de confirmação */}
          <TouchableOpacity
            style={[
              globalStyles.buttonCadastro,
              styles.confirmButton,
              !(selectedVacina || selectedVaccineName) || !selectedUbs || !selectedDate || !selectedTime ? { backgroundColor: '#ccc' } : {}
            ]}
            disabled={!(selectedVacina || selectedVaccineName) || !selectedUbs || !selectedDate || !selectedTime}
            onPress={handleConfirmBooking}
          >
            <Text style={globalStyles.buttonCadastroText}>{bookingLoading ? 'Agendando...' : 'Confirmar Agendamento'}</Text>
          </TouchableOpacity>

          <SuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} message="Agendamento realizado com sucesso!" />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 20 },

  headerOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#002C66'
  },

  header: {
    backgroundColor: '#002C66',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 30,
    height: 80
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800'
  },

  selectionCard: {
    backgroundColor: "#F0F6FC",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  selectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#002856",
    marginBottom: 8,
  },
  selectionName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#0004fdff",
  },
  selectionDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  selectionDetails: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  selectionUbs: {
    fontSize: 13,
    color: "#444",
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },

  calendarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },

  dateButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8
  },

  timeSlot: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    margin: 4
  },

  selected: {
    borderWidth: 2,
    borderColor: '#002C66'
  },

  confirmButton: {
    marginTop: 16,
    alignSelf: 'stretch'
  }
});
