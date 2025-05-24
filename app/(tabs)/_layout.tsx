import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
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
                    tabBarIcon: () => <Entypo name="home" size={24} color="#083474" />,
                }}
            />
            <Tabs.Screen
                name="vaccincard"
                options={{
                    title: 'Meu cartão',
                    tabBarIcon: () => <Octicons name="checklist" size={24} color="#083474" />
                }}
            />
            <Tabs.Screen
                name="vaccins"
                options={{
                    title: 'Vacinas',
                    tabBarIcon: () => <MaterialIcons name="vaccines" size={24} color="#083474" />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: () => <Ionicons name="person-circle" size={24} color="#083474" />
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "Sobre",
                    tabBarIcon: () => <Octicons name="question" size={24} color="#083474" />
                }}
            />
        </Tabs>

    );
}