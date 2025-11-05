import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#083474",
        headerStyle: { backgroundColor: "#083474" },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: '#FAFAFA' },
      }}
    >
      {/* Telas visíveis no menu inferior */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-ubs"
        options={{
          title: "Cadastrar UBS",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-hospital" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-vaccin"
        options={{
          title: "Cadastrar Vacina",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="syringe" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />

      {/* Telas ocultas do menu inferior */}
      <Tabs.Screen
        name="settings/index"
        options={{
          href: null, 
        }}
      />
      <Tabs.Screen
        name="settings/new-user"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings/change-password"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
