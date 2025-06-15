import AboutComponent from "@/components/AboutComponent";
import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Isabela() {
    return (
        <ScrollView contentContainerStyle={globalStyles.aboutContainer}>
            <PhotoCircle imageSource={require('@/assets/images/devs/isabela.jpg')} size={200} />
            <AboutComponent>
                <Text style={globalStyles.aboutText}>
                    Isabela Araujo é estudante de Sistemas para Internet pela Universidade Católica de Pernambuco, engenheira mecânica em formação pela Escola Politécnica de Pernambuco e analista de dados na BRK Ambiental. Nas horas vagas, gosta de ouvir música e assistir novela.
                </Text>
            </AboutComponent>
            <Text style={{ marginTop: 30, marginBottom: 18 }}>Conecte-se com Isabela Araujo!</Text>
            <View style={globalStyles.connect}>
                <Link href="http://www.linkedin.com/in/isabela-araujo-s" target="_blank">
                    <AntDesign name="linkedin-square" size={24} color="#083474" />
                </Link>
                <Link href="mailto:isabelacrvs@gmail.com" target="_blank">
                    <MaterialCommunityIcons name="email" size={24} color="#083474" />
                </Link>
                <Link href="https://github.com/isacarvalho20" target="_blank">
                    <FontAwesome6 name="square-github" size={24} color="#083474" />
                </Link>
            </View>
        </ScrollView>
    );
}