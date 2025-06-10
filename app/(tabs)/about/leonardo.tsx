import AboutComponent from "@/components/AboutComponent";
import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Leonardo () {
    return (
        <ScrollView contentContainerStyle={globalStyles.aboutContainer}>
            <PhotoCircle imageSource={require('@/assets/images/devs/leo.jpg')} size={200}></PhotoCircle>
            <AboutComponent>
                <Text style={globalStyles.aboutText}>Leonardo Accioly é estudante do curso de Sistemas para Internet da Universidade Católica de Pernambuco (UNICAP).
                    Desenvolvedor Full-Stack junior, procuro conhecer novas pessoas e montar networking*

                </Text>
            </AboutComponent>
            <Text style={{ marginTop: 20, marginBottom: 20 }}>Conecte-se com Leonardo!</Text>
            <View style={globalStyles.connect}>
                <Link href='https://www.linkedin.com/in/leonardo-accioly-51107336b' target="_blank" >
                    <AntDesign name="linkedin-square" size={24} color="#083474" />
                </Link>
                <Link href="mail:leonardoaccioly64@gmail.com"  target="_blank" >
                    <MaterialCommunityIcons name="email" size={24} color="#083474" />
                </Link>
                <Link href="https://github.com/leoaccioly05"  target="_blank">
                    <FontAwesome6 name="square-github" size={24} color="#083474" />
                </Link>
            </View>
        </ScrollView>
    );
}