import React, { Component } from "react";
import { Text, View } from "react-native";
import SolidButton from "../SolidButton";
import { CachedImage as Image } from "react-native-cached-image";
import { Header2, Header1 } from "../Text";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";
import Button from "../Button";

export default ({ offert, item, goBookOffert }) => {
  return (
    <SolidButton
      style={{
        flexDirection: "row",
        marginHorizontal: 20
      }}
      onPress={goBookOffert}
    >
      <View style={{ flex: 1 / 5 }}>
        <Image
          style={{ flex: 1, borderRadius: 6 }}
          source={require("../../media/imgs/mockHomeBook.png")}
          resizeMode={"cover"}
        />
      </View>
      <View style={{ flex: 4 / 5, paddingHorizontal: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Header2
            color={"primary"}
            numberOfLines={1}
            style={{ flex: 1, marginRight: 5 }}
          >
            {item.book.title}
          </Header2>
          <Icon
            name={"chevron-right"}
            size={18}
            style={{ color: colors.black }}
          />
        </View>
        <Header1 color={"primary"} numberOfLines={1}>
          EUR {offert.value}
        </Header1>
      </View>
    </SolidButton>
  );
};
