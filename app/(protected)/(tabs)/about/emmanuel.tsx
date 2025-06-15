import AboutComponent from "@/components/AboutComponent";
import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Emmanuel() {
    return (
        <ScrollView contentContainerStyle={globalStyles.aboutContainer}>
            <PhotoCircle imageSource={require('@/assets/images/devs/emmanuel.jpg')} size={200} />
            <AboutComponent>
                <Text style={globalStyles.aboutText}>
                    Emmanuel Meireles é estudante do curso de Sistemas para Internet da Universidade Católica de Pernambuco (UNICAP).
                    É amante de bons princípios, procurando estar ao redor de pessoas com valores. Trabalha como Arquiteto Assistente na ADEPE - Agência de Desenvolvimento Econômico de Pernambuco.
                </Text>
            </AboutComponent>
            <Text style={{ marginTop: 30, marginBottom: 18 }}>Conecte-se com Emmanuel Meireles!</Text>
            <View style={globalStyles.connect}>
                <Link href="https://www.linkedin.com/in/emmanuel-meireles-silva" target="_blank">
                    <AntDesign name="linkedin-square" size={24} color="#083474" />
                </Link>
                <Link href="mailto:emmanuelmeireles@gmail.com" target="_blank">
                    <MaterialCommunityIcons name="email" size={24} color="#083474" />
                </Link>
                <Link href="https://github.com/emmanuelmeireles" target="_blank">
                    <FontAwesome6 name="square-github" size={24} color="#083474" />
                </Link>
            </View>
        </ScrollView>
    );
}