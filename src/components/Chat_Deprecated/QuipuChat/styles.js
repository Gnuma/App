import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const bubbleWidth = wp(85);

export default StyleSheet.create({
  generalBubble: {
    maxWidth: bubbleWidth,
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 10,
    elevation: 1,
    marginBottom: 4
  },
  fromBubble: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end"
  },
  toBubble: {
    backgroundColor: colors.white,
    alignSelf: "flex-start"
  },
  flex_1: {
    flex: 1
  },
  composerContain: {
    flexDirection: "row",
    borderTopColor: "black",
    backgroundColor: colors.white,
    elevation: 4
  },
  composerInput: {
    flex: 1
  },
  composerIcon: {
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});
