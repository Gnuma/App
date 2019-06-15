import React, { Component } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../components/BasicHeader";
import { Header2, Header1, Header3 } from "../components/Text";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import LevelList from "../components/UserSettings/LevelList";
import SolidButton from "../components/SolidButton";
import Card from "../components/Card";
import ActionsList from "../components/UserSettings/ActionsList";
import { BlurView } from "@react-native-community/blur";
import CircleValue from "../components/CircleValue";
import Button from "../components/Button";
import * as authActions from "../store/actions/auth";
import Divider from "../components/Divider";

const marginHorizontal = 20;

export class UserSettings extends Component {
  static propTypes = {};

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("willFocus", () => {
      StatusBar.setBackgroundColor(colors.darkGreen);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  state = {
    viewRef: null
  };

  logout = () => {
    console.log("Logging Out..");

    setTimeout(() => {
      this.props.logout();
      this.props.navigation.navigate("Home");
    }, 100);
  };

  goUserInfo = () => {
    setTimeout(() => {
      this.props.navigation.navigate("UserInfo");
    }, 100);
  };

  goChangeOffice = () => {
    setTimeout(() => {
      this.props.navigation.navigate("OfficeChange");
    }, 100);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BasicHeader title="Il Tuo Profilo" />
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ marginHorizontal: marginHorizontal, marginTop: 15 }}>
              <UserInfoPanel />
            </View>
            <Divider
              style={{
                marginHorizontal: marginHorizontal,
                marginTop: 15
              }}
            />
            <View style={{ marginHorizontal: marginHorizontal, marginTop: 5 }}>
              <View style={{ flexDirection: "row" }}>
                <Header1 color="black" style={{ flex: 1 }} numberOfLines={1}>
                  Livello
                </Header1>
                <Button
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20
                  }}
                  onPress={() => this.setState({ showLevelInfo: true })}
                >
                  <Icon
                    name={"question-circle"}
                    size={30}
                    style={{ color: colors.primary }}
                  />
                </Button>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <LevelList />
              <Header2 style={{ alignSelf: "center", marginTop: 5 }}>
                <Header2
                  color="secondary"
                  style={{ fontWeight: "800", fontSize: 30 }}
                >
                  70
                </Header2>
                /100
              </Header2>
            </View>
            <View style={{ marginHorizontal: marginHorizontal, marginTop: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <Header2 style={{ flex: 1 }} numberOfLines={1} color="black">
                  Libri Acquistati
                </Header2>
                <Header1 color="black" style={{ fontWeight: "800" }}>
                  0
                </Header1>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Header2 style={{ flex: 1 }} numberOfLines={1} color="black">
                  Libri Venduti
                </Header2>
                <Header1 color="black" style={{ fontWeight: "800" }}>
                  0
                </Header1>
              </View>
            </View>
            <Divider
              style={{
                marginHorizontal: 20,
                marginVertical: 15
              }}
            />
            <ActionsList
              logout={this.logout}
              goUserInfo={this.goUserInfo}
              goChangeOffice={this.goChangeOffice}
            />
          </ScrollView>
        </View>
        {this.state.showLevelInfo && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: "rgba(0,0,0,0.8)"
            }}
          >
            <TouchableWithoutFeedback onPress={this.dismissLevelInfo}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <LevelInfo dismiss={this.dismissLevelInfo} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    );
  }

  dismissLevelInfo = () => {
    this.setState({ showLevelInfo: false });
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.authLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const LevelSample = () => {
  const data = [1, 2, 3, 4];
  const radius = (viewportWidth * 0.8) / (data.length * 2);

  function renderItem({ item }) {
    return (
      <CircleValue
        radius={radius}
        type={CircleValue.CircleValueType.LEVEL}
        value={item}
        inactive={item > 1}
        experience={(item == 1 && 70) || 0}
      />
    );
  }

  return (
    <View style={{ height: radius * 2, marginVertical: 6 }}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
      />
    </View>
  );
};

const UserInfoPanel = ({
  username = "Francesco",
  office = "Liceo Giulio Cesare",
  address = "Via Giacomo Peroni"
}) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Header1 style={{ flex: 1 }} color="primary" numberOfLines={1}>
          {username}
        </Header1>
        <Icon name={"user"} size={30} style={{ color: colors.black }} />
      </View>
      <View
        style={{ alignItems: "center", marginTop: 13, flexDirection: "row" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            flex: 4 / 5
          }}
        >
          <Header2 numberOfLines={1} color="secondary">
            {office}
          </Header2>
          <Header3 numberOfLines={1} color="secondary">
            {address}
          </Header3>
        </View>
      </View>
    </View>
  );
};

const LevelInfo = ({ dismiss }) => {
  return (
    <Card
      style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
    >
      <Header2 color="black">Livello Profilo</Header2>
      <LevelSample />
      <Header3 color="black" style={{ marginBottom: 4 }}>
        Sali di livello vendendo o acquistando libri, ottenendo feedback
        positivi dagli altri utenti o aiutando la comunità facendo report di bug
        o invitando nuovi utenti.
      </Header3>
      <SolidButton center onPress={dismiss}>
        <Header3 color="secondary" style={{ flex: 1, textAlign: "center" }}>
          Capito
        </Header3>
      </SolidButton>
    </Card>
  );
};
