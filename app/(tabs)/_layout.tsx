import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#083474", headerStyle: { backgroundColor: "#083474"},
            headerTintColor: "#fff",
            tabBarStyle: {
                backgroundColor: '#FAFAFA'
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Login',
                    href: null
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="vaccincard"
                options={{
                    title: 'Meu cartão',
                    tabBarIcon: ({ color, size }) => <Octicons name="checklist" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="vaccins"
                options={{
                    title: 'Vacinas',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="vaccines" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "Sobre",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Octicons name="question" size={size} color={color} />
                }}
            />
        </Tabs>

    );
}