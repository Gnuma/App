import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItemHeader from "../components/MainItem/ItemHeader";
import { itemData } from "../mockData/Item";
import MainItem from "../components/MainItem/MainItem";
import ContactButton from "../components/MainItem/ContactButton";
import colors from "../styles/colors";
import NavigatorService from "../navigator/NavigationService";
import axios from "axios";
import { ___GET_AD___ } from "../store/constants";
export class Item extends Component {
  state = {
    data: undefined,
    bookName: this.props.navigation.getParam("name", "Undesfineds"),
    bookAuthors: this.props.navigation.getParam("authors", "Undesfineds")
  };

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam("itemID", "Undesfineds");

    axios
      .get(___GET_AD___ + `${id}/`)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  render() {
    const { data, bookName, bookAuthors } = this.state;
    const { navigation } = this.props;
    const isLoading = data === undefined;

    return (
      <View style={{ flex: 1 }}>
        <ItemHeader
          handleGoBack={this._handleGoBack}
          title={bookName}
          authors={bookAuthors}
        />
        {isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <MainItem data={data} />
            <ContactButton onContact={this._handleContact} />
          </View>
        )}
      </View>
    );
  }

  _handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  _handleContact = () => {
    NavigatorService.protectedNavigation("CHAT");
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//<ImageSlider imgWidth={imageWidth} imgHeight={imageHeight} />
