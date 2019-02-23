import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const MainItemStyles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  imageSlider: {
    marginTop: 10
  },
  content: {
    flex: 1,
    marginHorizontal: 35
  },
  bigDivider: {
    marginTop: 25,
    marginBottom: 10
  },
  smallDivider: {
    marginTop: 10,
    marginBottom: 10
  }
});

export const HeaderStyles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 6
  },
  goBack: {
    padding: 10
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center"
  },
  authors: {
    marginLeft: 10
  }
});

export const ItemInfoStyles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  rightAlign: {
    flex: 1,
    alignItems: "flex-end"
  },
  conditionOfficeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15
  },
  descriptionContainer: {
    alignItems: "center"
  },
  textCenterAlign: {
    textAlign: "center"
  },
  secondaryInfoContainer: {
    flexDirection: "row"
  }
});

export const SellerInfoStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 4,
    padding: 10,
    borderRadius: 6
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  exploreIconContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  buttonListContainer: {
    marginVertical: 10
  },
  button: {
    backgroundColor: "white",
    elevation: 2,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 4
  },
  buttonIcon: {
    position: "absolute",
    right: 10,
    alignSelf: "center"
  }
});
