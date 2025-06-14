import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: "#083474"},
            headerTintColor: "#fff",
        }}>
            <Stack.Screen name="index" options={{ title: "Sobre" }} />
            <Stack.Screen name="bruno" options={{ title: "Conheça Bruno!" }} />
            <Stack.Screen name="douglas" options={{ title: "Conheça Douglas!" }} />
            <Stack.Screen name="emmanuel" options={{ title: "Conheça Emmanuel!" }} />
            <Stack.Screen name="isabela" options={{ title: "Conheça Isabela!" }} />
            <Stack.Screen name="joana" options={{ title: "Conheça Joana!" }} />
            <Stack.Screen name="joyce" options={{ title: "Conheça Joyce!" }} />
            <Stack.Screen name="leonardo" options={{ title: "Conheça Leonardo!" }} />
        </Stack>
    );
}