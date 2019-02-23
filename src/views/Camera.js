import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
import { Header2 } from "../components/Text";
import CameraBottom from "../components/Camera/CameraBottom";
import CameraHeader from "../components/Camera/CameraHeader";

const imgWidth = 720;
const imgHeight = 1280;

export class Camera extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    flashMode: RNCamera.Constants.FlashMode.on,
    previews: [null, null, null, null, null]
  };

  imgCounter = 0;

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener("willBlur", () =>
      this.setState({ focusedScreen: false })
    );
  }

  render() {
    const { flashMode } = this.state;
    if (!this.state.focusedScreen) return <Header2>Booo</Header2>;

    return (
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={flashMode}
        permissionDialogTitle={"Can I use your camera por favor?"}
        permissionDialogMessage={"PLIZZZZ"}
        captureAudio={false}
      >
        {this.getOverlay}
      </RNCamera>
    );
  }

  getOverlay = ({ camera, status }) => {
    if (status !== "READY") return <Header2>Waiting for permission</Header2>;
    return (
      <View style={{ flex: 1 }}>
        <CameraHeader
          previews={this.state.previews}
          handleGoBack={this.handleGoBack}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <CameraBottom takePicture={() => this.takePicture(camera)} />
        </View>
      </View>
    );
  };

  handleGoBack = () => {
    console.log("going back");
    this.props.navigation.goBack(null);
  };

  takePicture = async camera => {
    if (camera) {
      const options = {
        quality: 0.8,
        base64: true,
        width: imgWidth,
        height: imgHeight,
        orientation: "portrait",
        fixOrientation: true,
        forceUpOrientation: true
      };
      if (this.imgCounter < 5) {
        await camera
          .takePictureAsync(options)
          .then(data => {
            console.log(data);
            this.state.previews[this.imgCounter] = data;
            this.forceUpdate();
            this.imgCounter++;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Camera);
