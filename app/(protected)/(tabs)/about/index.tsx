import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Exemplo de integrantes (adicione todos os 7)
const devs = [
  {
    id: "joana",
    name: "Joana Falcao",
    image: require("@/assets/images/devs/joana.jpg"),
  },
  {
    id: "isabela",
    name: "isabela",
    image: require("@/assets/images/devs/isabela.jpg"),
  },
  {
    id: "joyce",
    name: "Joyce Barbosa",
    image: require("@/assets/images/devs/joyce-photo.jpg"),
  },
   {
    id: "douglas",
    name: "Douglas Guilherme",
    image: require("@/assets/images/devs/douglas.jpg"),
  },
  {
    id: "emmanuel",
    name: "Emmanuel Meireles",
    image: require("@/assets/images/devs/emmanuel.jpg"),
  },
  {
    id: "bruno",
    name: "Bruno Guilherme",
    image: require("@/assets/images/devs/bruno.jpeg"),
  },
  {
    id: "leonardo",
    name: "Leonardo Accioly",
    image: require("@/assets/images/devs/leo.jpg"),
    
  },
  // ...adicione os outros integrantes aqui
];

export default function SobreIndex() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={[globalStyles.aboutContainer, { alignItems: "center", padding: 24 }]}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 7 }}>
        Nossos Desenvolvedores
      </Text>
      <Text style={{ fontSize: 20, marginBottom: 24 }}>
        Conheça nossos desenvolvedores
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {devs.map((dev) => (
          <TouchableOpacity
            key={dev.id}
            onPress={() => router.push(`/about/${dev.id}`)}
            style={{ margin: 20 }}
          >
            <PhotoCircle imageSource={dev.image} size={70} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}