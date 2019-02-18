import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MainList from "../components/MainList/MainList";
import { Header1 } from "../components/Text";

export class Home extends Component {
  static propTypes = {
    results: PropTypes.object,
    isSearchActive: PropTypes.bool
  };

  getContent = () => {
    if (this.props.results !== null)
      return <MainList data={this.props.results} />;
    else return <Header1>Home</Header1>;
  };

  render() {
    const content = this.getContent();
    return content;
  }
}

const mapStateToProps = state => ({
  isSearchActive: state.search.isActive,
  results: state.search.results
});

const mapDispatchToProps = {};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
