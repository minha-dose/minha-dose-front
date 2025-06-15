import React, { useContext } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';
import { TouchableOpacity } from "react-native";
import { ThemeContext } from "./theme/ThemeContext";

function ThemeToggleButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
            <Ionicons
                name={theme.background === "#181A20" ? "sunny" : "moon"}
                size={24}
                color={theme.icon}
            />
        </TouchableOpacity>
    );
}

export default function TabLayout() {
    const { theme } = useContext(ThemeContext);    

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: theme.primary,
            headerStyle: { backgroundColor: theme.navBar },
            headerTintColor: theme.icon,
            tabBarStyle: { backgroundColor: theme.background },
            headerRight: () => <ThemeToggleButton />
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
                    title: 'UBS',
                    tabBarIcon: ({ color, size }) => <FontAwesome6 name="hospital" size={size} color={color} />
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