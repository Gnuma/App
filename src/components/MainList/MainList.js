import React, { Component } from "react";
import { View, FlatList, Text, SectionList } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import ListMultiItem from "../ListItem/ListMultiItem";
import ListSingleItem from "../ListItem/ListSingleItem";
import { Header2, Header4 } from "../../components/Text";

export class MainList extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render() {
    const { data } = this.props;
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
              <Header2 color={"primary"}>{data.object.title}</Header2>
              <Header4 style={{ paddingBottom: 5, paddingLeft: 10 }}>
                {data.object.authors}
              </Header4>
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={results}
              renderItem={({ item }) => (
                <ListSingleItem data={item} isSingle={isSingle} />
              )}
              keyExtractor={this._keyExtractor}
            />
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={results}
            renderItem={({ item }) => (
              <ListMultiItem data={item} isSingle={isSingle} />
            )}
            keyExtractor={this._keyExtractor}
          />
        )}
      </View>
    );
  }

  _keyExtractor = item => {
    return item.id;
  };
}

export default MainList;
