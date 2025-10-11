import { globalStyles } from '@/global';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import minhaDoseOps from '../assets/images/minha-dose-ops.png';

export default function LoadingPage() {
    const router = useRouter();
    const {next} = useLocalSearchParams();

    const validRoutes = ['/cadastro', '/login', '/home'] as const;
    const [imageLoaded, setImageLoaded] = React.useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(next && typeof next === 'string'){
                router.push(next as (typeof validRoutes)[number]);
            }else{
                router.push('/');
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" style={{ marginBottom: 20 }} />
        <Text style={globalStyles.loadingTitle}>Ops...</Text>
        <Text style={globalStyles.loadingSubtitle}>
          Não foi possível encontrar uma conta para o e-mail informado.{' '}
          Vamos criar uma?{'\n'}É super rápido!
        </Text>
        <Image source={minhaDoseOps} style={globalStyles.loadingImage} onLoad={() => setImageLoaded(true)} />
      </View>
    </TouchableWithoutFeedback>
  );
}