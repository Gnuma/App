import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import styles from "./styles";
import * as searchActions from "../store/actions/search";
import LeftHeader from "./LeftHeader";
import CenterHeader from "./CenterHeader";
import RightHeader from "./RightHeader";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.searchBar = React.createRef();
    if (props.searchQueryRedux) this.state.searchQuery = props.searchQueryRedux;
  }

  static propTypes = {
    searchRedux: PropTypes.func,
    setActiveRedux: PropTypes.func,
    searchQueryRedux: PropTypes.string
  };

  state = {
    isActive: false,
    searchQuery: ""
  };

  render() {
    const { isActive, searchQuery } = this.state;
    const isItem =
      this.props.navigation &&
      this.props.navigation.state.routes[
        this.props.navigation.state.routes.length - 1
      ].routeName === "Item";
    return (
      <View style={styles.header}>
        <View style={styles.primary}>
          <LeftHeader
            isActive={isActive}
            isItem={isItem}
            handleGoBack={this.handleGoBack}
          />
          <CenterHeader
            isActive={isActive}
            searchQuery={searchQuery}
            onChangeText={searchQuery => this.setState({ searchQuery })}
            onFocus={e => {
              this.setActive(true);
              e.preventDefault();
            }}
            refProp={this.searchBar}
            onSubmitEditing={this.search}
            resetToHome={this.resetToHome}
          />
        </View>
        <View style={styles.secondary}>
          <RightHeader setActive={() => this.setActive(true)} />
        </View>
      </View>
    );
  }

  handleGoBack = () => {
    this.setActive(false, false);
    this.props.navigation.goBack(null);
  };

  resetToHome = () => {
    this.setState({
      searchQuery: ""
    });
    this.props.searchRedux("");
    this.setActive(false);
  };

  search = () => {
    this.props.searchRedux(this.state.searchQuery);
    this.setActive(false);
  };

  setActive = (isActive, doNavigate = true) => {
    this.setState({
      isActive: isActive
    });
    //this.props.setActiveRedux(isActive);
    if (doNavigate) {
      if (isActive) this.props.navigation.navigate("Search");
      else this.props.navigation.navigate("Home");
    }
  };
}

const mapStateToProps = state => ({
  searchQueryRedux: state.search.searchQuery
});

const mapDispatchToProps = dispatch => {
  return {
    searchRedux: (search_query, cap) =>
      dispatch(searchActions.search(search_query, cap)),
    setActiveRedux: isActive =>
      dispatch(searchActions.searchSetActive(isActive))
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
