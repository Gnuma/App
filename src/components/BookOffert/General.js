import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import ListMultiItem from "../ListItem/ListMultiItem";

export const OffertInfo = ({ item, children }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ListMultiItem data={item} isSingle={false} pk={item._id} />
      <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}>
        {children}
      </View>
    </ScrollView>
  );
};

export const DecisionBox = ({ children }) => {
  return <View style={{ margin: 10 }}>{children}</View>;
};
