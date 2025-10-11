import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import logo from '../assets/images/logo/minha-dose-logo.png';
import { globalStyles } from '../global';
import { useUserDataStore } from './store/userDataStore';

export default function CadastroScreen() {

    const {
        cpf,
        name,
        age,
        zipCode,
        address,
        city,
        neighborhood,
        district,
        country,
        houseNumber,
        setField
    } = useUserDataStore();

    const router = useRouter();

    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [localBirthDate, setLocalBirthDate] = React.useState(
        age ? new Date(age) : new Date()
    );

    const allFieldsFilled =
        cpf.trim().length > 0 &&
        name.trim().length > 0 &&
        zipCode.trim().length > 0 &&
        address.trim().length > 0 &&
        city.trim().length > 0 &&
        neighborhood.trim().length > 0 &&
        district.trim().length > 0 &&
        houseNumber.trim().length > 0 &&
        country.trim().length > 0 &&
        age.length > 0; 

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setLocalBirthDate(selectedDate);

            const year = selectedDate.getFullYear();

            const currentYear = new Date().getFullYear();
            const userBirthdayYear = `${year}`;
            const userAge = (currentYear - Number(userBirthdayYear)).toString();
 
            setField('age', userAge);
        }
    };

    return (
        <KeyboardAvoidingView
            style={globalStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ padding: 16 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <Image source={logo} style={globalStyles.smallLogo} />
                        <Text style={globalStyles.cadastroIntro}>
                            Informe os seus dados pessoais
                        </Text>
                        <Text style={globalStyles.cadastroSubTitle}>
                            Para fornecer o melhor serviço possível, todos os dados solicitados abaixo devem ser informados.
                        </Text>
                    </View>

                    <TextInput
                        placeholder="CPF"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={cpf}
                        onChangeText={(text) => setField('cpf', text)}
                    />

                    <TextInput
                        placeholder="Nome Completo"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={name}
                        onChangeText={(text) => setField('name', text)}
                    />

                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            placeholder="Data de Nascimento"
                            placeholderTextColor="#022757"
                            style={globalStyles.cadastroInput}
                            value={localBirthDate.toLocaleDateString('pt-BR')}
                            editable={false}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={localBirthDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}

                    <TextInput
                        placeholder="CEP"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={zipCode}
                        onChangeText={(text) => setField('zipCode', text)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Endereço"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={address}
                        onChangeText={(text) => setField('address', text)}
                    />
                    <TextInput
                        placeholder="Cidade"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={city}
                        onChangeText={(text) => setField('city', text)}
                    />
                    <TextInput
                        placeholder="Bairro"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={neighborhood}
                        onChangeText={(text) => setField('neighborhood', text)}
                    />
                    <TextInput
                        placeholder="Estado"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={district}
                        onChangeText={(text) => setField('district', text)}
                    />
                    <TextInput
                        placeholder="País"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={country}
                        onChangeText={(text) => setField('country', text)}
                    />
                    <TextInput
                        placeholder="N. da casa"
                        placeholderTextColor="#022757"
                        style={globalStyles.cadastroInput}
                        value={houseNumber}
                        onChangeText={(text) => setField('houseNumber', text)}
                        keyboardType="numeric"
                    />

                    <View style={globalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={[globalStyles.buttonCadastro, globalStyles.backButton]}
                            onPress={() => router.push('/login')}
                        >
                            <Text style={globalStyles.buttonCadastroText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                globalStyles.buttonCadastro,
                                globalStyles.continueButton,
                                !allFieldsFilled && { backgroundColor: '#ccc' }
                            ]}
                            onPress={() => router.push('/cadastro-second')}
                            disabled={!allFieldsFilled}
                        >
                            <Text style={globalStyles.buttonCadastroText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}