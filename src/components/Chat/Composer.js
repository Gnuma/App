import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  PermissionsAndroid,
  Platform
} from "react-native";
import Button from "../Button";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header4, Header3, Header2 } from "../Text";
import { AudioRecorder, AudioUtils } from "react-native-audio";
import NativeButton from "../NativeButton";
import Sound from "react-native-sound";
import { ChatStatus, ChatType } from "../../utils/constants";

const audioPath = AudioUtils.CachesDirectoryPath + "/AAA.aac";

Sound.setCategory("Playback");

export default class Composer extends Component {
  componentDidMount() {
    this.requestPermissions();
  }

  state = {
    recording: false,
    hasPermission: false,
    currentTime: 0
  };

  startRecording = async () => {
    if (this.state.recording) return console.log("Can't Start Recording");
    if (!this.state.hasPermission)
      return console.warn("Can't record, no permission granted!");

    this.setState({
      recording: true
    });
    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  };

  stopRecording = async () => {
    if (!this.state.recording) {
      return console.log("Can't Stop Recording");
    }

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === "android") {
        this.finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  finishRecording(didSucceed, filePath, fileSize) {
    console.log(
      `Finished recording of duration ${
        this.state.currentTime
      } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`
    );
    setTimeout(() => {
      var sound = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log("failed to load the sound", error);
        }
      });

      setTimeout(() => {
        sound.play(success => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
          this.prepareRecording(audioPath);
          this.setState({
            recording: false
          });
        });
      }, 100);
    }, 100);
  }

  renderBlockedComposer = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ComposerContainer>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              margin: 6,
              alignItems: "center"
            }}
          >
            <Header3 color="black" style={{ flex: 1 }}>
              La chat non è più attiva. L'inserzione è stata eliminata o venduta
              ad un altro utente.
            </Header3>
            <Icon
              name={"ban"}
              size={40}
              style={{ color: colors.darkRed, marginHorizontal: 10 }}
            />
          </View>
        </ComposerContainer>
      </View>
    );
  };

  render() {
    const { text, onSend, onComposerTextChanged, data, type } = this.props;
    const { recording, currentTime } = this.state;
    const showPendingWarning =
      type === ChatType.shopping && data.status === ChatStatus.PENDING;
    if (data.status == ChatStatus.BLOCKED) {
      return this.renderBlockedComposer();
    }
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {showPendingWarning ? (
          <Header4 style={{ marginHorizontal: 20 }}>
            Ricorda che {data.UserTO.user.username} non potrà vedere i tuoi
            messaggi finchè non accetterà la conversazione
          </Header4>
        ) : null}
        <ComposerContainer>
          {recording ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Header3
                style={{
                  fontSize: 22,
                  paddingLeft: 14,
                  color: colors.secondary
                }}
              >
                {`${parseInt(currentTime / 60) % 10}:${parseInt(
                  currentTime / 10
                ) % 10}${parseInt(currentTime / 1) % 10}`}
              </Header3>
            </View>
          ) : (
            <TextInput
              style={{ flex: 1, fontSize: 18, maxHeight: 130, paddingLeft: 14 }}
              multiline={true}
              placeholder="Scrivi un messaggio"
              onChangeText={onComposerTextChanged}
              value={text}
            />
          )}
          {text || true /* NoRecording */ ? (
            <NativeButton
              style={{
                width: 40,
                height: 40,
                marginHorizontal: 10,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: 20,
                backgroundColor: colors.white
              }}
              onPress={onSend}
              disabled={!text}
            >
              <Icon
                name={"paper-plane"}
                size={26}
                style={{ color: !text ? colors.black : colors.secondary }}
              />
            </NativeButton>
          ) : (
            <NativeButton
              style={{
                width: 40,
                height: 40,
                marginHorizontal: 10,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: 20
              }}
              onPressIn={this.startRecording}
              onPressOut={this.stopRecording}
            >
              <Icon
                name={"microphone"}
                size={30}
                style={{
                  color: colors.secondary
                }}
              />
            </NativeButton>
          )}
        </ComposerContainer>
      </View>
    );
  }

  requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Quipu Accesso Microfono",
          message: "Utilizzare il microfono per mandari messaggi vocali",
          buttonNegative: "NO",
          buttonPositive: "SI"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ hasPermission: true });
        AudioRecorder.onProgress = data => {
          this.setState({ currentTime: Math.floor(data.currentTime) });
        };
        AudioRecorder.onFinished = data => {
          if (Platform.OS === "ios") {
            this.finishRecording(
              data.status === "OK",
              data.audioFileURL,
              data.audioFileSize
            );
          }
        };
        this.prepareRecording(audioPath);
      } else {
        this.setState({ hasPermission: false });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  prepareRecording = path => {
    AudioRecorder.prepareRecordingAtPath(path, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac"
      //AudioEncodingBitRate: 32000
    });
  };
}

const ComposerContainer = ({ children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: colors.white,
        elevation: 2,
        marginBottom: 10,
        marginTop: 5,
        marginHorizontal: 20,
        minHeight: 50
      }}
    >
      {children}
    </View>
  );
};
