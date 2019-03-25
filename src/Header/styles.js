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
    paddingHorizontal: 15
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
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 6,
    overflow: "hidden"
  },
  searchInput: {
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flex: 1
  },
  resetIcon: {
    color: colors.primary
  },
  searchIcon: {
    color: colors.primary,
    paddingRight: 8
  },
  goBack: {
    padding: 10,
    marginLeft: -10,
    color: colors.white
  }
});
