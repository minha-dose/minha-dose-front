import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// Importamos o ícone de seta para a esquerda (Ionicons) e um ícone de seringa (FontAwesome5)
// Certifique-se de que a biblioteca @expo/vector-icons está instalada.
// Se não estiver, execute no terminal: npm install @expo/vector-icons
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// --- Dados de Exemplo para as Vacinas ---
// Estes dados simulam o que você receberia de uma API.
const vaccineData = [
  { id: '1', name: 'Covid 19', date: '24/04/2024', post: 'UBS Boa Vista 03' },
  { id: '2', name: 'Tríplice Viral', date: '19/02/2024', post: 'UBS Boa Vista 03' },
  { id: '3', name: 'Gripe', date: '19/12/2023', post: 'UBS Casa Forte 03' },
  { id: '4', name: 'Febre Amarela', date: '19/10/2023', post: 'UBS Boa Vista 03' },
  // Você pode adicionar mais itens aqui para testar a rolagem da lista
  // { id: '5', name: 'Sarampo', date: '01/08/2023', post: 'UBS Central' },
  // { id: '6', name: 'Tétano', date: '15/06/2023', post: 'Clínica da Família' },
];

// --- Componente de Cartão de Vacina Individual ---
const VaccineCard = ({ vaccine }) => (
  <View style={styles.card}>
    {/* Ícone da seringa */}
    <FontAwesome5 name="syringe" size={24} color="#000080" style={styles.cardIcon} />
    
    {/* Conteúdo do cartão: Nome, Data, Posto */}
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{vaccine.name}</Text>
      <Text style={styles.cardText}>Data: {vaccine.date}</Text>
      <Text style={styles.cardText}>Posto: {vaccine.post}</Text>
    </View>
  </View>
);

// --- Componente da Barra de Navegação Inferior ---
const BottomTabBar = () => (
  <View style={styles.tabBar}>
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name="home-outline" size={24} color="#FFF" />
      <Text style={styles.tabText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name="calendar-outline" size={24} color="#FFF" />
      <Text style={styles.tabText}>Agendar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItemActive}> {/* 'Histórico' está ativo na imagem */}
      <Ionicons name="document-text" size={24} color="#00BFFF" /> {/* Ícone preenchido e azul claro */}
      <Text style={[styles.tabText, styles.tabTextActive]}>Histórico</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name="person-outline" size={24} color="#FFF" />
      <Text style={styles.tabText}>Perfil</Text>
    </TouchableOpacity>
  </View>
);

// --- Componente Principal do Aplicativo (App.js) ---
export default function App() {
  return (
    // SafeAreaView garante que o conteúdo não seja sobreposto pela barra de status do celular
    <SafeAreaView style={styles.container}>
      {/* StatusBar é para controlar a cor da barra de status do celular */}
      <StatusBar barStyle="light-content" backgroundColor="#000080" /> 
      
      {/* Cabeçalho da tela */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Ícone de seta para voltar */}
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cartão de vacina</Text>
        {/* Este View vazio ajuda a centralizar o título, ocupando o mesmo espaço que o botão de voltar */}
        <View style={{ width: 24 }} /> 
      </View>

      {/* Lista de Cartões de Vacina */}
      <FlatList
        data={vaccineData} // Os dados a serem renderizados
        keyExtractor={(item) => item.id} // Chave única para cada item da lista
        renderItem={({ item }) => <VaccineCard vaccine={item} />} // Como renderizar cada item
        contentContainerStyle={styles.listContainer} // Estilo para o container da lista (padding)
        showsVerticalScrollIndicator={false} // Não mostra a barra de rolagem vertical
      />

      {/* Barra de Navegação Inferior */}
      <BottomTabBar />
    </SafeAreaView>
  );
}

// --- Estilos de todos os componentes ---
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    backgroundColor: '#F0F0F0', // Fundo levemente cinza, similar ao da imagem
  },
  // Estilos do Cabeçalho
  header: {
    backgroundColor: '#000080', // Azul marinho escuro
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row', // Organiza itens em linha
    alignItems: 'center', // Alinha itens verticalmente ao centro
    justifyContent: 'space-between', // Distribui espaço entre os itens
    borderBottomWidth: 0, // Sem borda na parte inferior
  },
  backButton: {
    padding: 5, // Aumenta a área clicável do botão
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Estilos da Lista e Cartões de Vacina
  listContainer: {
    padding: 15, // Espaçamento interno para a lista
  },
  card: {
    flexDirection: 'row', // Ícone e conteúdo lado a lado
    backgroundColor: '#FFF', // Fundo branco para os cartões
    borderRadius: 8, // Bordas arredondadas
    padding: 15,
    marginBottom: 15, // Espaçamento entre os cartões
    alignItems: 'center', // Alinha o ícone e o texto verticalmente
    // Sombras para dar o efeito de elevação
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Sombra para Android
  },
  cardIcon: {
    marginRight: 15, // Espaçamento à direita do ícone
  },
  cardContent: {
    flex: 1, // Faz o conteúdo ocupar o espaço restante
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  // Estilos da Barra de Navegação Inferior
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribui os itens igualmente
    backgroundColor: '#000080', // Azul marinho
    paddingVertical: 10,
    borderTopWidth: 0, // Sem borda na parte superior
  },
  tabItem: {
    alignItems: 'center', // Alinha ícone e texto centralizados
    padding: 5,
  },
  tabItemActive: { // Estilo para o item 'Histórico' que está ativo
    alignItems: 'center',
    padding: 5,
  },
  tabText: {
    color: '#FFF', // Cor do texto dos itens inativos
    fontSize: 12,
    marginTop: 5,
  },
  tabTextActive: {
    color: '#00BFFF', // Azul claro para o texto do item ativo
    fontWeight: 'bold',
  },
});