import { StyleSheet } from "react-native";
import colors from "../styles/colors";

export default StyleSheet.create({
  logoView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "200",
    letterSpacing: 5
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60,
    backgroundColor: colors.secondary,
    paddingVertical: 3,
    paddingHorizontal: 5
  },
  icon: {
    color: "white"
  },
  p5: {
    padding: 5
  },
  rightHeaderContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1
  },
  searchBoxContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white
  },
  searchInput: {
    fontSize: 18,
    paddingVertical: 2,
    paddingHorizontal: 6,
    flex: 1
  },
  resetIcon: {
    color: colors.black
  },
  searchIcon: {
    color: colors.grey
  }
});
