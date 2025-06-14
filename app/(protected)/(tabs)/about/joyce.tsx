import AboutComponent from "@/components/AboutComponent";
import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Joyce() {
    return (
        <ScrollView contentContainerStyle={globalStyles.aboutContainer}>
            <PhotoCircle imageSource={require('@/assets/images/devs/joyce-photo.jpg')} size={200}></PhotoCircle>
            <AboutComponent>
                <Text style={globalStyles.aboutText}>Joyce Barbosa é estudante do curso de Sistemas para Internet da Universidade Católica de Pernambuco (UNICAP).
                    É analista TIC na Accenture e, nas horas vagas gosta de ler e assistir novos filmes e séries.
                </Text>
            </AboutComponent>
            <Text style={{ marginTop: 30, marginBottom: 18 }}>Conecte-se com Joyce!</Text>
            <View style={globalStyles.connect}>
                <Link href="https://www.linkedin.com/in/joycebarbosagomes/" target="_blank">
                    <AntDesign name="linkedin-square" size={24} color="#083474" />
                </Link>
                <Link href="mailto:joycebarbosa.gomess@gmail.com" target="_blank">
                    <MaterialCommunityIcons name="email" size={24} color="#083474" />
                </Link>
                <Link href="https://github.com/joycebarbosag" target="_blank">
                    <FontAwesome6 name="square-github" size={24} color="#083474" />
                </Link>
            </View>
        </ScrollView>
    );
}