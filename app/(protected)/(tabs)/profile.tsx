import { globalStyles } from "@/styles/globalStyle";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useUserStore } from "../../store/useUserStore";
import React, { useState, useEffect, useRef } from "react";
import {
    Image,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    Alert,
} from "react-native";
import axios from "axios";
 
const avatarOptions = [
    require("@/assets/images/avatar/choose-avatar.png"),
    require("@/assets/images/avatar/mulher-1.jpg"),
    require("@/assets/images/avatar/mulher-2.jpg"),
    require("@/assets/images/avatar/homem-1.jpg"),
    require("@/assets/images/avatar/homem-2.png")
];
 
export default function Profile() {
    const { user } = useUserStore();
    const userId = user?.id;
 
    const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAge, setUserAge] = useState<number | null>(null);
    const [userPhone, setUserPhone] = useState("");
    const [userStreet, setUserStreet] = useState("");
    const [userNeighborhood, setUserNeighborhood] = useState("");
    const [userHouseNumber, setUserHouseNumber] = useState<number | null>(null);
    const [userCity, setUserCity] = useState("");
    const [userBrazilianState, setUserBrazilianState] = useState("");
    const [userZipCode, setUserZipCode] = useState("");
    const [userCountry, setUserCountry] = useState(""); 
 
    const roleRef = useRef("");
    const passwordRef = useRef("");
 
    const toggleOptions = () => setShowOptions(!showOptions);
    const selectAvatar = (avatar: any) => {
        setSelectedAvatar(avatar);
        setShowOptions(false);
    };
 
    useEffect(() => {
        if (!userId) {
            setError("Usuário não autenticado.");
            return;
        }
 
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://minha-dose-express-copy-nine.vercel.app/api/v1/users/${userId}`);
                const data = response.data;
                console.log("Dados retornados da API:", data);
 
                setUserName(data.name || "");
                setUserEmail(data.email || "");
                setUserAge(data.age || null);
                setUserPhone(data.contact?.phone || "");
                setUserStreet(data.address?.street || "");
                setUserNeighborhood(data.address?.neighborhood || "");
                setUserHouseNumber(data.address?.extraInfo || null);
                setUserCity(data.address?.city || "");
                setUserBrazilianState(data.address?.district || "");
                setUserZipCode(data.address?.zipCode || "");
                setUserCountry(data.address?.country || "");
 
                roleRef.current = data.role || "";
                passwordRef.current = data.password || "";
 
            } catch (err) {
                setError("Erro ao carregar os dados do usuário.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
 
        fetchUserData();
    }, [userId]);
 
    const handleSave = async () => {
        if (!userId) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }
 
        setLoading(true);
        setError(null);
 
        const updatedUser = {
            name: userName,
            email: userEmail,
            age: userAge,
            role: roleRef.current,
            password: passwordRef.current,
            contact: {
                phone: userPhone,
                email: userEmail, 
            },
            address: {
                street: userStreet,
                neighborhood: userNeighborhood,
                extraInfo: userHouseNumber,
                city: userCity,
                district: userBrazilianState, 
                country: userCountry,
                zipCode: userZipCode,
            }
        };
        console.log("curl: ", updatedUser);
 
        try {
            const response = await axios.put(`https://minha-dose-express-copy-nine.vercel.app/api/v1/users/${userId}`, updatedUser);
            console.log("Resposta da API:", response.data);
            console.log("status: ", response.status);
			setIsEditing(false);
            console.log("Sucesso", "Dados atualizados com sucesso!");
        } catch (err) {
            setError("Erro ao salvar os dados.");
            console.error(err);
            console.log("Erro", "Não foi possível atualizar os dados.");
        } finally {
            setLoading(false);
        }
    };
 
    if (loading) {
        return (
            <View style={[globalStyles.profileContainer, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }
 
    if (error) {
        return (
            <View style={[globalStyles.profileContainer, { justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
            </View>
        );
    }
 
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                style={globalStyles.profileContainer}
                contentContainerStyle={{ paddingBottom: 60 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={globalStyles.register}>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Meu cadastro</Text>
                    <FontAwesome5
                        name="pencil-alt"
                        size={24}
                        color="black"
                        onPress={() => setIsEditing(true)}
                    />
                </View>
 
                <View style={globalStyles.profileHorizontalContainer}>
                    <TouchableOpacity onPress={toggleOptions}>
                        <Image source={selectedAvatar} style={globalStyles.profileAvatar} />
                    </TouchableOpacity>
 
                    {showOptions && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={globalStyles.optionsAvatarContainer}>
                            {avatarOptions.map((avatar, index) => (
                                <TouchableOpacity key={index} onPress={() => selectAvatar(avatar)} style={globalStyles.optionAvatar}>
                                    <Image
                                        source={avatar}
                                        style={[
                                            globalStyles.optionAvatar,
                                            selectedAvatar === avatar && globalStyles.selectedAvatarOption,
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
 
                    <View style={globalStyles.profileInputsHorizontalContainer}>
                        {isEditing ? (
                            <TextInput
                                style={globalStyles.profileInputHorizontal}
                                value={userName}
                                onChangeText={setUserName}
                                placeholder="Nome"
                            />
                        ) : (
                            <Text style={globalStyles.staticInputProfile}>{userName}</Text>
                        )}
                    </View>
                </View>
 
                <View style={{ marginTop: 40 }}>
                    <Text>E-mail</Text>
                    {isEditing ? (
                        <TextInput
                            style={[globalStyles.profileInputHorizontal, { marginBottom: 10 }]}
                            value={userEmail}
                            onChangeText={setUserEmail}
                            placeholder="email@email.com"
                        />
                    ) : (
                        <Text style={globalStyles.staticInputProfile}>{userEmail}</Text>
                    )}
 
                    <View style={globalStyles.profileInputSideBySide}>
                        <View style={globalStyles.profileInputHalf}>
                            <Text>Idade</Text>
                            {isEditing ? (
                                <TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userAge !== null ? String(userAge) : ""}
                                    onChangeText={(text) => setUserAge(Number(text))}
                                    keyboardType="numeric"
                                />
                            ) : (
                                <Text style={globalStyles.staticInputProfile}>{userAge}</Text>
                            )}
                        </View>
 
                        <View style={globalStyles.profileInputHalf}>
                            <Text>Telefone</Text>
                            {isEditing ? (
                                <TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userPhone}
                                    onChangeText={setUserPhone}
                                />
                            ) : (
                                <Text style={globalStyles.staticInputProfile}>{userPhone}</Text>
                            )}
                        </View>
                    </View>
 
                    <View style={globalStyles.profileInputSideBySide}>
                        <View style={globalStyles.profileInputHalf}>
                            <Text>Rua</Text>
                            {isEditing ? (
                                <TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userStreet}
                                    onChangeText={setUserStreet}
                                />
                            ) : (
                                <Text style={globalStyles.staticInputProfile}>{userStreet}</Text>
                            )}
                        </View>
                        <View style={globalStyles.profileInputHalf}>
<Text>Número</Text>
                            {isEditing ? (
<TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userHouseNumber !== null ? String(userHouseNumber) : ""}
                                    onChangeText={(text) => setUserHouseNumber((text))}
                                    keyboardType="numeric"
                                />
                            ) : (
<Text style={globalStyles.staticInputProfile}>{userHouseNumber}</Text>
                            )}
</View>
                    </View>
 
                    <View style={globalStyles.profileInputSideBySide}>
                        <View style={globalStyles.profileInputHalf}>
                            <Text>CEP</Text>
                            {isEditing ? (
                                <TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userZipCode}
                                    onChangeText={setUserZipCode}
                                />
                            ) : (
                                <Text style={globalStyles.staticInputProfile}>{userZipCode}</Text>
                            )}
                        </View>
                        <View style={globalStyles.profileInputHalf}>
                            <Text>Bairro</Text>
                            {isEditing ? (
                                <TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userNeighborhood}
                                    onChangeText={setUserNeighborhood}
                                />
                            ) : (
                                <Text style={globalStyles.staticInputProfile}>{userNeighborhood}</Text>
                            )}
                        </View>
                    </View>
 
                    <View style={globalStyles.profileInputSideBySide}>
                        <View style={globalStyles.profileInputHalf}>
                            <Text>Cidade</Text>
                            {isEditing ? (
                                <TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userCity}
                                    onChangeText={setUserCity}
                                />
                            ) : (
                                <Text style={globalStyles.staticInputProfile}>{userCity}</Text>
                            )}
                        </View>
                        <View style={globalStyles.profileInputHalf}>
                            <Text>Estado</Text>
                            {isEditing ? (
                                <TextInput
                                    style={globalStyles.profileInputHorizontal}
                                    value={userBrazilianState}
                                    onChangeText={setUserBrazilianState}
                                />
                            ) : (
                                <Text style={globalStyles.staticInputProfile}>{userBrazilianState}</Text>
                            )}
                        </View>
                    </View>
 
                    <View style={{ marginTop: 20 }}>
                        <Text>País</Text>
                        {isEditing ? (
                            <TextInput
                                style={globalStyles.profileInputHorizontal}
                                value={userCountry}
                                onChangeText={setUserCountry}
                                placeholder="Brasil"
                            />
                        ) : (
                            <Text style={globalStyles.staticInputProfile}>{userCountry}</Text>
                        )}
                    </View>
                </View>
 
                {isEditing && (
                    <TouchableOpacity
                        onPress={handleSave}
                        style={globalStyles.temporaryBtn}>
                        <Text style={globalStyles.temporaryBtnTxt}>Salvar</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}