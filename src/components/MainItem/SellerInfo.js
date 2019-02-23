import React, { Component } from "react";
import { Text, View } from "react-native";
import { SellerInfoStyles as styles } from "./styles";
import { Header2, Header4 } from "../Text";
import Button from "../Button";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";

export default props => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Header2 color={"black"}>Federico</Header2>
        </View>
        <View style={styles.exploreIconContainer}>
          <Button>
            <Icon name="chevron-right" size={22} />
          </Button>
        </View>
      </View>
      <View style={styles.buttonListContainer}>
        <Button style={styles.button}>
          <Header4 color={"primary"}>Salva Venditore</Header4>
          <Icon name="heart" size={20} style={styles.buttonIcon} />
        </Button>
        <Button style={styles.button}>
          <Header4 color={"primary"}>Salva Inserzione</Header4>
          <Icon name="star" size={20} style={styles.buttonIcon} />
        </Button>
        <Button style={styles.button}>
          <Header4 color={"primary"}>Segnala Inserzione</Header4>
          <Icon
            name="exclamation-triangle"
            size={20}
            style={styles.buttonIcon}
          />
        </Button>
      </View>
    </View>
  );
};
