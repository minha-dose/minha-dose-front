import AboutComponent from "@/components/AboutComponent";
import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";


export default function Douglas() {
    return (
        <ScrollView contentContainerStyle={globalStyles.aboutContainer}>
            <PhotoCircle imageSource={require('@/assets/images/devs/douglas.jpg')} size={200} />
            <AboutComponent>
                <Text style={globalStyles.aboutText}>
                    Douglas Cavalcanti é estudante do curso de Sistemas para Internet na Universidade Católica de Pernambuco (UNICAP), atualmente no 5º período.
                    Atua como Analista de Recursos Humanos com foco em Recrutamento, Seleção e Desenvolvimento de Talentos. 
                    Possui experiência sólida em RH, com destaque para onboarding, treinamentos, atração e retenção de talentos, além de atendimento consultivo ao cliente.
                </Text>
            </AboutComponent>
            <Text style={{ marginTop: 20, marginBottom: 20 }}>Conecte-se com Douglas Cavalcanti!</Text>
            <View style={globalStyles.connect}>
                <Link href='https://www.linkedin.com/in/douglas-lima-sig' target="_blank">
                    <AntDesign name="linkedin-square" size={24} color="#083474" />
                </Link>
                <Link href="mailto:douglasguilhermeclima@gmail.com" target="_blank">
                    <MaterialCommunityIcons name="email" size={24} color="#083474" />
                </Link>
                <Link href="https://github.com/DouglasLimaFront" target="_blank">
                    <FontAwesome6 name="square-github" size={24} color="#083474" />
                </Link>
            </View>
        </ScrollView>
    );
}