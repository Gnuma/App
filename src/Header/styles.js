import { StyleSheet } from "react-native";
import colors from "../styles/colors";

export default StyleSheet.create({
  logoView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    margin: 4
  },
  logoText: {
    fontSize: 20,
    color: "white"
  },
  searchLogo: {
    color: "white",
    paddingRight: 6
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: colors.secondary
  },
  primary: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10
  },
  secondary: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    color: "white"
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 18,
    padding: 2,
    backgroundColor: "white",
    flex: 1
  },
  p5: {
    padding: 5
  }
});
