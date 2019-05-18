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

export class Camera extends Component {
  imgCounter = 5;

  state = {
    flashMode: RNCamera.Constants.FlashMode.off,
    status: 0, //0: can take photo; 1: loading; 2: accepting/rejecting
    checking: [],
    cameraStatus: null,
    headerBound: null,
    footerBound: null,
    previewOffset: null,
    previewSize: null
  };

  componentDidMount() {
    /*
    const { navigation } = this.props;
    navigation.addListener("willFocus", () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener("willBlur", () =>
      this.setState({ focusedScreen: false })
    );*/
  }

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
            setTimeout(() => this.camera.resumePreview(), 500);
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

  handleReview = isAccepted => {
    if (isAccepted) {
      console.log({
        offset: this.state.previewOffset,
        size: this.state.previewSize
      });
      console.log(this.state.checking);
      const img = this.state.checking[0];
      const uri = img.uri ? img.uri : img.path;
      ImageEditor.cropImage(
        uri,
        {
          offset: {
            x: img.width * this.state.previewOffset.x,
            y: img.height * this.state.previewOffset.y
          },
          size: {
            width: img.width * this.state.previewSize.width,
            height: img.height * this.state.previewSize.height
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
    return (
      <View style={{ flex: 1 }}>
        {this.props.navigation.isFocused() && (
          <RNCamera
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.back}
            flashMode={flashMode}
            //permissionDialogTitle={"Can I use your camera por favor?"}
            //permissionDialogMessage={"PLIZZZZ"}
            captureAudio={false}
            autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }}
            ref={camera => {
              if (camera) {
                if (!this.camera)
                  this.setState({
                    cameraStatus: camera.getStatus()
                  });

                this.camera = camera;
              }
            }}
            onStatusChange={({ cameraStatus }) => {
              this.setState({
                cameraStatus
              });
            }}
          />
        )}
        {isReviewing ? (
          <ImageReviewer
            data={this.state.checking}
            headerBound={this.state.headerBound}
            footerBound={this.state.footerBound}
            setReviewOptions={this.setReviewOptions}
            handleReview={this.handleReview}
          />
        ) : null}
        {this.getOverlay()}
      </View>
    );
  }

  setReviewOptions = data => {
    this.setState({
      previewOffset: data.offset,
      previewSize: data.size
    });
  };

  getOverlay = () => {
    //console.log(camera, status);
    const isReviewing = !_.isEmpty(this.state.checking);
    const { previews, previewsOrder } = this.props;
    if (this.camera && this.state.cameraStatus === "READY") {
      return (
        <View style={StyleSheet.absoluteFill}>
          <View
            onLayout={event =>
              this.setState({
                headerBound:
                  event.nativeEvent.layout.y +
                  event.nativeEvent.layout.height +
                  5
              })
            }
          >
            <CameraHeader
              previews={previews}
              previewsOrder={previewsOrder}
              handleGoBack={this.handleGoBack}
              _reorderPreviews={this._reorderPreviews}
              deleteItem={this.deleteItem}
              previewsOrder={previewsOrder}
              handleGoNext={this.handleGoNext}
              status={this.state.status}
            />
          </View>
          <View style={{ flex: 1 }} />
          <View
            onLayout={event =>
              this.setState({
                footerBound: event.nativeEvent.layout.y - 5
              })
            }
          >
            <CameraBottom
              takePicture={this.takePicture}
              flashMode={this.state.flashMode}
              changeFlashMode={this.changeFlashMode}
              isVisible={!isReviewing}
              openImagePicker={this.openImagePicker}
            />
          </View>
          {this.state.status == 1 ? this.renderLoader() : null}
        </View>
      );
    } else if (this.camera && this.state.cameraStatus === "NOT_AUTHORIZED") {
      return <Header2>Not for permission</Header2>;
    } else {
      return this.renderLoader();
    }
  };

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
  pauseAfterCapture: true
};

const pickerOptions = {
  multiple: true,
  mediaType: "photo"
};
