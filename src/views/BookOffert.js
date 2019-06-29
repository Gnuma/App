import React, { Component } from "react";
import { View, ToastAndroid } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../components/BasicHeader";
import { ChatType, ChatStatus, OffertStatus } from "../utils/constants";
import * as chatActions from "../store/actions/chat";
import LoadingOverlay from "../components/LoadingOverlay";
import { OffertType } from "../utils/constants";
import _ from "lodash";

import CreateOffert from "../components/BookOffert/CreateOffert";
import DecideOffert from "../components/BookOffert/DecideOffert";
import EditOffert from "../components/BookOffert/EditOffert";

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

    //console.log(this.type, props.data[objectID].chats[chatID].offerts);
    if (this.type == ChatType.sales) {
      console.log(props.data[objectID]);
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
      console.log(props.data[objectID].chats[chatID]);
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

  getState = data => {
    if (!data.offert) {
      return OffertStates.CREATE;
    }
    switch (data.offert.status) {
      case OffertStatus.ACCEPTED:
        return OffertStates.ACCEPTED;
      case OffertStatus.PENDING:
        if (data.offert.creator._id == this.props.userID) {
          return OffertStates.EDIT;
        } else {
          return OffertStates.DECIDE;
        }
    }
  };

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

  render() {
    const data = this.getData();
    const { type, title } = this.getState(data);
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

const OffertStates = {
  CREATE: { type: OffertType.CREATE, title: "Fai una offerta" },
  ACCEPTED: {
    type: OffertType.ACCEPTED,
    title: "Offerta Accettata"
  },
  EDIT: { type: OffertType.EDIT, title: "La tua offerta" },
  DECIDE: { type: OffertType.DECIDE, title: "L'offerta dell'altro" }
};
