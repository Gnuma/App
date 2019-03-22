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
  }
});
