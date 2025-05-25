import { globalStyles } from "@/styles/globalStyle";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useState } from "react";
import {
    Image,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

const avatarOptions = [
    require("@/assets/images/avatar/choose-avatar.png"),
    require("@/assets/images/avatar/mulher-1.jpg"),
    require("@/assets/images/avatar/mulher-2.jpg"),
    require("@/assets/images/avatar/homem-1.jpg"),
    require("@/assets/images/avatar/homem-2.png")
];

export default function Profile() {
    const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const selectAvatar = (avatar: any) => {
        setSelectedAvatar(avatar);
        setShowOptions(false);
    };

    const [userName, setUserName] = useState("Nome Completo do Usuario");
    const [userCpf, setUserCpf] = useState("111.111.111-11");
    const [userEmail, setUserEmail] = useState("user@email.com");
    const [userAge, setUserAge] = useState(20);
    const [userPhone, setUserPhone] = useState("+55 081 99999-9999");
    const [userStreet, setUserStreet] = useState("Rua Tal e Tal");
    const [userNeighborhood, setUserNeighborhood] = useState("Nome do Bairro");
    const [userHouseNumber, setUserHouseNumber] = useState(111);
    const [userCity, setUserCity] = useState("Cidade");
    const [userBrazilianState, setUserBrazilianState] = useState("AC");
    const [userZipCode, setUserZipCode] = useState("12345-060");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={globalStyles.profileContainer}
                contentContainerStyle={{ paddingBottom: 60 }}
                keyboardShouldPersistTaps="handled">
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

                        {isEditing ? (
                            <TextInput
                                style={globalStyles.profileInputHorizontal}
                                value={userCpf}
                                onChangeText={setUserCpf}
                                placeholder="CPF"
                                keyboardType="numeric"
                            />
                        ) : (
                            <Text style={globalStyles.staticInputProfile}>{userCpf}</Text>
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
                                    value={String(userAge)}
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
                                    value={String(userHouseNumber)}
                                    onChangeText={(text) => setUserHouseNumber(Number(text))}
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
                </View>

                {isEditing && (
                    <TouchableOpacity
                        onPress={() => setIsEditing(false)}
                        style={globalStyles.temporaryBtn}>
                        <Text style={globalStyles.temporaryBtnTxt}>Salvar</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}