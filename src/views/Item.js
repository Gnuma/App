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

export class Item extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam("itemId", "Undesfineds");
    setTimeout(() => {
      this.setState({
        data: itemData
      });
    }, 500);
  }

  render() {
    const { data } = this.state;
    const { navigation } = this.props;
    const title = navigation.getParam("name", "Undefined");
    const authors = navigation.getParam("authors", "Undefined");
    const isLoading = data === undefined;

    return (
      <View style={{ flex: 1 }}>
        <ItemHeader
          handleGoBack={this._handleGoBack}
          title={title}
          authors={authors}
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
