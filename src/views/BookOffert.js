import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../components/BasicHeader";
import { Header3, Header2, Header1 } from "../components/Text";
import FullButton from "../components/FullButton";
import { ListMultiItem } from "../components/ListItem/ListMultiItem";
import { ChatType, ChatStatus } from "../utils/constants";
import Card from "../components/Card";
import PriceInput from "../components/Sell/PriceInput";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import Button from "../components/Button";
import * as chatActions from "../store/actions/chat";
import LoadingOverlay from "../components/LoadingOverlay";
import _ from "lodash";

const CreateOffert = ({
  item,
  price,
  setPrice,
  setPriceRef,
  focusPrice,
  createOffert
}) => {
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Header3
              color="primary"
              numberOfLines={1}
              style={{ flex: 1, marginRight: 5 }}
            >
              Scegli il prezzo
            </Header3>
            <Button
              style={{ borderRadius: 13, padding: 4 }}
              onPress={focusPrice}
            >
              <Icon
                name="edit"
                size={22}
                style={{
                  color: colors.black
                }}
              />
            </Button>
          </View>
          <PriceInput
            onChangeText={setPrice}
            value={price}
            containerStyle={{ marginVertical: 5, alignSelf: "center" }}
            onFocus={() => setPrice("")}
          />
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          onPress={createOffert}
          value="Fai una offerta"
          icon="tags"
          style={{ marginBottom: 6 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
        />
      </DecisionBox>
    </View>
  );
};

const DecideOffert = ({ item, offert, rejectOffert, acceptOffert }) => {
  console.log(item, offert);
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
            <Header2 style={{ flex: 1, marginRight: 5 }} color="black">
              {offert.creator.user.username}
            </Header2>
            <Header3 color="secondary">Offerta</Header3>
          </View>
          <Header1 color="primary" style={{ alignSelf: "center" }}>
            EUR {offert.value}
          </Header1>
        </Card>
        <Card>
          <View style={{ flexDirection: "row" }}>
            <Header2 color="black">{offert.creator.user.username}</Header2>
          </View>
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          value="Rifiuta"
          onPress={rejectOffert}
          icon="times"
          style={{ marginVertical: 4 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
          color={"darkRed"}
        />
        <FullButton
          value="Accetta"
          onPress={acceptOffert}
          icon="check"
          style={{ marginBottom: 6 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
        />
      </DecisionBox>
    </View>
  );
};

const EditOffert = ({ item, offert, removeOffert }) => {
  return (
    <View style={{ flex: 1 }}>
      <OffertInfo item={item}>
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignContent: "center"
            }}
          >
            <Header2
              color="secondary"
              numberOfLines={1}
              style={{ marginRight: 12, textAlignVertical: "center" }}
            >
              Offerta
            </Header2>
            <Header1 color="primary" style={{ alignSelf: "center" }}>
              EUR {offert.value}
            </Header1>
          </View>
        </Card>
      </OffertInfo>
      <DecisionBox>
        <FullButton
          onPress={removeOffert}
          value="Rimuovi Offerta"
          icon="times"
          style={{ marginVertical: 4 }}
          contentStyle={{ flex: 1, textAlign: "center" }}
          color={"darkRed"}
        />
      </DecisionBox>
    </View>
  );
};

const OffertInfo = ({ item, children }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ListMultiItem data={item} isSingle={false} pk={item._id} />
      <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}>
        {children}
      </View>
    </ScrollView>
  );
};

const DecisionBox = ({ children }) => {
  return <View style={{ margin: 10 }}>{children}</View>;
};

export class BookOffert extends Component {
  constructor(props) {
    super(props);
    this.type = props.navigation.getParam("type", null);
    const objectID = props.navigation.getParam("objectID", null);
    const chatID = props.navigation.getParam("chatID", null);
    this.state = {
      objectID,
      chatID,
      price:
        this.type == ChatType.sales
          ? props.data[objectID].price.toString()
          : props.data[objectID].chats[chatID].item.price.toString()
    };
  }

  static propTypes = {
    //type: PropTypes.string,
  };

  createOffert = () => {
    const { objectID, chatID, price } = this.state;
    this.props.chatCreateOffert(objectID, chatID, price);
  };

  removeOffert = () => {
    return ToastAndroid.show("Coming soon...", ToastAndroid.SHORT);
    this.props.chatCancelOffert(objectID, chatID);
  };

  rejectOffert = () => {
    const { objectID, chatID } = this.state;
    this.props.chatRejectOffert(objectID, chatID);
  };

