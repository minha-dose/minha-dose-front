import AboutComponent from "@/components/AboutComponent";
import PhotoCircle from "@/components/PhotoCircle";
import { globalStyles } from "@/styles/globalStyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Bruno() {
    return (
        <ScrollView contentContainerStyle={globalStyles.aboutContainer}>
            <PhotoCircle imageSource={require('@/assets/images/devs/bruno.jpeg')} size={200}></PhotoCircle>
            <AboutComponent>
                <Text style={globalStyles.aboutText}>Bruno Guilherme é estudante do curso de Sistemas para Internet da Universidade Católica de Pernambuco (UNICAP).
                    
                </Text>
            </AboutComponent>
            <Text style={{ marginTop: 20, marginBottom: 20 }}>Conecte-se com Emmanuel Meireles!</Text>
            <View style={globalStyles.connect}>
                <Link href='https://www.linkedin.com/in/bruno-guilherme-da-silva/' target="_blank">
                    <AntDesign name="linkedin-square" size={24} color="#083474" />
                </Link>
                <Link href="mailto:brunoguilherme@gmail.com"  target="_blank">
                    <MaterialCommunityIcons name="email" size={24} color="#083474"/>
                </Link>
                <Link href="https://github.com/Bruno-Guilherme" target="_blank">
                    <FontAwesome6 name="square-github" size={24} color="#083474"  />
                </Link>
            </View>
        </ScrollView>
    );
}