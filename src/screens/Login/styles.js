import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  headerView: {},
  mainView: {},
  textAppName: {
    color: "#7E74F1",
    fontFamily: "Inter_900Black",
    fontSize: 28,
    textAlign: "center",
  },
  inputEmailAndPassword: {
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    borderColor: "#922626",
    color: "#000",
    elevation: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    marginTop: 40,
    height: 58,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 3,
    width: 350,
  },
  btnLogIn: {
    alignItems: "center",
    backgroundColor: "#7E74F1",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    height: 52,
    width: 345,
  },
  btnSignIn: {
    justifyContent: "center",
    alignItems: "center",
  },
  textLogIn: {
    color: "#fff",
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
  textHelp: {
    color: "#7E74F1",
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
});

export default styles;
