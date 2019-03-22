import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const bottomBar = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 35
  },
  leftBox: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center"
  },
  middleBox: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white"
  },
  rightBox: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  }
});

export const generalStyle = StyleSheet.create({
  p10: {
    padding: 10
  },
  w: {
    color: "white"
  }
});

export const header = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});

export const cameraPreview = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    alignItems: "center"
  },
  itemContainer: {
    borderRadius: 4,
    marginHorizontal: 6,
    elevation: 4,
    borderColor: "white",
    borderWidth: 2,
    marginTop: 5
  },
  imagePreview: {
    height: 70,
    width: 52,
    justifyContent: "center",
    alignItems: "center"
  },
  deletePreviewBtn: {
    right: 3,
    top: 2,
    position: "absolute"
  },
  unknownPreview: {
    height: 74,
    width: 56,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    borderRadius: 4,
    marginTop: 5
  }
});
