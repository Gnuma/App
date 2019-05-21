import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  ImageEditor,
  ImageStore
} from "react-native";
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
import { Header2 } from "../components/Text";
import CameraBottom from "../components/Camera/CameraBottom";
import CameraHeader from "../components/Camera/CameraHeader";
import * as sellActions from "../store/actions/sell";
import colors from "../styles/colors";
import ImageReviewer from "../components/Camera/ImageReviewer";
import ImagePicker from "react-native-image-crop-picker";
import _ from "lodash";
import update from "immutability-helper";
import MainCamera from "../components/Camera/MainCamera";

export class Camera extends Component {
  imgCounter = 5;
  camera = null;

  state = {
    flashMode: RNCamera.Constants.FlashMode.off,
    status: 0, //0: can take photo; 1: loading; 2: accepting/rejecting
    checking: [],
    cameraStatus: null
  };

  openImagePicker = () => {
    ImagePicker.openPicker(pickerOptions)
      .then(images => {
        const freeSpace = Math.min(this.imgCounter, images.length);
        let takenImages = [];
        for (let i = 0; i < freeSpace; i++) {
          takenImages.push(images[i]);
        }
        console.log(takenImages);
        this.imgCounter -= takenImages.length;
        this.setState(prevState => ({
          checking: update(prevState.checking, { $push: takenImages })
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  takePicture = async () => {
    if (this.camera && this.state.status == 0) {
      if (this.imgCounter > 0) {
        this.setState({
          status: 1
        });
        await this.camera
          .takePictureAsync(options)
          .then(data => {
            this.setState(prevState => ({
              status: 0,
              checking: update(prevState.checking, { $push: [data] })
            }));
            this.imgCounter--;
            //setTimeout(() => this.camera.resumePreview(), 500);
          })
          .catch(err => {
            console.log(err);
            this.setState({
              status: 0
            });
            this.camera.resumePreview();
          });
      }
    }
  };

  handleReview = (isAccepted, offsetPercentage, sizePercentage) => {
    if (isAccepted) {
      const img = this.state.checking[0];
      const uri = img.uri ? img.uri : img.path;
      ImageEditor.cropImage(
        uri,
        {
          offset: {
            x: img.width * offsetPercentage.x,
            y: img.height * offsetPercentage.y
          },
          size: {
            width: img.width * sizePercentage.width,
            height: img.height * sizePercentage.height
          }
        },
        uri => {
          ImageStore.getBase64ForTag(
            uri,
            base64 => {
              this.props.takePreviewRedux({ base64, uri });
            },
            () => {
              console.warn("Err base64");
            }
          );
        },
        () => {
          console.warn("Error while cropping preview");
        }
      );
    }

    this.setState(prevState => ({
      status: 0,
      checking: update(prevState.checking, { $splice: [[0, 1]] })
    }));
  };

  handleGoNext = () => {
    this.props.navigation.navigate("SelectBook");
  };

  changeFlashMode = () => {
    this.setState(prevState => ({
      flashMode:
        prevState.flashMode === RNCamera.Constants.FlashMode.off
          ? RNCamera.Constants.FlashMode.on
          : RNCamera.Constants.FlashMode.off
    }));
  };

  handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  deleteItem = index => {
    this.props.deletePreviewRedux(index);
    this.imgCounter++;
  };

  _reorderPreviews = nextOrder => {
    this.props.setPreviewsOrderRedux(nextOrder);
  };

  render() {
    const isReviewing = !_.isEmpty(this.state.checking);
    const { flashMode } = this.state;
    const { previews, previewsOrder } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: colors.black }}>
        {!isReviewing && (
          <MainCamera
            flashMode={flashMode}
            initCamera={this.initCamera}
            cameraStatusChange={this.cameraStatusChange}
            takePicture={this.takePicture}
            changeFlashMode={this.changeFlashMode}
            openImagePicker={this.openImagePicker}
          />
        )}
        <CameraHeader
          previews={previews}
          previewsOrder={previewsOrder}
          handleGoBack={this.handleGoBack}
          _reorderPreviews={this._reorderPreviews}
          deleteItem={this.deleteItem}
          previewsOrder={previewsOrder}
          handleGoNext={this.handleGoNext}
        />
        <View style={{ flex: 1 }}>
          {isReviewing && (
            <ImageReviewer
              data={this.state.checking[0]}
              setReviewOptions={this.setReviewOptions}
              handleReview={this.handleReview}
            />
          )}
        </View>
      </View>
    );
  }

  renderLoader = () => {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  };

  initCamera = camera => {
    if (camera) {
      if (!this.camera)
        this.setState({
          cameraStatus: camera.getStatus()
        });

      this.camera = camera;
    }
  };

  cameraStatusChange = ({ cameraStatus }) => {
    this.setState({
      cameraStatus
    });
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

const options = {
  quality: 1,
  orientation: "portrait",
  fixOrientation: true,
  forceUpOrientation: true,
  pauseAfterCapture: true,
  width: 1080
};

const pickerOptions = {
  multiple: true,
  mediaType: "photo"
};
