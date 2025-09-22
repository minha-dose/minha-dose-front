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
  aboutContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  about: {
    height: "50%",
    width: "80%",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#083474',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  aboutText: {
    fontSize: 20,
    textAlign: 'justify',
    color: 'white',
  },
  connect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
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
  staticInputProfile: {
    marginBottom: 10,
  },
  temporaryBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#083474",
    borderRadius: 5,
    alignItems: "center",
  },
  temporaryBtnTxt: {
    color: "white",
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: '#002C5F',
    paddingHorizontal: 20,
  },
  cadastroInput: {
    width: '100%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 8,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#002C5F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    marginTop: 16,
    padding: 10,
    marginBottom: 20,
    color: '#fff',
  },
  cadastroCenterView: {
    alignItems: 'center',
    marginTop: 20
  },
  link: {
    fontWeight: 'bold',
    color: '#fff',
  },
  cadastroIntro: {
    color: '#fff',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    marginBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
});