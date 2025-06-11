import logo from '@/assets/images/logo/minha-dose-logo.png';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.subtitle}>Vacinar-se é auto cuidado</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TextInput placeholder="CPF" placeholderTextColor="#fff" style={styles.input} />
        <TextInput placeholder="Senha" placeholderTextColor="#fff" secureTextEntry style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não possui cadastro?
          <Text onPress={() => router.push('/cadastro')} style={styles.link}> Registrar</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  logo: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
    marginBottom: 0, 
    marginTop: -30,// remove qualquer espaço extra abaixo da logo
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: -100, 
    marginBottom: 20,// garante que fique colado na logo
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#002C66',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#002C66',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#fff',
  },
  link: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
