import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';
import React from "react";

export default function AdminLayout() {
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
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />
                }}
            />
        </Tabs>
    );
}