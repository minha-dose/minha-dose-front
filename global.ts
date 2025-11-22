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
  profileHorizontalContainer: {
    gap: 5,
    marginTop: 20,
  },
  profileInput: {
    flex: 1,
    borderColor: '#E0E0E0',
    fontSize: 12,
    color: '#022757',
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  profileRegularInput: {
    marginBottom: 10,
  },
  profileLabel: {
    color: '#022757',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileSideBySide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  profileColum: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileBtnUpdate: {
    marginTop: 25,
    backgroundColor: '#022757',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  profileUpdateBtnTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  generalProfile: {
    gap: 12,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#022757',
  },
  loadingTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF'
  },
  loadingSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  loadingImage: {
    width: 350,
    height: 350,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    paddingHorizontal: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  eyeButton: {
    paddingLeft: 10,
    paddingRight: 4,
  },
  rulesList: {
    marginTop: 10,
    marginBottom: 20,
  },
  cadastroInput: {
    width: '100%',
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#F5F5F5',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonCadastro: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#858282ff',
  },
  continueButton: {
    backgroundColor: '#002C66',
  },
  buttonCadastroText: {
    color: '#fff',
    fontWeight: 'bold',
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
    color: '#022757',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  cadastroSubTitle: {
    color: '#022757',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  smallLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center'
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
  appointmentMainView: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  appointmentScreenTitle: {
    fontSize: 15,
    marginTop: 20,
    color: "#002856",
    textAlign: "center",
    marginBottom: 20,
  },
  appointmentSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 40,
    marginTop: 20,
  },
  appointmentSearchIcon: {
    marginRight: 10,
  },
  appointmentSearchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#333",
  },
  appointmentFlatListContainer: {
    paddingBottom: 30,
  },
  appointmentFlatListItem: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  appointmentFlatListText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  appointmentEmptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 30,
  },
  appointUbsChooseBtnTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  appointmentUbsChooseBtn: {
    backgroundColor: "#022757",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center"
  },
  appointmentUbsChooseView: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20
  },
  loadingAppointment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF"
  },
  loadingAppointmentTxt: {
    marginTop: 10,
    color: "#002856"
  },
  showPasswordText: {
    color: '#fff',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
});