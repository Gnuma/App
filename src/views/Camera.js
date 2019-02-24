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
  state = {
    flashMode: RNCamera.Constants.FlashMode.off,
    previews: [null, null, null, null, null]
  };

  previewsOrder = [0, 1, 2, 3, 4];
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
          _reorderPreviews={this._reorderPreviews}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <CameraBottom
            takePicture={() => this.takePicture(camera)}
            flashMode={this.state.flashMode}
            changeFlashMode={this.changeFlashMode}
            handleGoNext={this.handleGoNext}
          />
        </View>
      </View>
    );
  };

  handleGoNext = () => {
    console.log("AO");
    this.props.navigation.navigate("SelectBook");
  };

  changeFlashMode = () => {
    if (this.state.flashMode === RNCamera.Constants.FlashMode.off)
      this.setState({
        flashMode: RNCamera.Constants.FlashMode.on
      });
    else
      this.setState({
        flashMode: RNCamera.Constants.FlashMode.off
      });
  };

  handleGoBack = () => {
    console.log("going back");
    this.props.navigation.goBack(null);
  };

  _reorderPreviews = nextOrder => {
    if (!nextOrder) nextOrder = this.previewsOrder;
    console.log("NextOrder", nextOrder);
    let flagged = false;
    for (let i = 0; i < nextOrder.length; i++) {
      if (this.state.previews[Number(nextOrder[i])] === null) {
        console.log("I", i);
        this.imgCounter = nextOrder[i];
        flagged = true;
        break;
      }
    }
    if (!flagged) this.imgCounter = -1;
    this.previewsOrder = nextOrder;
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
      if (this.imgCounter !== -1) {
        await camera
          .takePictureAsync(options)
          .then(data => {
            console.log(data);
            this.state.previews[this.imgCounter] = data;
            this.forceUpdate(this._reorderPreviews);
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
