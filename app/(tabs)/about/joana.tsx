import AboutComponent from "@/components/AboutComponent";
import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Joana() {
    return (
        <View style={globalStyles.aboutContainer}>
            <PhotoCircle imageSource={require('@/assets/images/devs/joana.jpeg')} size={200}></PhotoCircle>
            <AboutComponent>
                <Text style={globalStyles.aboutText}>Joana é estudante de Sistemas para Internet, pela Universidade Católica de Pernambuco. Desenvolvedora FrontEnd na Um Telecom e nas horas vagas ama assistir comédias românticas.
                </Text>
            </AboutComponent>
            <Text style={{ marginTop: 20, marginBottom: 20 }}>Conecte-se com Joyce!</Text>
            <View style={globalStyles.connect}>
                <Link href="https://www.linkedin.com/in/joana-falc%C3%A3o-05990a287/">
                    <AntDesign name="linkedin-square" size={24} color="#083474" />
                </Link>
                <Link href="mailto:jmanoelafs@gmail.com">
                    <MaterialCommunityIcons name="email" size={24} color="#083474" />
                </Link>
                <Link href="https://github.com/joanafalcaos">
                    <FontAwesome6 name="square-github" size={24} color="#083474" />
                </Link>
            </View>
        </View>
    );
}