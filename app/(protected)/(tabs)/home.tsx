import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const images = [
  require("@/assets/images/campaings/covid.jpeg"),
  require("@/assets/images/campaings/sarampo.png"),
  require("@/assets/images/campaings/hpv.jpeg"),
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Olá, Mariana!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Vacinação é coisa importante!</Text>

        <Text style={styles.paragraph}>
          Vacina é proteção, cuidado e saúde para todos! Manter a caderneta em dia previne doenças, evita surtos e salva vidas.
        </Text>
        <Text style={styles.paragraph}>
          O SUS oferece vacinas seguras e gratuitas para todas as idades. Não deixe para depois! Consulte os postos de vacinação e as doses disponíveis!
        </Text>
        <Text style={styles.paragraph}>
          Lembre-se: Vacinar é um ato de amor e responsabilidade.
        </Text>

        <Carousel
          loop
          width={width}
          height={200}
          autoPlay={true}
          data={images}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} resizeMode="contain" />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#002F6C",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  content: { padding: 20 },
  title: { fontSize: 16, fontWeight: "bold", color: "#002F6C", marginBottom: 10 },
  paragraph: { fontSize: 14, marginBottom: 10, textAlign: "justify", color: "#333" },
  image: {
    width: width - 40,
    height: 180,
    alignSelf: "center",
    borderRadius: 8,
  },
});
