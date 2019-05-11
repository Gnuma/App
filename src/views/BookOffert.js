import React, { Component } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BasicHeader from "../components/BasicHeader";
import { Header3, Header2, Header1 } from "../components/Text";
import FullButton from "../components/FullButton";
import { ListMultiItem } from "../components/ListItem/ListMultiItem";
import { ChatType } from "../utils/constants";
import Card from "../components/Card";
import PriceInput from "../components/Sell/PriceInput";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import Button from "../components/Button";
import * as salesActions from "../store/actions/sales";
import * as shoppingActions from "../store/actions/shopping";
import LoadingOverlay from "../components/LoadingOverlay";

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
          ? props.salesData[objectID].price.toString()
          : props.shoppingData[objectID].chats[chatID].item.price.toString()
    };
  }

  static propTypes = {
    //type: PropTypes.string,
  };

  createOffert = () => {
    const { objectID, chatID, price } = this.state;
    if (this.type == ChatType.sales) {
      this.props.salesCreateOffert(objectID, chatID, price);
    } else {
      this.props.shoppingCreateOffert(objectID, chatID, price);
    }
  };

  removeOffert = () => {
    const { objectID, chatID } = this.state;
    if (this.type == ChatType.sales) {
      this.props.salesRemoveOffert(objectID, chatID);
    } else {
      this.props.shoppingRemoveOffert(objectID, chatID);
    }
  };

  rejectOffert = () => {
    const { objectID, chatID } = this.state;
    if (this.type == ChatType.sales) {
      this.props.salesRejectOffert(objectID, chatID);
    } else {
      this.props.shoppingRejectOffert(objectID, chatID);
    }
  };

  acceptOffert = () => {
    const { objectID, chatID } = this.state;
    if (this.type == ChatType.sales) {
      this.props.salesAcceptOffert(objectID, chatID);
    } else {
      this.props.shoppingAcceptOffert(objectID, chatID);
    }
  };

  setPrice = price => this.setState({ price });

  setPriceRef = ref => {
    this.priceInput = ref;
    console.log(ref);
  };

  focusPrice = () => this.priceInput.focus();

  getData = (props = this.props) => {
    const { objectID, chatID } = this.state;

    if (this.type == ChatType.sales) {
      const { chats, newsCount, ...item } = props.salesData[objectID];
      const { offert, statusLoading } = chats[chatID];
      return {
        item: {
          ...item,
          seller: mockData.item.seller //TEST
        },
        offert,
        loading: statusLoading
      };
    } else {
      const { UserTO, item, offert, statusLoading } = props.shoppingData[
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
        offert,
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
    } else if (data.offert.status == "accepted") {
      type = OffertType.ACCEPTED;
      title = "Offerta Accettata";
    } else if (data.offert.creator.pk == this.props.userID) {
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
  salesData: state.sales.data,
  shoppingData: state.shopping.data,
  userID: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  salesCreateOffert: (itemID, chatID, price) =>
    dispatch(salesActions.salesCreateOffert(itemID, chatID, price)),
  salesRemoveOffert: (itemID, chatID) =>
    dispatch(salesActions.salesRemoveOffert(itemID, chatID)),
  salesRejectOffert: (itemID, chatID) =>
    dispatch(salesActions.salesRejectOffert(itemID, chatID)),
  salesAcceptOffert: (itemID, chatID) =>
    dispatch(salesActions.salesAcceptOffert(itemID, chatID)),

  shoppingCreateOffert: (subjectID, chatID, price) =>
    dispatch(shoppingActions.shoppingCreateOffert(subjectID, chatID, price)),
  shoppingRemoveOffert: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingRemoveOffert(subjectID, chatID)),
  shoppingRejectOffert: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingRejectOffert(subjectID, chatID)),
  shoppingAcceptOffert: (subjectID, chatID) =>
    dispatch(shoppingActions.shoppingAcceptOffert(subjectID, chatID))
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
    status: "pending"
  }
};

OffertType = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DECIDE: "DECIDE",
  ACCEPTED: "ACCEPTED"
};
