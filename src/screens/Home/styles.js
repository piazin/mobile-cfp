import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 25,
  },

  globalTextColor: {
    color: "#ffffff",
  },
});

// feature
export const lightMode = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 25,
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userNameText: {
    color: "#656D72",
    fontSize: 16,
    fontWeight: "bold",
  },
  profilePic: {
    borderRadius: 10,
    width: 65,
    height: 65,
    marginRight: 15,
  },
  balanceBox: {
    alignItems: "center",
    marginVertical: 30,
  },
  balanceInfo: {
    alignItems: "center",
    backgroundColor: "#7E74F1",
    borderRadius: 20,
    justifyContent: "center",
    width: "100%",
    height: 200,
    overflow: "hidden",
    position: "relative",
  },
  currentBalance: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },
  waveBalanceRight: {
    borderRadius: 50,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    position: "absolute",
    right: "-95%",
    opacity: 0.8,
  },
  waveBalanceLeft: {
    borderRadius: 50,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: "-95%",
    opacity: 0.8,
  },
  globalTextColor: {
    color: "#1e1e1e",
  },
});
