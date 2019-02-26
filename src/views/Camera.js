import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
import { Header2 } from "../components/Text";
import CameraBottom from "../components/Camera/CameraBottom";
import CameraHeader from "../components/Camera/CameraHeader";
import * as sellActions from "../store/actions/sell";

const imgWidth = 720;
const imgHeight = 1280;

export class Camera extends Component {
  state = {
    flashMode: RNCamera.Constants.FlashMode.off
  };

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
    const { previews, previewsOrder } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CameraHeader
          previews={previews}
          previewsOrder={previewsOrder}
          handleGoBack={this.handleGoBack}
          _reorderPreviews={this._reorderPreviews}
          deleteItem={this.deleteItem}
          previewsOrder={previewsOrder}
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
    this.props.navigation.goBack(null);
  };

  deleteItem = index => {
    this.props.deletePreviewRedux(index);
  };

  _reorderPreviews = nextOrder => {
    this.props.setPreviewsOrderRedux(nextOrder);
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
            this.props.takePreviewRedux(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
}

const mapStateToProps = state => ({
  previews: state.sell.previews,
  previewsOrder: state.sell.previewsOrder
});

const mapDispatchToProps = dispatch => {
  return {
    takePreviewRedux: data => dispatch(sellActions.takePreview(data)),
    setPreviewsOrderRedux: nextOrder =>
      dispatch(sellActions.setPreviewsOrder(nextOrder)),
    deletePreviewRedux: index => dispatch(sellActions.deletePreview(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Camera);
