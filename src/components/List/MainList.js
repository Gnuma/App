import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  SectionList,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import ListMultiItem from "../ListItem/ListMultiItem";
import ListSingleItem from "../ListItem/ListSingleItem";
import { Header2, Header4 } from "../../components/Text";
import colors from "../../styles/colors";
import Button from "../Button";
import NavigationService from "../../navigator/NavigationService";
import { StackActions } from "react-navigation";

export class MainList extends Component {
  static propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool
  };

  render() {
    const { data, isLoading } = this.props;

    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      );
    }
    if (!data || data.results.length <= 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Header2 style={{ margin: 10, textAlign: "center" }} color="black">
            Nessun Risultato
          </Header2>
        </View>
      );
    }
    //TEST
    /*
    if (!data || data.results.length <= 0) {
      return (
        <Button
          onPress={() => {
            const pushAction = StackActions.push({
              routeName: "Item",
              params: {
                itemID: 2,
                name: "FAKE",
                authors: "FAKE"
              }
            });
            NavigationService.dispatch(pushAction);
          }}
        >
          <Header2>AOOO</Header2>
        </Button>
      );
    }
    */
    //TEST

    const isSingle = data.resultType === "single";
    const results = data.results;

    return (
      <View style={{ flex: 1 }}>
        {isSingle ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                paddingLeft: 10,
                elevation: 3,
                backgroundColor: "#fff"
              }}
            >
              <Header2 color={"primary"}>{results[0].book.title}</Header2>
              <Header4 style={{ paddingBottom: 5, paddingLeft: 10 }}>
                {results[0].book.author}
              </Header4>
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={results}
              renderItem={this._renderSingleItem}
              keyExtractor={this._keyExtractor}
            />
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={results}
            renderItem={this._renderMultiItem}
            keyExtractor={this._keyExtractor}
          />
        )}
      </View>
    );
  }

  _keyExtractor = item => {
    return item.pk.toString();
  };

  _renderMultiItem = ({ item }) => {
    return <ListMultiItem data={item} />;
  };

  _renderSingleItem = ({ item }) => {
    return <ListSingleItem data={item} />;
  };
}

export default MainList;
