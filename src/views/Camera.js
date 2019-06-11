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
import _ from "lodash";
import update from "immutability-helper";
import MainCamera from "../components/Camera/MainCamera";
import { HiddenBar, TransparentBar } from "../components/StatusBars";
import { SafeAreaView } from "react-navigation";
import NewImageReviewr from "../components/Camera/NewImageReviewr";

export class Camera extends Component {
  imgCounter = 5;
  camera = null;

  state = {
    flashMode: RNCamera.Constants.FlashMode.off,
    status: 0, //0: can take photo; 1: loading; 2: accepting/rejecting
    cameraStatus: null
  };

  openImagePicker = () => {
    this.props.navigation.navigate("ImagePicker");
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
              status: 0
            }));
            this.props.addReview(data);
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

  handleReview = (isAccepted, img, offset, size) => {
    if (isAccepted) {
      console.log(
        img,
        { x: img.width * offset.x, y: img.height * offset.y },
        {
          width: img.width * size.width,
          height: img.height * size.height
        }
      );
      const uri = img.uri;
      ImageEditor.cropImage(
        uri,
        {
          offset: {
            x: Math.round(img.width * offset.x),
            y: Math.round(img.height * offset.y)
          },
          size: {
            width: Math.round(img.width * size.width),
            height: Math.round(img.height * size.height)
          },
          displaySize: {
            width: 300,
            height: 400
          }
        },
        uri => {
          ImageStore.getBase64ForTag(
            uri,
            base64 => {
              this.props.takePreviewRedux({ base64, uri });
              //this.props.addReview({ base64, uri });
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
      status: 0
    }));
    this.props.removeReview();
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
    const isReviewing = !_.isEmpty(this.props.checking);
    const { flashMode, loaded } = this.state;
    const { previews, previewsOrder } = this.props;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.fullBlack }}>
        <View style={{ flex: 1 }}>
          <TransparentBar />
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
              <NewImageReviewr
                data={this.props.checking[0]}
                setReviewOptions={this.setReviewOptions}
                handleReview={this.handleReview}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
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
  previewsOrder: state.sell.previewsOrder,
  checking: state.sell.checking
});

const mapDispatchToProps = dispatch => {
  return {
    takePreviewRedux: data => dispatch(sellActions.takePreview(data)),
    setPreviewsOrderRedux: nextOrder =>
      dispatch(sellActions.setPreviewsOrder(nextOrder)),
    deletePreviewRedux: index => dispatch(sellActions.deletePreview(index)),
    addReview: data => dispatch(sellActions.sellAddReview(data)),
    removeReview: () => dispatch(sellActions.sellRemoveReview())
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
  pauseAfterCapture: true
  //width: 1080,
  //skipProcessing: true
};
