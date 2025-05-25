import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    register: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    photoCircle: {
        borderWidth: 3,
        borderColor: "#fff",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    pickerState: {
        height: 50,
        width: 90,
        color: '#083474',
    },
    viewPickerState: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        width: 90
    },
    profileHorizontalContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    profileContainer: {
        flex: 1,
        padding: 16,
        margin: 10,
    },
    profileInputsHorizontalContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center"
    },
    profileInputHorizontal: {
        height: 30,
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        fontSize: 15,
    },
    profileInputSideBySide: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    profileInputHalf: {
        flex: 1,
        padding: 5
    },
    profileAvatar: {
        width: 130,
        height: 130,
        borderRadius: 65
    },
    optionsAvatarContainer: {
        marginTop: 10,
    },
    optionAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 0,
    },
    selectedAvatarOption: {
        borderWidth: 2,
        borderColor: 'blue',
    },
    staticInputProfile:{
        marginBottom: 10,
    },
    temporaryBtn: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#083474",
        borderRadius: 5,
        alignItems: "center",
    },
    temporaryBtnTxt:{
        color: "white",
        fontWeight: "bold"
    },
});