  acceptOffert = () => {
    const { objectID, chatID } = this.state;
    this.props.chatAcceptOffert(objectID, chatID);
  };

  setPrice = price => this.setState({ price });

  setPriceRef = ref => {
    this.priceInput = ref;
    console.log(ref);
  };

  focusPrice = () => this.priceInput.focus();

  getData = (props = this.props) => {
    const { objectID, chatID } = this.state;

    console.log(this.type, props.data[objectID].chats[chatID].offerts);
    if (this.type == ChatType.sales) {
      const { chats, newsCount, ...item } = props.data[objectID];
      const { offerts, statusLoading } = chats[chatID];
      return {
        item: {
          ...item,
          seller: mockData.item.seller //TEST
        },
        offert:
          _.isEmpty(offerts) || offerts[0].status === OffertStatus.REJECTED
            ? undefined
            : offerts[0],
        loading: statusLoading
      };
    } else {
      const { UserTO, item, offerts, statusLoading } = props.data[
        objectID
      ].chats[chatID];
      return {
        item: {
          ...item,
          seller: mockData.item.seller //TEST
        },
        /*item: {
          ...item,
          seller: UserTO
        },*/
        offert:
          _.isEmpty(offerts) || offerts[0].status === OffertStatus.REJECTED
            ? undefined
            : offerts[0],
        loading: statusLoading
      };
    }
  };

  render() {
    const data = this.getData();
    const item = {};
    let type;
    let title;
    if (!data.offert) {
      type = OffertType.CREATE;
      title = "Fai una offerta";
    } else if (data.offert.status == OffertStatus.ACCEPTED) {
      type = OffertType.ACCEPTED;
      title = "Offerta Accettata";
    } else if (data.offert.creator._id == this.props.userID) {
      type = OffertType.EDIT;
      title = "La tua offerta";
    } else {
      type = OffertType.DECIDE;
      title = "L'offerta dell'altro";
    }
    console.log(this.props.userID);

    return (
      <View style={{ flex: 1 }}>
        <BasicHeader title={title} />
        <View style={{ flex: 1 }}>
          {this.renderContent(type, data)}
          {data.loading ? <LoadingOverlay /> : null}
        </View>
      </View>
    );
  }

  renderContent = (type, data) => {
    console.log(!data.offert, data.offert);
    switch (type) {
      case OffertType.CREATE:
        return (
          <CreateOffert
            {...data}
            price={this.state.price}
            setPrice={this.setPrice}
            setPriceRef={this.setPriceRef}
            focusPrice={this.focusPrice}
            createOffert={this.createOffert}
          />
        );

      case OffertType.EDIT:
        return <EditOffert {...data} removeOffert={this.removeOffert} />;

      case OffertType.DECIDE:
        return (
          <DecideOffert
            {...data}
            rejectOffert={this.rejectOffert}
            acceptOffert={this.acceptOffert}
          />
        );

      default:
        return null;
    }
  };
}

const mapStateToProps = state => ({
  data: state.chat.data,
  userID: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  //new
  chatCreateOffert: (objectID, chatID, price) =>
    dispatch(chatActions.chatCreateOffert(objectID, chatID, price)),
  chatCancelOffert: (objectID, chatID) =>
    dispatch(chatActions.chatCancelOffert(objectID, chatID)),
  chatRejectOffert: (objectID, chatID) =>
    dispatch(chatActions.chatRejectOffert(objectID, chatID)),
  chatAcceptOffert: (objectID, chatID) =>
    dispatch(chatActions.chatAcceptOffert(objectID, chatID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookOffert);

const mockData = {
  item: {
    pk: 1,
    book: {
      isbn: 1,
      title: "Matematica Verde 1",
      author: "Massimo Bergamini",
      subject: {
        title: "matematica",
        _id: 1
      }
    },
    price: 15,
    condition: 1,
    image_ad: ["AAA"],
    seller: {
      id: 1,
      user: {
        username: "Federico"
      },
      classM: {
        office: {
          id: 1,
          name: "I.I.S.S. J. Von Neumann",
          address: "via Pollenza 156, Roma",
          cap: "00156",
          type: "SP"
        }
      }
    }
  },
  offert: {
    creator: {
      pk: 1,
      username: "Alberto"
    },
    createdAt: "06/05/2019-12:02:14",
    value: 15,
    status: ChatStatus.PENDING
  }
};

OffertType = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DECIDE: "DECIDE",
  ACCEPTED: "ACCEPTED"
};

export const OffertStatus = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2
};
