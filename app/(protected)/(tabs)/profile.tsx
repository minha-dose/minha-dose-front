import api from '@/api/api';
import { useUserStore } from '@/app/store/useUserStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { globalStyles } from '../../../global';

export default function ProfileScree() {
  const user = useUserStore((state) => state.user);

  const [userData, setUserData] = useState({
    name: '',
    password: '',
    cpf: '',
    email: '',
    age: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    neighborhood: '',
    country: '',
    zipCode: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        try {
          const response = await api.get(`/api/v1/users/${user.id}`);
          const data = response.data;

          setUserData({
            name: data.name || '',
            password: '', // por segurança, senha fica vazia ao carregar
            cpf: data.cpf || '',
            email: data.email || '',
            age: data.age?.toString() || '',
            phone: data.contact?.phone || '',
            street: data.address?.street || '',
            city: data.address?.city || '',
            district: data.address?.district || '',
            neighborhood: data.address?.neighborhood || '',
            country: data.address?.country || '',
            zipCode: data.address?.zipCode || '',
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserInfo();
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const body = {
        name: userData.name || "Nome Padrão",
        password: userData.password || "senhaPadrão",
        email: userData.email,
        age: Number(userData.age),
        role: "user",
        address: {
          street: userData.street,
          city: userData.city,
          district: userData.district,
          neighborhood: userData.neighborhood,
          country: userData.country,
          zipCode: userData.zipCode,
        },
        contact: {
          phone: userData.phone,
          email: userData.email,
        },
      };

      console.log("body: ", body)
      const response = await api.put(`/api/v1/users/${user?.id}`, body, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      console.log('Dados atualizados:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };
  const router = useRouter();
const setUser = useUserStore((state) => state.setUser);

  const handleLogout = () => {
  setUser(null); // limpa o usuário do Zustand
  router.replace('/'); // volta para tela inicial (ou login)
};

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.profileHeader}>
        <Text style={globalStyles.cadastroIntro}>Meu Cadastro</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome name="sign-out" size={24} color="#022757" />
          </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
          <FontAwesome name="pencil" size={24} color="#022757" />
        </TouchableOpacity>
      </View>
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={globalStyles.generalProfile}>
            <Text style={globalStyles.profileLabel}>Nome</Text>
            <TextInput
              style={globalStyles.profileRegularInput}
              value={userData.name}
              onChangeText={(text) => handleChange('name', text)}
              editable={isEditing}
              placeholder="Nome"
            />

            {isEditing && (
              <>
                <Text style={globalStyles.profileLabel}>Senha</Text>
                <TextInput
                  style={globalStyles.profileRegularInput}
                  value={userData.password}
                  onChangeText={(text) => handleChange('password', text)}
                  secureTextEntry
                  editable={isEditing}
                  placeholder="Senha"
                />
              </>
            )}

            <Text style={globalStyles.profileLabel}>CPF</Text>
            <TextInput
              style={globalStyles.profileRegularInput}
              value={userData.cpf}
              onChangeText={(text) => handleChange('cpf', text)}
              editable={isEditing}
              placeholder="CPF"
            />

            <Text style={globalStyles.profileLabel}>E-mail</Text>
            <TextInput
              style={globalStyles.profileRegularInput}
              value={userData.email}
              onChangeText={(text) => handleChange('email', text)}
              editable={isEditing}
              placeholder="E-mail"
              keyboardType="email-address"
            />

            <Text style={globalStyles.profileLabel}>Idade</Text>
            <TextInput
              style={globalStyles.profileRegularInput}
              value={userData.age}
              onChangeText={(text) => handleChange('age', text)}
              editable={isEditing}
              placeholder="Idade"
              keyboardType="numeric"
            />
          </View>

          <View style={globalStyles.profileSideBySide}>
            <View style={globalStyles.profileColum}>
              <Text style={globalStyles.profileLabel}>Telefone</Text>
              <TextInput
                style={globalStyles.profileRegularInput}
                value={userData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                editable={isEditing}
                placeholder="Telefone"
                keyboardType="phone-pad"
              />

              <Text style={globalStyles.profileLabel}>Endereço</Text>
              <TextInput
                style={globalStyles.profileRegularInput}
                value={userData.street}
                onChangeText={(text) => handleChange('street', text)}
                editable={isEditing}
                placeholder="Endereço"
              />

              <Text style={globalStyles.profileLabel}>Cidade</Text>
              <TextInput
                style={globalStyles.profileRegularInput}
                value={userData.city}
                onChangeText={(text) => handleChange('city', text)}
                editable={isEditing}
                placeholder="Cidade"
              />

              <Text style={globalStyles.profileLabel}>País</Text>
              <TextInput
                style={globalStyles.profileRegularInput}
                value={userData.country}
                onChangeText={(text) => handleChange('country', text)}
                editable={isEditing}
                placeholder="País"
              />
            </View>

            <View style={globalStyles.profileColum}>
              <Text style={globalStyles.profileLabel}>CEP</Text>
              <TextInput
                style={globalStyles.profileRegularInput}
                value={userData.zipCode}
                onChangeText={(text) => handleChange('zipCode', text)}
                editable={isEditing}
                placeholder="CEP"
              />

              <Text style={globalStyles.profileLabel}>Bairro</Text>
              <TextInput
                style={globalStyles.profileRegularInput}
                value={userData.neighborhood}
                onChangeText={(text) => handleChange('neighborhood', text)}
                editable={isEditing}
                placeholder="Bairro"
              />

              <Text style={globalStyles.profileLabel}>Estado</Text>
              <TextInput
                style={globalStyles.profileRegularInput}
                value={userData.district}
                onChangeText={(text) => handleChange('district', text)}
                editable={isEditing}
                placeholder="Estado"
              />
            </View>
          </View>

          {isEditing && (
            <TouchableOpacity style={globalStyles.profileBtnUpdate} onPress={handleSave}>
              <Text style={globalStyles.profileUpdateBtnTxt}>Salvar</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}