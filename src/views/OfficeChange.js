import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OfficePicker from "../components/OfficePicker";
import BasicHeader from "../components/BasicHeader";

export class OfficeChange extends Component {
  static propTypes = {};

  state = {
    office: {
      name: "Liceo Classico Giulio Cesare",
      address: "Via dell'uno",
      type: "school",
      id: 5
    },
    course: { name: "A" },
    year: 2
  };

  setItem = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  complete = () => {
    console.log("complete");
    this.props.navigation.goBack(null);
  };

  render() {
    const { office, course, year } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <BasicHeader title={"Modifica il tuo istituto o scuola"} />
        <ScrollView keyboardShouldPersistTaps="always">
          <OfficePicker
            containerStyle={{ margin: 20, flex: 2 / 3 }}
            office={office}
            course={course}
            year={year}
            setOffice={office => this.setItem("office", office)}
            setCourse={course => this.setItem("course", course)}
            setYear={year => this.setItem("year", year)}
            complete={this.complete}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficeChange);
