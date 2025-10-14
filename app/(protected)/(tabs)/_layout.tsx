import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';
import React from "react";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#083474",
            headerStyle: { backgroundColor: "#083474" },
            headerTintColor: "#fff",
            tabBarStyle: {
                backgroundColor: '#FAFAFA'
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="ubs"
                options={{
                    tabBarLabel: 'UBS',
                    headerTitle: 'Unidades Básicas de Saúde (UBSs)',
                    tabBarIcon: ({ color, size }) => <FontAwesome6 name="hospital" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="vaccincard"
                options={{
                    tabBarLabel: 'Meu Cartão',
                    headerTitle: 'Cartão de Vacina SUS',
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
                name="index"
                options={{
                    title: "index",
                    href: null,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Octicons name="question" size={size} color={color} />
                }}
            />
        </Tabs>
    );
}